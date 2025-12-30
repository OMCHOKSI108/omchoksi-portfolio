"use client";
import React from 'react';
import Image from 'next/image';

export default function ProjectCard({ project, onOpen }: { project: any; onOpen?: (id: string) => void }) {
  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 bg-neutral-700 flex items-center justify-center relative">
        {(() => {
          const src = (project as any).imageUrl || ((project as any).images && (project as any).images.find((i:any)=>i.showOnProject)?.url) || ((project as any).images && (project as any).images[0]?.url) || '/docs/image.png';
          return <Image src={src} alt={project.title} fill className="object-cover" />;
        })()}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          <span className="text-xs text-neutral-400">{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-xs text-neutral-300 mt-2 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(project.tags || []).slice(0,3).map((t:string)=> (
              <span key={t} className="text-xs bg-neutral-700 text-neutral-200 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
          <button onClick={()=>onOpen?.(project._id)} className="text-xs text-indigo-400 cursor-pointer">Edit</button>
        </div>
      </div>
    </div>
  );
}
