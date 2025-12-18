"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// SubNav is hidden when the user is not authenticated. We check /api/auth/me
// on mount and only render navigation when the user is authenticated.

export default function SubNav() {
  const path = usePathname() || '';
  const isActive = (p: string) => path.startsWith(p);
  const [authed, setAuthed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((r) => {
        if (!mounted) return;
        setAuthed(r.ok);
      })
      .catch(() => mounted && setAuthed(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (authed === undefined) return null; // avoid flicker
  if (!authed) return null;

  return (
    <nav className="w-full border-b" style={{ borderColor: '#e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className={`py-3 inline-block ${isActive('/admin') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Dashboard</Link>
          <Link href="/admin/projects" className={`py-3 inline-block ${isActive('/admin/projects') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Projects</Link>
          <Link href="/admin/blogs" className={`py-3 inline-block ${isActive('/admin/blogs') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Blogs</Link>
          <Link href="/admin/certifications" className={`py-3 inline-block ${isActive('/admin/certifications') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Certifications</Link>
          <Link href="/admin/profile" className={`py-3 inline-block ${isActive('/admin/profile') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Profile</Link>
          <Link href="/admin/settings" className={`py-3 inline-block ${isActive('/admin/settings') ? 'font-semibold border-b-2' : 'text-gray-600'}`} style={{ borderColor: '#f59e0b' }}>Settings</Link>
        </div>
      </div>
    </nav>
  );
}
