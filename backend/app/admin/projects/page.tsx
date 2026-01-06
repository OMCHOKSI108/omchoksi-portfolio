"use client";

import { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProjectCard from '../../components/admin/ProjectCard';

type Project = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  images?: Array<{ url: string; caption?: string; showOnProject?: boolean }>;
  featured?: boolean;
  active?: boolean;        // ← THIS WAS MISSING!
  createdAt?: string;
};

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<Project>>>({});
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Auth check + initial load
  useEffect(() => {
    (async () => {
      try {
        const me = await fetch('/api/auth/me', { credentials: 'include' });
        if (!me.ok) throw new Error();
      } catch {
        router.push('/admin/login');
        return;
      }
      fetchProjects();
    })();
  }, [router]);

  // Debounced search + page reset
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchProjects();
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Fetch when page changes
  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    setLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const url = `/api/projects?page=${page}&limit=${pageSize}&q=${encodeURIComponent(query)}&t=${Date.now()}`;
      const res = await fetch(url, { credentials: 'include' });
      const json = await res.json();

      // Only apply the response if it's the latest fetch
      if (currentFetchId !== fetchIdRef.current) return;

      if (json?.success) {
        const d = json.data || {};
        setProjects(Array.isArray(d.items) ? d.items : []);
        setTotal(typeof d.total === 'number' ? d.total : 0);
      } else {
        setProjects([]);
        setTotal(0);
      }
    } catch (err) {
      console.error(err);
      if (currentFetchId === fetchIdRef.current) {
        setProjects([]);
        setTotal(0);
      }
    } finally {
      if (currentFetchId === fetchIdRef.current) setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const startEdit = (p: Project) => {
    setEditingId(p._id);
    setDrafts((d) => ({ ...d, [p._id]: { ...p } }));
  };

  const updateDraft = (id: string, change: Partial<Project>) => {
    setDrafts((d) => ({
      ...d,
      [id]: { ...d[id], ...change },
    }));
  };

  const saveDraft = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(draft),
    });

    const j = await res.json();
    if (j?.success) {
      setEditingId(null);
      setDrafts((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      fetchProjects();
      alert('Saved');
    } else {
      alert(j?.message || 'Save failed');
    }
  };

  const toggleActive = async (id: string, newActive: boolean) => {
    // Optimistic UI update
    const prev = projects;
    setProjects((ps) => ps.map((p) => (p._id === id ? { ...p, active: newActive } : p)));

    try {
      const res = await fetch(`/api/projects/${id}?t=${Date.now()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ active: newActive }),
      });

      const j = await res.json();
      if (!res.ok || !j?.success) {
        setProjects(prev);
        alert(j?.message || 'Failed to toggle active status');
      } else {
        // refresh list from server to ensure consistency
        fetchProjects();
      }
    } catch (err) {
      setProjects(prev);
      alert('Network error while toggling active status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this project?')) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      fetchProjects();
    } else {
      const j = await res.json();
      alert(j?.message || 'Delete failed');
    }
  };

  // Helper to get thumbnail safely
  const getThumbnail = (p: Project): string => {
    const base = p.images?.find((i) => i.showOnProject)?.url || p.images?.[0]?.url || '/placeholder.svg';
    // Append updatedAt as a cache-buster to ensure new uploads show immediately in admin
    try {
      const ts = (p as any).updatedAt || (p as any).createdAt;
      if (ts && base && !base.includes('?')) {
        const t = new Date(ts).getTime();
        return `${base}?v=${t}`;
      }
    } catch (e) {
      // ignore
    }
    return base;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your portfolio projects</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="px-4 py-2 border rounded-lg text-sm min-w-[200px]"
          />

          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'grid' ? 'btn-accent text-btn-accent-text' : 'bg-white text-gray-700'
                }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'list' ? 'btn-accent text-btn-accent-text' : 'bg-white text-gray-700'
                }`}
            >
              Table
            </button>
          </div>

          <Link href="/admin/projects/priority" className="btn-accent px-5 py-2 rounded-lg font-medium transition">
            Reorder Priority
          </Link>

          <Link href="/admin/projects/add" className="btn-accent px-5 py-2 rounded-lg font-medium transition">
            Add Project
          </Link>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No projects found.</div>
        ) : viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-medium">Thumb</th>
                  <th className="text-left px-6 py-4 font-medium">Title</th>
                  <th className="text-left px-6 py-4 font-medium">Slug</th>
                  <th className="text-left px-6 py-4 font-medium">Tags</th>
                  <th className="text-left px-6 py-4 font-medium">Featured</th>
                  <th className="text-left px-6 py-4 font-medium">Active</th>
                  <th className="text-left px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const isEditing = editingId === p._id;
                  const draft = drafts[p._id] as Project | undefined;

                  return (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={getThumbnail(p)}
                          alt={p.title}
                          className="w-16 h-16 object-cover rounded bg-gray-100"
                          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                        />
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {isEditing ? (
                          <input
                            className="border rounded px-2 py-1 w-full"
                            value={draft?.title ?? ''}
                            onChange={(e) => updateDraft(p._id, { title: e.target.value })}
                          />
                        ) : (
                          p.title
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {isEditing ? (
                          <input
                            className="border rounded px-2 py-1 w-full"
                            value={draft?.slug ?? ''}
                            onChange={(e) => updateDraft(p._id, { slug: e.target.value })}
                          />
                        ) : (
                          p.slug
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            className="border rounded px-2 py-1 w-full text-xs"
                            value={(draft?.tags ?? []).join(', ')}
                            onChange={(e) =>
                              updateDraft(p._id, {
                                tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                              })
                            }
                          />
                        ) : (
                          <span className="text-xs">{(p.tags ?? []).join(', ')}</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            checked={!!draft?.featured}
                            onChange={(e) => updateDraft(p._id, { featured: e.target.checked })}
                          />
                        ) : p.featured ? (
                          'Yes'
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <label className="inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={!!p.active}
                            disabled={isEditing}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleActive(p._id, e.target.checked);
                            }}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button onClick={() => saveDraft(p._id)} className="text-green-600 font-medium hover:underline">
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setDrafts((d) => {
                                  const nd = { ...d };
                                  delete nd[p._id];
                                  return nd;
                                });
                              }}
                              className="text-gray-600 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 flex-wrap">
                            <Link href={`/admin/projects/${p._id}`} className="text-blue-600 hover:underline">
                              Edit
                            </Link>
                            <Link href={`/projects/${p.slug}`} target="_blank" className="text-gray-600 hover:underline">
                              View →
                            </Link>
                            <button type="button" onClick={() => startEdit(p)} className="text-indigo-600 hover:underline">
                              Quick Edit
                            </button>
                            <button type="button" onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">{total} total projects</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}