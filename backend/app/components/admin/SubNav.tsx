"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubNav() {
  const path = usePathname() || '';
  const isActive = (p: string) => path.startsWith(p);

  return (
    <nav className="w-full border-b" style={{ borderColor: '#e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className={`py-3 inline-block ${isActive('/admin') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Dashboard</Link>
          <Link href="/admin/projects" className={`py-3 inline-block ${isActive('/admin/projects') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Projects</Link>
          <Link href="/admin/settings" className={`py-3 inline-block ${isActive('/admin/settings') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Settings</Link>
        </div>
      </div>
    </nav>
  );
}
