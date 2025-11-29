QA Checklist — Portfolio Admin Panel
Generated: 2025-11-29

Use this checklist to verify functionality after changes.

Authentication
- [ ] Register an admin (if database is empty) via `POST /api/auth/register`.
- [ ] Attempt to access `/admin` when not logged in — should redirect to `/admin/login`.
- [ ] Login with valid credentials — verify `Set-Cookie: admin_token` present and cookie stored.
- [ ] Verify `GET /api/auth/me` returns admin id and email after login.
- [ ] Logout (POST /api/auth/logout) — cookie cleared and `/admin` redirects back to login.

Dashboard & Projects
- [ ] On login, dashboard loads and shows skeleton loader during fetch.
- [ ] If no projects, message: "There are currently no projects to display." is shown.
- [ ] Projects grid renders `ProjectCard`s with thumbnail, title, date, tags, and Edit button.
- [ ] Search bar filters projects with debounce; typing triggers requests after 300ms.
- [ ] Pagination works (`page` and `limit` query params) and `total` returned by API matches count.

Editor & CRUD
- [ ] Click Edit on a project — Editor view opens with fields populated.
- [ ] Modify fields to show unsaved changes indicator (dirty state).
- [ ] Save changes — server `updatedAt` reflects change and toast "Changes saved successfully" appears.
- [ ] Create new project via POST `/api/projects` (auth) — new project appears in listing.
- [ ] Delete a project — confirmation modal appears; on confirm project removed and toast shown.

Upload
- [ ] Upload images via the editor file input — verify response `{ url }` returned and image displays.
- [ ] Large files should stream (no large memory spike) — monitor server memory during upload.

Performance & Security
- [ ] `GET /api/projects` responds quickly with `items` and `total` for page=1.
- [ ] Confirm `Cache-Control` header present for public lists (optional).
- [ ] Ensure cookies are `HttpOnly` and `SameSite=Lax` and `secure` in production.
- [ ] Test rate limiting on `/api/auth/login` (simulate repeated failures).

Manual UI checks
- [ ] Responsive layout: desktop/tablet/mobile screens tested.
- [ ] Minimalist styling maintained and animations smooth (no over-animation).

Notes
- If anything fails, check server logs and network tab for request/response details and paste them here for help troubleshooting.
