"use client";
import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, initial='' }: { onSearch: (q:string)=>void; initial?:string }){
  const [q, setQ] = useState(initial);
  useEffect(()=>{
    const t = setTimeout(()=> onSearch(q), 300);
    return ()=> clearTimeout(t);
  },[q]);

  return (
    <div className="w-full">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects by title, tags or category"
        className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded text-white" />
    </div>
  );
}
