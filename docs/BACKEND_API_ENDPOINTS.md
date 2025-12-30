# Backend API Endpoints Documentation

## Summary
**Total Endpoints: 19** (across 5 main resource categories)

---

## 1. Projects API (7 endpoints)

### Base URL: `/api/projects`

| Method | Endpoint | Auth Required | Description | Used In Frontend |
|--------|----------|---------------|-------------|------------------|
| **GET** | `/api/projects` | ❌ No | List all projects (sorted by priority, then date) | ✅ `components/projects.tsx`<br/>✅ `app/work/page.tsx` |
| **GET** | `/api/projects?slug={slug}` | ❌ No | Get project by slug | ✅ `app/projects/[slug]/page.tsx` |
| **POST** | `/api/projects` | ✅ Yes | Create new project | ❌ Not used in frontend |
| **PUT** | `/api/projects/[id]` | ✅ Yes | Update project by ID | ❌ Not used in frontend |
| **DELETE** | `/api/projects/[id]` | ✅ Yes | Delete project by ID | ❌ Not used in frontend |
| **PATCH** | `/api/projects/[id]/priority` | ✅ Yes | Update single project priority | ❌ Not used in frontend |
| **PATCH** | `/api/projects/priority` | ✅ Yes | Bulk update project priorities | ❌ Not used in frontend |

**Frontend Usage:**
- `src/components/projects.tsx` (line 46) - Fetches projects for homepage
- `src/app/work/page.tsx` (line 34) - Fetches projects for work page
- `src/app/projects/[slug]/page.tsx` (line 32) - Fetches single project by slug

---

## 2. Blogs API (5 endpoints)

### Base URL: `/api/blogs`

| Method | Endpoint | Auth Required | Description | Used In Frontend |
|--------|----------|---------------|-------------|------------------|
| **GET** | `/api/blogs` | ❌ No | List all blogs (with pagination) | ✅ `components/blog.tsx`<br/>✅ `app/blog/page.tsx` |
| **GET** | `/api/blogs?slug={slug}` | ❌ No | Get blog by slug | ✅ `app/blog/[slug]/page.tsx` |
| **POST** | `/api/blogs` | ✅ Yes | Create new blog | ❌ Not used in frontend |
| **PUT** | `/api/blogs/[id]` | ✅ Yes | Update blog by ID | ❌ Not used in frontend |
| **DELETE** | `/api/blogs/[id]` | ✅ Yes | Delete blog by ID | ❌ Not used in frontend |

**Frontend Usage:**
- `src/components/blog.tsx` (line 29) - Fetches 3 latest blogs for homepage
- `src/app/blog/page.tsx` (line 41) - Fetches all blogs for blog listing page
- `src/app/blog/[slug]/page.tsx` (line 34) - Fetches single blog by slug

---

## 3. Certifications API (5 endpoints)

### Base URL: `/api/certifications`

| Method | Endpoint | Auth Required | Description | Used In Frontend |
|--------|----------|---------------|-------------|------------------|
| **GET** | `/api/certifications` | ❌ No | List all certifications (with pagination) | ✅ `components/certifications.tsx`<br/>✅ `components/testimonials.tsx`<br/>✅ `app/certifications/page.tsx` |
| **GET** | `/api/certifications?slug={slug}` | ❌ No | Get certification by slug | ✅ `app/certifications/[slug]/page.tsx` |
| **POST** | `/api/certifications` | ✅ Yes | Create new certification | ❌ Not used in frontend |
| **PUT** | `/api/certifications/[id]` | ✅ Yes | Update certification by ID | ❌ Not used in frontend |
| **DELETE** | `/api/certifications/[id]` | ✅ Yes | Delete certification by ID | ❌ Not used in frontend |

**Frontend Usage:**
- `src/components/certifications.tsx` (line 30) - Fetches 6 certifications for homepage
- `src/components/testimonials.tsx` (line 48) - Fetches 6 certifications
- `src/app/certifications/page.tsx` (line 33) - Fetches all certifications
- `src/app/certifications/[slug]/page.tsx` (line 35) - Fetches single certification by slug

---

## 4. Authentication API (5 endpoints)

### Base URL: `/api/auth`

| Method | Endpoint | Auth Required | Description | Used In Frontend |
|--------|----------|---------------|-------------|------------------|
| **POST** | `/api/auth/register` | ❌ No | Register new admin (only if no admin exists) | ❌ Not used in frontend |
| **POST** | `/api/auth/login` | ❌ No | Login admin (sets httpOnly cookie) | ❌ Not used in frontend |
| **GET** | `/api/auth/me` | ✅ Yes | Get current admin info | ❌ Not used in frontend |
| **POST** | `/api/auth/logout` | ✅ Yes | Logout admin (clears cookie) | ❌ Not used in frontend |
| **POST** | `/api/auth/update` | ✅ Yes | Update admin email/password | ❌ Not used in frontend |

**Frontend Usage:**
- ❌ **None** - These endpoints are likely used in a separate admin panel

---

## 5. Upload API (1 endpoint)

### Base URL: `/api/upload`

| Method | Endpoint | Auth Required | Description | Used In Frontend |
|--------|----------|---------------|-------------|------------------|
| **POST** | `/api/upload` | ✅ Yes | Upload image to Cloudinary | ❌ Not used in frontend |

**Frontend Usage:**
- ❌ **None** - This endpoint is likely used in a separate admin panel

---

## Backend URL Configuration

The frontend uses two different backend URLs:

1. **Environment Variable**: `process.env.NEXT_PUBLIC_BACKEND_URL`
   - Used for: Projects API
   - Files: `components/projects.tsx`, `app/work/page.tsx`, `app/projects/[slug]/page.tsx`

