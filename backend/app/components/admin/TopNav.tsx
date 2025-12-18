"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const router = useRouter();
  const [me, setMe] = useState<{ email?: string } | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    // check session; if unauthorized, hide the top nav
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then((r) => {
        if (!mounted) return;
        if (!r.ok) return setMe(null);
        return r.json();
      })
      .then((d) => {
        if (!mounted) return;
        if (d) setMe(d);
      })
      .catch(() => mounted && setMe(null));
    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch (err) {
      // ignore network errors — still redirect
      console.error('Logout failed', err);
    }
    // force full redirect to clear any client state
    window.location.assign('/admin/login');
  }

  // if we haven't checked auth yet, render nothing to avoid flicker
  if (me === undefined) return null;

  // not authenticated -> hide top nav entirely
  if (me === null) return null;

  const initials = me.email ? me.email.split('@')[0].slice(0, 2).toUpperCase() : 'AD';

  return (
    <header className="w-full" style={{ background: '#131921' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-white font-semibold">Portfolio Admin</div>
        </div>

        <div className="flex items-center gap-4">
          <input aria-label="global-search" placeholder="Search projects, tags..." className="px-3 py-2 rounded text-sm" style={{ minWidth: 320 }} />
          <div className="text-white rounded-full bg-white/5 px-3 py-1">{initials}</div>
          <button onClick={handleLogout} className="ml-2 text-sm px-3 py-1 rounded" style={{ background: '#fff0', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
