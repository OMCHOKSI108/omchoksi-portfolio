# Product Requirements Document (PRD)

Project: Portfolio Backend + Admin Panel
Date: 2025-11-29
Author: Dev Team

## Overview

This document describes the product requirements for the portfolio backend and admin panel. The system provides a Next.js App Router backend with MongoDB persistence, Mongoose models, Cloudinary image uploads, JWT httpOnly cookie authentication for admin routes, and an admin UI for CRUD management of projects. Projects support multiple images, one of which is designated as the primary "showOnProject" image. Projects also have an `active` flag to control public visibility.

## Goals

- Allow the owner to create, read, update, and delete portfolio projects via an admin UI.
- Support multiple images per project; allow marking one image as the primary image for public display.
- Persist all changes to MongoDB and provide seed tooling to upsert projects from `Final_project_description.txt`.
- Provide a reliable upload flow (Cloudinary) and a fallback/default remote image when none are provided.
- Avoid stale data in admin listing and public pages using caching best-practices and cache-busting.

## Users

- Admin (site owner): authenticate via JWT in httpOnly cookie to manage projects.
- Public visitors: view only projects where `active` is true.

## Features & Requirements

1. Multi-image Projects
   - Each project can have 0..N images.
   - Image object: `{ url, caption?, showOnProject? }`.
   - Exactly one image should have `showOnProject: true` (admin UI should auto-set the first image as primary if none selected).

2. Active Toggle
   - A boolean `active` flag on projects controls public visibility.
   - Public `GET /api/projects` must filter `active: true` unless the caller is an authenticated admin.

3. Admin CRUD
   - Protected endpoints: create, update, delete require a valid `admin_token` httpOnly cookie.
   - Admin UI must allow uploading images, reordering, deleting, and setting main image.

4. Seeding & Maintenance
   - A seed script must parse `Final_project_description.txt` and upsert projects.
   - Utilities to copy default image to public and to bulk-fix project images must be provided.

5. Caching & Freshness
   - Admin listing should reflect recent updates and not show stale thumbnails. Implement cache-busting (e.g., `?v=timestamp`) and request deduping.

## Acceptance Criteria

- Admin can upload multiple images and mark one as main; after Save, public and admin listing show the new main image.
- Deleting an image via Admin removes it from the DB (and does not reappear on refresh).
- Seed script upserts projects from `Final_project_description.txt` without duplication.
- Public `GET /api/projects` returns only active projects unless admin.

## API Endpoints (high level)

- GET `/api/projects` — list (public: active only)
- POST `/api/projects` — create (admin)
- GET `/api/projects/:id` — read
- PUT `/api/projects/:id` — update (admin)
- DELETE `/api/projects/:id` — delete (admin)
- POST `/api/upload` — image upload (returns `url`)

## Data Model (Project)

```
{
  title: String,
  slug: String,
  description: String,
  tags: [String],
  liveUrl: String,
  githubUrl: String,
  images: [{ url, caption, showOnProject }],
  active: Boolean,
  featured: Boolean
}
```

## Non-Functional Requirements

- Security: Admin endpoints require httpOnly cookie auth and server-side verification.
- Performance: List endpoints should support pagination and basic search.
- Reliability: Seed and maintenance scripts must be idempotent.

## Operational & Monitoring

- Add a small server-side log when updates to `images[]` occur (already implemented) to diagnose persistence issues.
- Recommend adding CI jobs that run smoke tests on a staging environment.

## Next Steps / Roadmap

- Add E2E tests (Cypress / Playwright) to cover upload, image delete, and active toggling flows.
- Wire CI to run smoke tests on pull requests.
