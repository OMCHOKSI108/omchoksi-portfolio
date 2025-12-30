import React from 'react';

export default function SkeletonGrid({count=8}:{count?:number}){
  const arr = Array.from({length:count});
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {arr.map((_,i)=> (
        <div key={i} className="animate-pulse bg-neutral-800 rounded-lg h-56" />
      ))}
    </div>
  );
}
