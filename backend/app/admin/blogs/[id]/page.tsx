'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

type Blog = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  featured: boolean;
  active: boolean;
};

export default function EditBlogPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    tags: '',
    link: '',
    image: '',
    featured: false,
    active: true,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (!me.ok) router.push('/admin/login');
      } catch (err) {
        router.push('/admin/login');
      }
    })();
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { credentials: 'include' });
      const json = await res.json();
      if (json?.success && json.data) {
        const blog: Blog = json.data;
        setForm({
          title: blog.title,
          slug: blog.slug,
          description: blog.description,
          tags: blog.tags.join(', '),
          link: blog.link || '',
          image: blog.image || '',
          featured: blog.featured,
          active: blog.active,
        });
      } else {
        alert('Blog not found');
        router.push('/admin/blogs');
      }
    } catch (err) {
      alert('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });

    if (res.ok) {
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const payload = { ...form, tags };

    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(payload),
    });
    const j = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
    if (j?.success) {
      alert('Blog updated');
      router.push('/admin/blogs');
    } else {
      alert(j?.message || 'Update failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={6}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded"
        />
        {uploading && <p>Uploading...</p>}
        {form.image && (
          <Image src={form.image} alt="Preview" width={128} height={128} className="w-32 h-32" />
        )}
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>
        <button type="submit" className="btn-accent px-4 py-2 rounded cursor-pointer">
          Update Blog
        </button>
      </form>
    </div>
  );
}