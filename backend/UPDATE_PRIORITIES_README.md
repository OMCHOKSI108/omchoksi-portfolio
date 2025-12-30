# Priority Update Script

## Purpose
This script automatically assigns sequential priority numbers (1, 2, 3, ...) to all existing projects in your database that currently have default priority values (0 or 999).

## When to Use
- After adding the priority system to existing projects
- When you want to auto-assign priorities based on creation date
- To reset priorities for projects that haven't been manually ordered

## How It Works
1. Connects to your MongoDB database
2. Fetches all projects sorted by creation date (oldest first)
3. Assigns priority 1 to the oldest project, 2 to the next, etc.
4. Only updates projects with priority 0 or 999 (skips manually set priorities)

## Usage

### Step 1: Navigate to backend folder
```bash
cd backend
```

### Step 2: Run the script
```bash
node update-priorities.js
```

### Expected Output
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB
📊 Fetching all projects...
📦 Found 65 projects
🔄 Updating priorities...

✅ [1] Project Alpha (was: 0)
✅ [2] Project Beta (was: 999)
✅ [3] Project Gamma (was: 0)
...
⏭️  [10] Featured Project (already set, skipping)
...

============================================================
✅ Priority update complete!
   Updated: 55 projects
   Skipped: 10 projects (already had custom priority)
============================================================
🔌 Disconnected from MongoDB
```

## What Happens
- **Projects with priority 0 or 999**: Updated to sequential numbers (1, 2, 3...)
- **Projects with custom priorities**: Skipped (not modified)
- **Order**: Based on creation date (oldest = priority 1)

## After Running
1. Go to your homepage
2. Projects will now display in priority order
3. You can manually adjust priorities in the admin panel if needed

## Example Result
If you have 65 projects created over time:

| Project | Created Date | Old Priority | New Priority |
|---------|--------------|--------------|--------------|
| Oldest Project | 2023-01-01 | 0 | 1 |
| Second Oldest | 2023-02-15 | 999 | 2 |
| Third Oldest | 2023-03-20 | 0 | 3 |
| ... | ... | ... | ... |
| Newest Project | 2024-12-29 | 0 | 65 |

## Notes
- ✅ Safe to run multiple times (won't change manually set priorities)
- ✅ Only updates projects with default values (0 or 999)
- ✅ Preserves manually set priorities
- ✅ Can be run anytime to update new projects

## Troubleshooting

### Error: "MONGODB_URI not found"
Make sure you have `.env.local` file in the backend folder with:
```
MONGODB_URI=your_mongodb_connection_string
```

### Error: "No projects found"
Your database is empty. Add projects first using the admin panel or seed script.

### Want to reset all priorities?
If you want to reset ALL priorities (including manually set ones), modify line 66 in the script:
```javascript
// Change this:
if (project.priority === 0 || project.priority === 999 || !project.priority) {

// To this:
if (true) {
```

## Related Files
- `backend/update-priorities.js` - This script
- `backend/seed.js` - Main seed script (now includes priority field)
- `backend/src/models/Project.ts` - Project model with priority field
- `backend/src/services/projectService.ts` - Sorting logic
