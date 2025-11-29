"use client";
import Link from 'next/link';
import React from 'react';

export default function Sidebar({ email }: { email?: string }) {
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.assign('/admin/login');
  }

  return (
    <aside style={{ width: 260, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRight: '1px solid var(--border-subtle)' }} className="flex flex-col justify-between min-h-screen p-6">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div style={{ width:40, height:40, borderRadius:8, background:'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))' }} />
          <div>
            <div className="text-lg font-semibold">Portfolio Admin</div>
            <div className="muted text-sm">Dashboard</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-6">
          <Link href="/admin" className="px-3 py-2 rounded hover:bg-white/3">Dashboard</Link>
          <Link href="/admin/projects" className="px-3 py-2 rounded hover:bg-white/3">Projects</Link>
          <Link href="/admin/settings" className="px-3 py-2 rounded hover:bg-white/3">Settings</Link>
        </nav>
      </div>

      <div>
        <div className="border-t pt-4 mt-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="text-sm muted">Signed in as</div>
          <div className="text-sm font-medium truncate">{email ?? ' — '}</div>
          <button type="button" onClick={handleLogout} className="mt-3 text-sm" style={{ color: '#ff6b6b' }}>Logout</button>
        </div>
      </div>
    </aside>
  );
}
