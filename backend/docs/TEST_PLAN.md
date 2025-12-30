Test Plan

This document describes manual and automated tests to validate the core portfolio backend and admin flows.

Scope
- Admin create/update/delete projects
- Multi-image upload, deletion, and showOnProject selection
- Active toggle behavior and public visibility
- Seed scripts and maintenance utilities

Manual Test Cases

1. Admin login
   - Steps: Login with admin credentials. Expect: redirect to admin dashboard.

2. Create project with multiple images
   - Steps: Admin -> Add Project -> Upload 2-3 images -> Ensure one is marked Main -> Save.
   - Expect: Project listed in Admin with chosen main image; public listing shows the project when active is true.

3. Replace main image
   - Steps: Edit a project, upload new image, mark it Main, remove old image, Save.
   - Expect: Admin listing and public page show the new image after save and refresh.

4. Delete image and verify persistence
   - Steps: Edit a project, Delete an image, Save, Refresh.
   - Expect: Deleted image does not reappear after refresh.

5. Toggle Active
   - Steps: Toggle Active off in Admin list or edit page.
   - Expect: Public GET /api/projects no longer includes that project.

6. Run seed script
   - Steps: set MONGODB_URI and run node backend/seeds/seed.js.
   - Expect: Projects from Final_project_description.txt upserted without duplicates.

Automated Smoke Tests

We provide a simple Node-based smoke test that runs against a running dev/staging server.

- File: backend/tests/run_smoke_tests.js
- Requirements: Node 18+ (for global fetch) or install node-fetch.
- Environment variables: BASE_URL (default http://localhost:3000)

Simple run instructions (Windows PowerShell):
1) Start dev server in another terminal (npm run dev).
2) In this repository root open PowerShell and run:
   $env:BASE_URL='http://localhost:3000'; node .\backend\tests\run_smoke_tests.js

If you prefer CMD:
   set BASE_URL=http://localhost:3000 && node backend\tests\run_smoke_tests.js

Regression & E2E Suggestions
- Add Playwright or Cypress tests that run in CI against a staging environment and cover full flows.

Reporting
- Smoke test script prints a short summary and exits non-zero on failures, suitable for CI.
