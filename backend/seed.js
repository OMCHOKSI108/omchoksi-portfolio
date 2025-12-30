/*
  Seed script for projects.
  Expected input: a file named `Final_project_description.txt` in the same folder as this script.

  Each project line should be in a simple pipe-separated format:
    Title|LiveURL|GitHubURL|tag1,tag2|Description

  If the file contains JSON array it will be parsed instead.

  Usage: set MONGODB_URI in .env.local then run:
    node seed.js
*/
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f2f8b6b3e8a1f6d6b5b7f2b9b2a6a3c';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI in environment');
    process.exit(1);
  }
  await mongoose.connect(uri);

  // Define a local Project schema to avoid requiring TS source files directly
  const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, index: true },
    description: String,
    projectMarkdown: String,
    tags: [String],
    priority: { type: Number, default: 999, index: true },
    liveUrl: String,
    githubUrl: String,
    images: [
      {
        url: String,
        caption: String,
        showOnProject: Boolean,
      },
    ],
    active: { type: Boolean, default: true },
    featured: Boolean,
  }, { timestamps: true });

  const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

  const file = path.join(__dirname, 'Final_project_description.txt');
  if (!fs.existsSync(file)) {
    console.error('Final_project_description.txt not found in backend folder. Create it with pipe-separated lines or JSON array.');
    process.exit(1);
  }

  // Helper: parse the labelled docs-style format found in Final_project_description.txt
  function slugify(str) {
    return (str || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function parseProjects(text) {
    const lines = text.split(/\r?\n/);
    const projects = [];
    let current = null;

    function pushCurrent() {
      if (current && current.title) projects.push(current);
      current = null;
    }

    for (let rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // start marker
      if (/^No\s*\d+/i.test(line)) {
        pushCurrent();
        current = { title: '', slug: '', description: '', tags: [], liveUrl: '', githubUrl: '', imageUrl: '', featured: false, status: 'draft' };
        const mProject = line.match(/Project Name\s*:\s*(.*)$/i);
        if (mProject) current.title = mProject[1].trim();
        continue;
      }

      if (!current) {
        current = { title: '', slug: '', description: '', tags: [], liveUrl: '', githubUrl: '', imageUrl: '', featured: false, status: 'draft' };
      }

      const mProject = line.match(/^Project Name\s*:\s*(.*)$/i);
      const mLink = line.match(/^Link\s*:\s*(.*)$/i);
      const mTags = line.match(/^Tags\s*:\s*(.*)$/i);
      const mDesc = line.match(/^Description\s*:\s*(.*)$/i);

      if (mProject) { current.title = mProject[1].trim(); continue; }
      if (mLink) {
        const url = mLink[1].trim();
        if (/github\.com/i.test(url)) current.githubUrl = url; else current.liveUrl = url;
        continue;
      }
      if (mTags) { current.tags = mTags[1].split(',').map(t => t.trim()).filter(Boolean); continue; }
      if (mDesc) { current.description = mDesc[1].trim(); continue; }

      // otherwise append to description
      if (current.description) current.description += '\n' + line; else current.description = line;
    }

    pushCurrent();

    // postprocess
    return projects.map((p, idx) => {
      const title = p.title || `Project ${idx + 1}`;
      const slugBase = slugify(title) || `project-${idx + 1}`;
      const imageUrl = p.imageUrl || `https://source.unsplash.com/collection/190727/800x600?sig=${idx}`;
      const status = (p.liveUrl && p.liveUrl.length) ? 'live' : (p.status || 'draft');
      return {
        title,
        slug: slugBase,
        description: p.description || '',
        tags: p.tags || [],
        liveUrl: p.liveUrl || '',
        githubUrl: p.githubUrl || '',
        imageUrl,
        featured: !!p.featured,
        status,
      };
    });
  }

  const raw = fs.readFileSync(file, 'utf8').trim();
  let projects = [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) projects = parsed;
  } catch (e) {
    // try to parse the labelled text format (No N. Project Name: ...)
    projects = parseProjects(raw);
  }

  if (!projects.length) {
    console.error('No projects parsed from file. Ensure correct format.');
    process.exit(1);
  }

  // --- CLEANUP: remove duplicate titles already present in DB ---
  try {
    const dupGroups = await Project.aggregate([
      { $group: { _id: { $toLower: '$title' }, ids: { $push: '$_id' }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    for (const g of dupGroups) {
      // keep the first id, remove the rest
      const ids = g.ids || [];
      if (ids.length <= 1) continue;
      const keep = ids[0];
      const remove = ids.slice(1);
      const res = await Project.deleteMany({ _id: { $in: remove } });
      console.log(`Removed ${res.deletedCount || 0} duplicate(s) for title group: ${g._id}`);
    }
  } catch (err) {
    console.error('Error cleaning duplicate titles in DB:', err.message || err);
  }

  // Deduplicate parsed projects (by title) to avoid seeding duplicates from the source file
  const seen = new Set();
  projects = projects.filter((p) => {
    const t = (p.title || '').toString().trim().toLowerCase();
    if (!t) return false;
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  for (const p of projects) {
    const slug = (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `project-${Date.now()}`;
    const images = p.images && Array.isArray(p.images) && p.images.length ? p.images : [{ url: p.imageUrl || DEFAULT_IMAGE, caption: 'Default', showOnProject: true }];
    const doc = {
      title: p.title,
      slug,
      description: p.description || '',
      projectMarkdown: p.projectMarkdown || p.markdown || '',
      tags: p.tags || [],
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      images,
      active: typeof p.active === 'boolean' ? p.active : true,
      featured: !!p.featured,
    };
    try {
      await Project.findOneAndUpdate({ slug }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log('Upserted', slug);
    } catch (err) {
      console.error('Failed to upsert', slug, err.message);
    }
  }

  console.log('Seeding complete.');
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
