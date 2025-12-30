"use client";
import React from 'react';
import Link from 'next/link';

type Blog = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
};

export default function BlogCard({ blog, onDelete }: { blog: Blog; onDelete?: (id: string) => void }) {
  return (
    <div className="product-card">
      <div style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden' }}>
        {(() => {
          const base = blog.image || '/placeholder.svg';
          // Append updatedAt as cache-buster when available
          let src = base;
          try {
            const ts = (blog as any).updatedAt || (blog as any).createdAt;
            if (ts && base && !base.includes('?')) {
              const t = new Date(ts).getTime();
              src = `${base}?v=${t}`;
            }
          } catch (e) {
            // ignore
          }

          return <img src={src} alt={blog.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />;
        })()}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500">Blog</div>
        <Link href={`/admin/blogs/${blog._id}`} className="text-lg font-semibold hover:underline block mt-1 text-gray-900">{blog.title}</Link>
        <div className="text-sm text-gray-600 mt-2 line-clamp-3">{blog.description}</div>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {blog.tags?.slice(0, 6).map((t) => (
            <div key={t} className="text-xs px-2 py-1 rounded" style={{ background: '#f3f4f6', border: '1px solid var(--border-subtle)' }}>{t}</div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link href={`/admin/blogs/${blog._id}`} className="text-sm px-3 py-1 rounded btn-accent">Open</Link>
          <button type="button" onClick={() => onDelete?.(blog._id)} className="text-sm px-3 py-1 rounded btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}