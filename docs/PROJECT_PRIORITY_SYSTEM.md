# Project Priority System Documentation

## Overview
The priority system allows you to control the display order of projects on your portfolio. Projects are sorted by their priority value (ascending), with lower numbers appearing first.

---

## Database Changes

### New Field: `priority`
- **Type**: Number
- **Default**: 999
- **Index**: Yes (for efficient sorting)
- **Description**: Controls the display order of projects. Lower numbers = higher priority (appear first)

**Example:**
- Priority 1 → Appears first
- Priority 2 → Appears second
- Priority 65 → Appears 65th
- Priority 999 → Default (appears last)

---

## API Endpoints

### 1. Update Single Project Priority

**Endpoint:** `PATCH /api/projects/[id]/priority`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "priority": 1
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Project priority updated",
  "data": {
    "_id": "...",
    "title": "Project Name",
    "priority": 1,
    ...
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Priority must be a number"
}
```

**Example Usage:**
```bash
# Update project priority to 1 (first position)
curl -X PATCH https://your-backend.com/api/projects/PROJECT_ID/priority \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{"priority": 1}'
```

---

### 2. Bulk Update Project Priorities

**Endpoint:** `PATCH /api/projects/priority`

**Authentication:** Required (Admin only)

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

**Response (Success):**
```json
{
  "success": true,
  "message": "Updated 3 projects",
  "data": {
    "modifiedCount": 3
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Each update must have id (string) and priority (number)"
}
```

**Example Usage:**
```bash
# Reorder multiple projects at once
curl -X PATCH https://your-backend.com/api/projects/priority \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{
    "updates": [
      {"id": "abc123", "priority": 1},
      {"id": "def456", "priority": 2},
      {"id": "ghi789", "priority": 3}
    ]
  }'
```

---

## How It Works

### 1. Default Behavior
- New projects automatically get `priority: 999`
- They appear at the end of the list
- Sorted by `createdAt` (newest first) among projects with the same priority

### 2. Custom Ordering
- Set priority to `1` for the first project
- Set priority to `2` for the second project
- And so on...

### 3. Sorting Logic
Projects are sorted by:
1. **Priority** (ascending) - Lower numbers first
2. **Created Date** (descending) - Newer first (for same priority)

**Example:**
```
Priority 1, Created: 2024-01-15  → Position 1
Priority 2, Created: 2024-01-10  → Position 2
Priority 3, Created: 2024-01-20  → Position 3
Priority 999, Created: 2024-02-01 → Position 4 (newest without priority)
Priority 999, Created: 2024-01-25 → Position 5
Priority 999, Created: 2024-01-05 → Position 6 (oldest without priority)
```

---

## Admin Panel Integration

### Recommended UI Features

#### 1. **Drag-and-Drop Reordering**
```javascript
// Example: After user drags projects to reorder
const reorderedProjects = [
  { id: 'project1', priority: 1 },
  { id: 'project2', priority: 2 },
  { id: 'project3', priority: 3 },
  // ... up to 65 projects
];

// Send bulk update
fetch('/api/projects/priority', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify({ updates: reorderedProjects })
});
```

#### 2. **Manual Priority Input**
```javascript
// Example: Update single project priority
async function updatePriority(projectId, newPriority) {
  const response = await fetch(`/api/projects/${projectId}/priority`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ priority: newPriority })
  });
  
  return response.json();
}
```

#### 3. **Auto-numbering Button**
```javascript
// Example: Auto-assign priorities 1-65 based on current order
async function autoNumberProjects(projects) {
  const updates = projects.map((project, index) => ({
    id: project._id,
    priority: index + 1
  }));
  
  await fetch('/api/projects/priority', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ updates })
  });
}
```

---

## Frontend Display

### Fetching Projects (Already Updated)
The existing `GET /api/projects` endpoint now automatically sorts by priority:

```javascript
// Frontend code (no changes needed)
const response = await fetch('/api/projects?limit=20');
const data = await response.json();

