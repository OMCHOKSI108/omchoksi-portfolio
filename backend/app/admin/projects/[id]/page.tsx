"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TagInput from '../../../components/ui/TagInput';
import DropzoneImageUpload from '../../../components/ui/DropzoneImageUpload';
import ModalConfirm from '../../../components/ui/ModalConfirm';
import { useToast } from '../../../components/ui/Toast';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  slug: string;
  priority: number;
  description: string;
  projectMarkdown?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  images?: Array<{ url: string; caption?: string; showOnProject?: boolean }>;
  featured: boolean;
  active?: boolean; // ← THIS WAS MISSING!
}

interface FormData extends Omit<Project, '_id'> {
  active: boolean;
}

export default function EditProjectPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const toast = useToast();

  const initialRef = useRef<Project | null>(null);

  const [form, setForm] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    projectMarkdown: '',
    tags: [],
    priority: 0,
    liveUrl: '',
    githubUrl: '',
    images: [],
    featured: false,
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Auth check
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) router.replace('/admin/login');
      } catch {
        router.replace('/admin/login');
      }
    })();
  }, [router]);

  // Load project
  useEffect(() => {
    if (!id) return;
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { credentials: 'include' });
      const json = await res.json();

      if (json?.success && json.data) {
        const project: Project = json.data;
        const loaded: FormData = {
          title: project.title,
          slug: project.slug,
          description: project.description || '',
          projectMarkdown: (project as any).projectMarkdown || '',
          tags: project.tags || [],
          priority: project.priority || 0,
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          images: project.images || [],
          featured: !!project.featured,
          active: project.active ?? true,
        };

        setForm(loaded);
        initialRef.current = project;
      } else {
        toast.show(json?.message || 'Failed to load project', { type: 'error' });
        router.push('/admin/projects');
      }
    } catch (err) {
      toast.show('Network error', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Track dirty state
  useEffect(() => {
    const initial = initialRef.current;
    if (!initial) {
      setDirty(false);
      return;
    }

    const isDirty =
      initial.title !== form.title ||
      initial.slug !== form.slug ||
      initial.description !== form.description ||
      (initial as any).projectMarkdown !== form.projectMarkdown ||
      initial.priority !== form.priority ||
      initial.liveUrl !== form.liveUrl ||
      initial.githubUrl !== form.githubUrl ||
      initial.featured !== form.featured ||
      (initial.active ?? true) !== form.active ||
      JSON.stringify(initial.tags || []) !== JSON.stringify(form.tags) ||
      JSON.stringify(initial.images || []) !== JSON.stringify(form.images);

    setDirty(isDirty);
  }, [form]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (saving) return;

    setSaving(true);
    setErrors({});

    const previous = initialRef.current;
    initialRef.current = { ...initialRef.current!, ...form };

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (json?.success) {
        toast.show('Project saved successfully!', { type: 'success' });
        initialRef.current = { ...initialRef.current!, ...form };
        setDirty(false);

        // Ensure any server-side caches are refreshed before navigating back to the list
        try {
          router.refresh();
        } catch (e) {
          // router.refresh may not be available in some runtimes; ignore failures
        }

        setTimeout(() => {
          router.push('/admin/projects');
        }, 600);
      } else {
        setErrors(json?.errors || {});
        toast.show(json?.message || 'Save failed', { type: 'error' });
        initialRef.current = previous;
        setDirty(true);
      }
    } catch (err) {
      toast.show('Network error', { type: 'error' });
      initialRef.current = previous;
      setDirty(true);
    } finally {
      setSaving(false);
    }
  };

  // Ctrl/Cmd + S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (dirty && !saving) handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dirty, saving]);

  const onImageUploaded = (url: string) => {
    setForm((prev) => {
      const images = [...(prev.images || [])];
      const hasShown = images.some((i) => i.showOnProject);

      images.push({
        url,
        caption: '',
        showOnProject: !hasShown,
      });

      return { ...prev, images };
    });
  };

  const deleteImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const setShowOnProject = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images?.map((img, i) => ({
        ...img,
        showOnProject: i === index,
      })),
    }));
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        toast.show('Project deleted', { type: 'success' });
        router.push('/admin/projects');
      } else {
        const j = await res.json();
        toast.show(j?.message || 'Delete failed', { type: 'error' });
      }
    } catch {
      toast.show('Network error', { type: 'error' });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading project...</div>;
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">Edit Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="slug (e.g. my-cool-app)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-3 font-mono text-sm border rounded-lg"
                  required
                />
                {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Write a detailed description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 border rounded-lg resize-none"
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Project Markdown (optional)</label>
                  <textarea
                    placeholder="Full project markdown (renders on public page)"
                    value={form.projectMarkdown}
                    onChange={(e) => setForm({ ...form, projectMarkdown: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border rounded-lg resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack / Tags</label>
                <TagInput value={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-card border rounded-lg p-6 space-y-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/projects')}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit()}
                  disabled={saving || !dirty}
                  className="flex-1 px-4 py-2 btn-accent hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {dirty && (
                <p className="text-sm text-yellow-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  You have unsaved changes
                </p>
              )}

              <hr className="border-t border-gray-200" />

              <div>
                <h3 className="font-medium mb-3">Project Images</h3>
                <DropzoneImageUpload onUploaded={onImageUploaded} />

                <div className="mt-4 space-y-3">
                  {form.images?.map((img, idx) => (
                    <div key={img.url} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                      <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <Image src={img.url} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 truncate">{img.url.split('/').pop()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1 text-xs">
                          <input
                            type="radio"
                            name="main-image"
                            checked={!!img.showOnProject}
                            onChange={() => setShowOnProject(idx)}
                          />
                          <span>Main</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => deleteImage(idx)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!form.images || form.images.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No images uploaded yet</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priority Order</label>
                  <input
                    type="number"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                    max="999"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Lower numbers appear first (1, 2, 3...). Default: 999
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Live URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  <span className="text-sm">Featured Project</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  />
                  <span className="text-sm">Published (Active)</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Delete Project
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ModalConfirm
        open={confirmOpen}
        title="Delete Project"
        message="This action cannot be undone. Are you sure?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}