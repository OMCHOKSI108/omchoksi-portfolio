# Portfolio Admin Panel — Architecture & Implementation Guide

Generated: 2025-11-29

Purpose: detailed folder structure, API endpoints, DB schema, component blueprint, and code samples to implement a secure, high-performance Admin Panel for a personal portfolio.

-----

**Summary of goals**
- Secure JWT auth with httpOnly cookies and server-side session verification.
- Admin-only UI (login-only view when not authenticated).
- High-performance CRUD for projects (supports 70–100+ records): server-side pagination, Mongoose `lean()`, projection, DB indexes.
- Cloudinary streaming uploads for media.
- Minimal, modern UX with skeleton loaders, toasts, confirmations, and responsive layout.

-----

## Folder structure (recommended)

- app/
  - layout.tsx (root metadata/title)
  - page.tsx (root redirect to login/admin)
  - admin/
    - layout.tsx (admin shell: sidebar + main)
    - login/page.tsx
    - dashboard/page.tsx
    - projects/
      - page.tsx (grid of projects)
      - [id]/page.tsx (editor view)
    - settings/page.tsx
  - api/
    - auth/
      - register/route.ts
      - login/route.ts
      - logout/route.ts (or POST logout)
      - me/route.ts
      - update/route.ts
    - projects/
      - route.ts (GET list, POST create)
      - [id]/route.ts (GET, PUT, DELETE)
    - upload/route.ts

- src/
  - lib/
    - db.ts
    - auth.ts
    - cloudinary.ts
  - models/
    - Admin.ts
    - Project.ts

- app/components/
  - admin/
    - Sidebar.tsx
    - Topbar.tsx
  - ui/
    - ProjectCard.tsx
    - ProjectGrid.tsx
    - SkeletonGrid.tsx
    - SearchBar.tsx
    - TagInput.tsx
    - Toast.tsx
    - ModalConfirm.tsx
    - EditorControls.tsx

- docs/
  - api_information.txt
  - admin_architecture.md

-----

## Database schema (Mongoose)

src/models/Project.ts (recommended)

```ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  tech?: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  status: 'draft' | 'live' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  tags: { type: [String], default: [], index: true },
  tech: { type: [String], default: [] },
  liveUrl: { type: String },
  githubUrl: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft','live','archived'], default: 'draft', index: true },
}, { timestamps: true });

// Compound indexes for common queries
ProjectSchema.index({ title: 'text', description: 'text', tags: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
```

Notes:
- Use `timestamps: true` so `createdAt` and `updatedAt` are automatic.
- Add indexes on `slug`, `featured`, `status`, and a text index on `title/description` for fast search.

-----

## Auth helper (src/lib/auth.ts)

- Use `bcryptjs` for password hashing and `jose` or `jsonwebtoken` for JWT signing.
- Keep `JWT_SECRET` in `.env.local` and `MONGODB_URI` in env.

Example:

```ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;
export async function hashPassword(pw: string) { return bcrypt.hash(pw, 12); }
export async function comparePassword(pw: string, hash: string) { return bcrypt.compare(pw, hash); }
export function signToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
}
export function verifyToken(token: string) {
  try { return jwt.verify(token, JWT_SECRET) as { id: string; email: string }; }
  catch { return null; }
}
```

Security notes:
- Always set cookies with `httpOnly: true`, `sameSite: 'lax'`, `secure: process.env.NODE_ENV === 'production'`, `path: '/'`.
- For dev over HTTP, `secure` must be false.

-----

## API endpoints (detailed)

Authentication:
- POST `/api/auth/register` — create admin (only if none exists).
- POST `/api/auth/login` — body { email, password } → on success set `Set-Cookie: admin_token=...` and return { success: true }.
- POST `/api/auth/logout` — clear cookie (set cookie maxAge=0).
- GET `/api/auth/me` — validate `admin_token`, return { id, email }.
- POST `/api/auth/update` — update email/password, reissue token if email changed.

Projects:
- GET `/api/projects` — optimized list:
  - Query params: `?q=search&tags=tag1,tag2&page=1&limit=24&status=live`
  - Use indexed text search for `q` and `tags` filtering.
  - Use `lean()` and projection to return only required fields for dashboard (e.g. title, slug, imageUrl, tags, shortDescription, status, createdAt).
  - Add `Cache-Control: public, max-age=60` headers for public lists if appropriate.
- POST `/api/projects` — create (auth required)
- GET `/api/projects/:id` — read single (public)
- PUT `/api/projects/:id` — update (auth required)
- DELETE `/api/projects/:id` — delete (auth required)

Uploads:
- POST `/api/upload` — multipart/form-data with `image` field; stream to Cloudinary using `uploader.upload_stream` (no large in-memory buffers) and return { url }.

-----

## Optimized Projects GET (server-side) — sample implementation

