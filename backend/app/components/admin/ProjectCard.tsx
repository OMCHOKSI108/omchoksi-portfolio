"use client";
import React from 'react';
import Link from 'next/link';

type Project = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  tech?: string[];
};

export default function ProjectCard({ project, onDelete }: { project: Project; onDelete?: (id: string) => void }) {
  return (
    <div className="product-card">
      <div style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden' }}>
        {(() => {
          const base = (project as any).imageUrl || ((project as any).images && (project as any).images.find((i:any)=>i.showOnProject)?.url) || ((project as any).images && (project as any).images[0]?.url) || '/placeholder.svg';
          // Append updatedAt as cache-buster when available
          let src = base;
          try {
            const ts = (project as any).updatedAt || (project as any).createdAt;
            if (ts && base && !base.includes('?')) {
              const t = new Date(ts).getTime();
              src = `${base}?v=${t}`;
            }
          } catch (e) {
            // ignore
          }

          return <img src={src} alt={project.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />;
        })()}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500">{project.category || 'Project'}</div>
        <Link href={`/admin/projects/${project._id}`} className="text-lg font-semibold hover:underline block mt-1 text-gray-900">{project.title}</Link>
        <div className="text-sm text-gray-600 mt-2 line-clamp-3">{project.description}</div>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {project.tech?.slice(0, 6).map((t) => (
            <div key={t} className="text-xs px-2 py-1 rounded" style={{ background: '#f3f4f6', border: '1px solid var(--border-subtle)' }}>{t}</div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link href={`/admin/projects/${project._id}`} className="text-sm px-3 py-1 rounded btn-accent">Open</Link>
          <button type="button" onClick={() => onDelete?.(project._id)} className="text-sm px-3 py-1 rounded btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}