// Projects are already sorted by priority
// Priority 1 appears first, priority 65 appears last
```

### Example Response
```json
{
  "success": true,
  "message": "Projects fetched",
  "data": {
    "items": [
      {
        "_id": "...",
        "title": "Featured Project",
        "priority": 1,
        ...
      },
      {
        "_id": "...",
        "title": "Second Project",
        "priority": 2,
        ...
      },
      ...
    ],
    "total": 65,
    "page": 1,
    "limit": 20
  }
}
```

---

## Use Cases

### Use Case 1: Showcase Your Best Work First
```
Priority 1: Your most impressive project
Priority 2: Second best project
Priority 3-10: Other notable projects
Priority 999: Older/less relevant projects
```

### Use Case 2: Feature Recent Work
```
Priority 1: Latest client project
Priority 2: Recent personal project
Priority 3-5: Other recent work
Priority 999: Archive of older projects
```

### Use Case 3: Organize by Category
```
Priority 1-20: Web Development Projects
Priority 21-40: Mobile App Projects
Priority 41-60: Design Projects
Priority 61-65: Experimental Projects
```

---

## Migration Notes

### Existing Projects
- All existing projects will have `priority: 999` by default
- They will maintain their current order (sorted by `createdAt`)
- No action needed unless you want to customize the order

### Setting Initial Priorities
If you have 65 projects and want to set priorities 1-65:

```javascript
// Example migration script
const projects = await fetch('/api/projects?limit=100').then(r => r.json());

const updates = projects.data.items.map((project, index) => ({
  id: project._id,
  priority: index + 1
}));

await fetch('/api/projects/priority', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ updates })
});
```

---

## Best Practices

### 1. **Use Sequential Numbers**
- Start from 1, increment by 1
- Makes it easy to insert projects later

### 2. **Leave Gaps for Flexibility**
- Use 10, 20, 30 instead of 1, 2, 3
- Easier to insert new projects between existing ones

### 3. **Bulk Update for Efficiency**
- Use bulk update when reordering multiple projects
- Reduces API calls and improves performance

### 4. **Keep Priority Updated**
- Review and update priorities regularly
- Ensure your best/latest work is featured first

---

## Error Handling

### Common Errors

**1. Unauthorized**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```
**Solution:** Ensure you're logged in as admin

**2. Invalid Priority**
```json
{
  "success": false,
  "error": "Priority must be a number"
}
```
**Solution:** Send a valid number (e.g., 1, 2, 3, not "1" or null)

**3. Project Not Found**
```json
{
  "success": false,
  "error": "Project not found"
}
```
**Solution:** Check that the project ID is correct

---

## Testing

### Test Priority Updates

```bash
# 1. Create a test project
curl -X POST https://your-backend.com/api/projects \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{
    "title": "Test Project",
    "slug": "test-project",
    "description": "Testing priority system"
  }'

# 2. Update its priority to 1
curl -X PATCH https://your-backend.com/api/projects/PROJECT_ID/priority \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_TOKEN" \
  -d '{"priority": 1}'

# 3. Verify it appears first
curl https://your-backend.com/api/projects?limit=5
```

---

## Summary

✅ **Added:** `priority` field to Project model
✅ **Added:** Automatic sorting by priority (ascending)
✅ **Added:** `PATCH /api/projects/[id]/priority` - Update single project
✅ **Added:** `PATCH /api/projects/priority` - Bulk update multiple projects
✅ **Updated:** GET endpoint now sorts by priority first, then createdAt
✅ **Default:** New projects get priority 999 (appear last)

**Next Steps:**
1. Implement drag-and-drop UI in admin panel
2. Add priority input field to project edit form
3. Add "Auto-number" button to assign sequential priorities
4. Test with your 65 projects

---

## Files Modified

### Backend Files:
1. `backend/src/models/Project.ts` - Added priority field
2. `backend/src/services/projectService.ts` - Added sorting and priority functions
3. `backend/src/controllers/projectController.ts` - Added priority handlers
4. `backend/app/api/projects/[id]/priority/route.ts` - New route (single update)
5. `backend/app/api/projects/priority/route.ts` - New route (bulk update)

### No Frontend Changes Required:
- Existing frontend code will automatically display projects in priority order
- Admin panel needs to be updated to allow editing priorities
