"use client";

import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (res.ok) {
        const data = await res.json();
        if (mounted) setEmail(data.email || '');
      }
    })();
    return () => { mounted = false };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    if (password && password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/auth/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password: password || undefined }),
    });

    if (res.ok) {
      setMessage('Settings updated');
      setPassword('');
      setConfirm('');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Update failed');
    }
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        {message && <div className="mb-4 text-sm text-yellow-300">{message}</div>}
        <label className="block mb-2 text-sm text-neutral-300">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white"
          required
        />

        <label className="block mb-2 text-sm text-neutral-300">New Password (optional)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white"
        />

        <label className="block mb-2 text-sm text-neutral-300">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 mb-4 bg-neutral-800 border border-neutral-700 rounded text-white"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
