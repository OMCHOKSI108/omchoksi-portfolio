import React from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ items, onOpen }:{items:any[], onOpen?: (id:string)=>void}){
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-400">There are currently no projects to display.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <ProjectCard key={item._id} project={item} onOpen={onOpen} />
      ))}
    </div>
  );
}
