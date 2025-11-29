# Deployment Guide

This document explains how to deploy the `backend` Next.js app to production.

Recommended targets
- Vercel: easiest path for Next.js projects (automatic builds + previews).
- Docker: containerize the app and run on any container platform (Cloud Run, ECS, Azure App Service, DigitalOcean, etc.).

Environment variables (required)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign admin tokens
- `CLOUDINARY_URL` / cloudinary credentials — for image uploads (if used)
- `NEXT_PUBLIC_API_BASE` — optional public API base

Vercel
1. Connect the GitHub repository to Vercel.
2. Set Environment Variables in the Vercel project settings (MONGODB_URI, JWT_SECRET, CLOUDINARY_*).
3. Deploy — Vercel will detect the Next.js app under `backend` if you set the project root, or you can move the app folder accordingly.

Docker (self-managed)
1. Build the image locally:
   docker build -t omchoksi-portfolio-backend:latest -f backend/Dockerfile ./backend

2. Run the container (example):
   docker run -e MONGODB_URI="your-uri" -e JWT_SECRET="s3cr3t" -p 3000:3000 omchoksi-portfolio-backend:latest

CI (GitHub Actions)
- A workflow `/.github/workflows/ci.yml` is included which builds the backend and runs smoke tests on PRs and pushes to `main`.

Notes
- Make sure to keep secrets (JWT, Mongo URI, Cloudinary) in your deployment provider's secret store.
- For better reliability, add health checks and monitoring (Sentry, Prometheus) and configure restart policies.