```ts
// app/api/projects/route.ts (GET)
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET(request: NextRequest) {
  await dbConnect();

  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const tags = url.searchParams.get('tags');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, parseInt(url.searchParams.get('limit') || '24'));
  const status = url.searchParams.get('status');

  const filter: any = {};
  if (q) {
    filter.$text = { $search: q };
  }
  if (tags) {
    filter.tags = { $in: tags.split(',').map(t => t.trim()).filter(Boolean) };
  }
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title slug imageUrl tags status description createdAt')
      .lean(),
    Project.countDocuments(filter),
  ]);

  return NextResponse.json({ items, total, page, limit });
}
```

Why this is fast:
- `lean()` returns plain JS objects (no Mongoose documents) — significantly faster and lower memory.
- Projection via `select` reduces transferred data.
- Count + find in parallel with Promise.all.
- Indexes support fast filtering.

-----

## Frontend components & patterns

Key principles:
- Use server components for initial data fetch where possible (App Router). Use client components only for interactive pieces (editor, forms, search input with debounce).
- Use Suspense and streaming when appropriate for progressive loading.
- Keep page-level client bundles small; move heavy libs into dynamically imported client components if needed.

Important components (high-level):

- `SearchBar` (client): debounced input, calls `/api/projects?q=...&page=1`
- `ProjectGrid` (server or client): renders `ProjectCard[]`; supports skeleton loader while fetching.
- `ProjectCard` (client): shows thumbnail, title, tags, status; clicking opens Editor.
- `EditorPanel` (client): form for editing project, unsaved-changes tracking, Save button, toast on success.
- `Toast` and `ModalConfirm` (client): lightweight UI for messages and delete confirmation.

SearchBar debouncing (sample):

```tsx
'use client'
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  useEffect(() => {
    const t = setTimeout(() => onSearch(q), 300);
    return () => clearTimeout(t);
  }, [q]);
  return (
    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects" />
  );
}
```

Editor unsaved-detection & toast
- Track a `dirty` boolean when form values differ from initial values.
- Once saved, show a toast: `Changes saved successfully` and reset `dirty`.

Example toast usage (simple):

```tsx
// Toast.tsx (client)
import { useState } from 'react';
export default function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  function show(msg: string) { setMessage(msg); setTimeout(() => setMessage(null), 3000); }
  return { message, show };
}
```

-----

## Login UX + 2-second animated loader

Login flow (client):
1. User fills credentials and submits.
2. Client posts to `/api/auth/login` with `credentials: 'same-origin'`.
3. On 200, run a 2s animated loader (CSS animation or spinner) then 
   verify session via `/api/auth/me` and navigate to `/admin/dashboard`.

Sample login submit handler (client):

```tsx
async function handleSubmit(e) {
  e.preventDefault();
  const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: {'Content-Type':'application/json'}, credentials: 'same-origin' });
  if (!res.ok) { showError(); return; }
  // run a 2s loader
  setLoading(true);
  await new Promise(r => setTimeout(r, 2000));
  setLoading(false);
  // verify
  const me = await fetch('/api/auth/me', { credentials: 'same-origin' });
  if (me.ok) router.push('/admin');
}
```

Important: use `credentials: 'same-origin'` so browser accepts `Set-Cookie` from login response.

-----

## Confirm delete modal (UX)
- Use a generic `ModalConfirm` that receives `title`, `message`, `onConfirm` callback.
- On Delete action: show modal, if confirmed call DELETE `/api/projects/:id` with credentials.
- On success remove the item from list locally (optimistic update) and show toast.

-----

## Scalability & Best Practices

- DB: add appropriate indexes for search and filter fields. Use pagination and `lean()`.
- API: keep responses small (projection), paginate lists, and add `Cache-Control` where safe.
- Frontend: server components for data fetch + client components only for interactive bits.
- Avoid large dependencies in top-level components. Use dynamic imports for rarely used heavy libs.
- Security:
  - Use `httpOnly` cookies for JWT; avoid localStorage for tokens.
  - Rate-limit sensitive endpoints (login) with reverse proxy or server middleware.
  - Use Helmet-like headers and CSP in production.
- Dev tooling: enable Turbopack for faster dev builds if supported.

-----

## Suggested next implementation steps (prioritized)
1. Implement optimized `GET /api/projects` (lean/projection/pagination) — high impact on list performance.
2. Ensure `Project` indexes exist and run `ensureIndexes()` during startup if needed.
3. Streamline uploads to Cloudinary using `upload_stream` and avoid buffering large files.
4. Add toasts, confirmations, and unsaved-change UX in editor.
5. Audit pages to convert static data fetches to server components.

-----

If you want, I can now:
- Implement the optimized `GET /api/projects` (patching the existing route). 
- Add the confirm-delete modal and toast components.
- Add sample `ProjectCard`, `ProjectGrid`, and `Editor` files to the repo.

Tell me which of these you'd like me to implement next and I'll apply the changes.