2. **Hardcoded URL**: `https://portfolio-admin-panel-sigma.vercel.app`
   - Used for: Blogs, Certifications
   - Files: All blog and certification components

---

## Authentication Method

- **Type**: JWT (JSON Web Token)
- **Storage**: HTTP-only cookies
- **Cookie Name**: `admin_token`
- **Expiry**: 7 days
- **Security**: 
  - HttpOnly: ✅ Yes (prevents XSS)
  - Secure: ✅ Yes (in production)
  - SameSite: Lax

---

## CORS Configuration

All endpoints support CORS with the following headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Query Parameters

### Common Parameters:
- `page` - Page number for pagination (default: 1)
- `limit` - Number of items per page (default: 10)
- `slug` - Unique slug identifier for fetching single items

### Examples:
```
GET /api/projects?limit=20
GET /api/blogs?page=1&limit=3
GET /api/certifications?slug=aws-certified
```

---

## Response Format

### Success Response:
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response:
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Endpoints NOT Used in Frontend

The following endpoints are **NOT** currently used in the frontend portfolio:

1. **All Authentication Endpoints** (5 endpoints)
   - `/api/auth/register`
   - `/api/auth/login`
   - `/api/auth/me`
   - `/api/auth/logout`
   - `/api/auth/update`

2. **All Create/Update/Delete Endpoints** (9 endpoints)
   - `POST /api/projects`
   - `PUT /api/projects/[id]`
   - `DELETE /api/projects/[id]`
   - `POST /api/blogs`
   - `PUT /api/blogs/[id]`
   - `DELETE /api/blogs/[id]`
   - `POST /api/certifications`
   - `PUT /api/certifications/[id]`
   - `DELETE /api/certifications/[id]`

3. **Upload Endpoint** (1 endpoint)
   - `POST /api/upload`

**Total Unused**: 15 out of 17 endpoints

These endpoints are likely used in a **separate admin panel** for content management.

---

## Endpoints USED in Frontend

Only **2 types of operations** are used:

1. **GET /api/projects** - List projects
2. **GET /api/blogs** - List blogs
3. **GET /api/certifications** - List certifications

All with optional `slug`, `page`, and `limit` query parameters.

**Total Used**: 2 endpoints (GET operations only)

---

## Recommendations

1. ✅ **Frontend is read-only** - Good security practice
2. ⚠️ **Inconsistent backend URLs** - Consider using environment variable for all APIs
3. ✅ **Proper authentication** - JWT with httpOnly cookies
4. ✅ **CORS enabled** - Allows frontend to access backend
5. ⚠️ **No error handling UI** - Frontend should handle API errors gracefully

---

## File Locations

### Backend Routes:
- `backend/app/api/projects/route.ts`
- `backend/app/api/projects/[id]/route.ts`
- `backend/app/api/blogs/route.ts`
- `backend/app/api/blogs/[id]/route.ts`
- `backend/app/api/certifications/route.ts`
- `backend/app/api/certifications/[id]/route.ts`
- `backend/app/api/auth/login/route.ts`
- `backend/app/api/auth/register/route.ts`
- `backend/app/api/auth/me/route.ts`
- `backend/app/api/auth/logout/route.ts`
- `backend/app/api/auth/update/route.ts`
- `backend/app/api/upload/route.ts`

### Frontend API Calls:
- `frontend/src/components/projects.tsx`
- `frontend/src/components/blog.tsx`
- `frontend/src/components/certifications.tsx`
- `frontend/src/components/testimonials.tsx`
- `frontend/src/app/work/page.tsx`
- `frontend/src/app/blog/page.tsx`
- `frontend/src/app/blog/[slug]/page.tsx`
- `frontend/src/app/certifications/page.tsx`
- `frontend/src/app/certifications/[slug]/page.tsx`
- `frontend/src/app/projects/[slug]/page.tsx`

---

## 🆕 Project Priority System

### Overview
A new priority system has been added to control the display order of projects. Projects are now sorted by their `priority` value (ascending), with lower numbers appearing first.

### Key Features
- **Priority Field**: Each project has a `priority` number (default: 999)
- **Automatic Sorting**: Projects are sorted by priority (1, 2, 3...) then by creation date
- **Single Update**: Update one project's priority at a time
- **Bulk Update**: Update multiple projects' priorities in one API call

### New Endpoints

#### 1. Update Single Project Priority
```
PATCH /api/projects/[id]/priority
```
**Request Body:**
```json
{
  "priority": 1
}
```

#### 2. Bulk Update Priorities
```
PATCH /api/projects/priority
```
**Request Body:**
```json
{
  "updates": [
    { "id": "project_id_1", "priority": 1 },
    { "id": "project_id_2", "priority": 2 },
    { "id": "project_id_3", "priority": 3 }
  ]
}
```

### Usage Example
If you have 65 projects:
- Set priority 1 for your best project (appears first on homepage)
- Set priority 2 for your second-best project
- Set priority 65 for your least important project
- Projects without explicit priority (999) appear last

### Admin Panel Integration
You can implement:
1. **Drag-and-drop reordering** - Reorder projects visually
2. **Manual priority input** - Set specific priority numbers
3. **Auto-numbering** - Automatically assign 1-65 based on current order

### Documentation
For complete documentation, examples, and admin panel integration guide, see:
📄 **[PROJECT_PRIORITY_SYSTEM.md](./PROJECT_PRIORITY_SYSTEM.md)**

---

## Updated File Locations

### New Backend Routes:
- `backend/app/api/projects/[id]/priority/route.ts` - Single priority update
- `backend/app/api/projects/priority/route.ts` - Bulk priority update

### Modified Backend Files:
- `backend/src/models/Project.ts` - Added priority field
- `backend/src/services/projectService.ts` - Added sorting and priority functions
- `backend/src/controllers/projectController.ts` - Added priority handlers
