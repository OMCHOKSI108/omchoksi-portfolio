#  Full-Stack Portfolio + Admin Panel — Technical Blueprint

## 🎯 Project Goal

Build a **cinematic, modern, high‑performance portfolio** with:

- Dynamic projects loaded from a database (no manual code edits)
- A **secure admin panel** with login to manage content
- **CRUD** for projects (create, read, update, delete)
- External image hosting (thumbnails, banners)
- Fast global performance + free-tier‑friendly for **5+ years**
- FULL developer control (no Supabase, no Wordpress, no CMS)

---

## 🧠 Vision

- Public website: smooth motion, premium visuals, and modern animations.
- Admin-only backend: simple but powerful UI to manage 50–100+ projects.
- Stack shows serious **full‑stack engineering** skills:
  - TypeScript
  - Next.js
  - MongoDB
  - Auth + JWT
  - Cloudinary
- All infra chosen to stay free or nearly free for years.

---

## 🌍 High-Level Architecture

```text
[ Public Portfolio (frontend) ]
         |
         |  fetch projects (REST)
         v
[ Backend API (Next.js) ] ───► [ MongoDB Atlas (projects) ]
         |
         └──► [ Cloudinary (image storage) ]


[ Admin Panel (backend app) ]
   - login (JWT)
   - dashboard
   - project CRUD
Frontend and Backend are separate Next.js projects.

Both deployed to Vercel.

Backend contains:

Admin UI

API routes

DB connection

Auth

Cloudinary integration

🧱 Tech Stack (Final)
✨ Frontend (Public Portfolio)
Language: TypeScript

Framework: Next.js (App Router)

Styling: Tailwind CSS

Animations: Framer Motion (with option to use Motion.dev / GSAP later)

UI Helpers: shadcn/ui or Radix UI (optional)

Data Source: Backend REST API (https://your-backend-domain/api/projects)

Goals:

Smooth transitions (page / section animations)

Project cards with hover effects + tags

Individual project pages with case‑study feel

Fully responsive, mobile‑first

🔥 Backend (Admin Panel + API)
Framework: Next.js (App Router)

API Layer: Next.js API Routes in src/app/api/...

Auth: Custom JWT-based auth with bcrypt‑hashed password

Admin UI: Basic but powerful CRUD interface:

View all projects

Add new project

Edit project

Delete project

Upload project image → gets Cloudinary URL

Admin Security Requirements
Login Page:

Route: /admin/login

Form: email + password

Validates against an Admin user stored in MongoDB (hashed password).

Auth Flow:

User submits credentials to POST /api/auth/login.

Backend:

Checks email in DB.

Compares password with bcrypt.

If valid → creates JWT.

Sets JWT in HTTP‑only cookie.

Protected admin routes (UI + API) check for valid JWT:

If no/invalid token → redirect to /admin/login or return 401.

Protected Areas:

/admin/projects

/admin/projects/add

/admin/projects/[id]

Any write API:

POST /api/projects

PUT /api/projects/[id]

DELETE /api/projects/[id]

POST /api/upload (Cloudinary)

🗄 Database (Projects & Admin User)
DB: MongoDB Atlas (Free Tier)

Driver/ORM: Mongoose

Database Name: portfolio

Collections:

projects

admins (for login)

Project Schema (Mongoose)
Fields (approx):

title: string (required)

slug: string (required, unique)

description: string (required)

tags: string[]

liveUrl?: string

githubUrl?: string

imageUrl?: string (from Cloudinary)

featured: boolean (default: false)

createdAt: Date (auto)

updatedAt: Date (auto)

Admin Schema (Mongoose)
email: string (unique)

passwordHash: string (bcrypt hash)

Optionally: role: "admin"

🖼 Image Storage (Project Thumbnails / Banners)
Service: Cloudinary (Free plan)

Usage:

Backend exposes POST /api/upload endpoint.

Admin panel form sends file (via <input type="file" />).

Backend uploads to Cloudinary using secret API keys.

Cloudinary returns secure_url.

URL gets saved into imageUrl field in MongoDB.

Advantages:

Free CDN hosting

Resizing & optimization

Perfect for a visual portfolio

📁 Repository Structure
text
Copy code
root/
│
├── frontend/                  # Public portfolio Next.js app
│
├── backend/                   # Admin panel + API + DB + Auth + Upload
│
├── docs/                      # Documentation
│   ├── blueprint.md           # (this file)
│   ├── api-reference.md
│   ├── setup-guide.md
│   ├── project-structure.md
│   └── screenshots/
│
└── README.md                  # High-level project overview (for GitHub)
🔐 Authentication & Security (Backend)
Environment Variables (Backend .env.local)
MONGODB_URI=...

JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...

CLOUDINARY_API_KEY=...

CLOUDINARY_API_SECRET=...

Auth Rules
All write operations require JWT.

All admin UI pages are protected via middleware or server checks.

Token stored in HTTP‑only cookie to avoid XSS token theft.

Passwords never stored in plain text (only bcrypt hashes).

📡 API Endpoints (Summary)
Auth
POST /api/auth/login

Body: { email, password }

On success: set JWT cookie, return { success: true }.

GET /api/auth/me (optional)

Returns current admin info if token valid.

Projects
GET /api/projects

Public: returns list of projects (for frontend).

POST /api/projects (Protected)

Create new project.

GET /api/projects/[id]

Fetch single project (optional for detail page).

PUT /api/projects/[id] (Protected)

Update project.

DELETE /api/projects/[id] (Protected)

Delete project.

Upload
POST /api/upload (Protected)

Accepts image file.

Uploads to Cloudinary.

Returns { url: "https://...cloudinary.../image.jpg" }.

🧩 UI Screens
Public Frontend
/ → Hero, featured projects, recent work, navigation

/projects → Grid/list of all projects (filter by tags)

/projects/[slug] → Detailed case study page

/about → About, skills, tech stack

/contact → Contact details / form

Admin Panel
/admin/login → Secure login

/admin/projects → List of all projects, quick actions

/admin/projects/add → Create new project form

/admin/projects/[id] → Edit/delete project

(optionally /admin/profile for admin settings later)

📊 Scale & Limits
Projects: 50–100+ easily (and even 1000+ later)

MongoDB Storage: Estimated:

100 projects ≈ 1–2 MB text + refs

Well below free 512 MB

Images Storage: Cloudinary:

100 images @ 200 KB ≈ 20 MB

Far below free limit

 Deployment Plan
Frontend
Platform: Vercel

Connect frontend folder as project.

Uses backend API base URL in env (e.g. NEXT_PUBLIC_API_BASE_URL).

Backend
Platform: Vercel

Connect backend folder as a separate project.

Configure env vars for MongoDB & Cloudinary.

All API routes + admin UI are deployed as serverless Next.js functions.

External Services
MongoDB Atlas: Free shared cluster.

Cloudinary: Free account for images.

✅ Project Checklist
 Frontend app created (Next.js, TS, Tailwind, Framer Motion)

 Backend app created (Next.js, TS, Tailwind)

 MongoDB Atlas cluster + connection string

 Mongoose models: Project, Admin

 DB connection helper (connectDB)

 Auth API (/api/auth/login) + bcrypt + JWT

 Protected admin routes

 Projects CRUD API

 Cloudinary upload API

 Admin UI pages + forms

 Frontend integrated with backend /api/projects

 Deployed on Vercel (frontend + backend)

 Screenshots saved in docs/screenshots

🔚 Summary
This blueprint describes a modern, motion-heavy, full-stack portfolio system with:

A secure admin backend

Real database & cloud image storage

Clean separation between frontend and backend

Free‑tier‑friendly infra for long‑term usage

Technologies that look great on a CV and in interviews