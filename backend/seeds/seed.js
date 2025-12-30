/**
 * seed.js
 *
 * Lightweight seed script that reads `Final_project_description.txt` at the
 * repository root and upserts projects into MongoDB. It supports two formats:
 *  - JSON array (entire file is JSON)
 *  - Labelled blocks matching: "No N. Project Name: <title>\nDescription: ..."
 *
 * Usage (PowerShell):
 *   $env:MONGODB_URI='your-uri'; node .\seed.js
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const PROJECTS_FILE = path.resolve(__dirname, '..', '..', 'Final_project_description.txt');

function parseProjects(text) {
  // Try JSON first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // not JSON
  }

  // Labelled parser: splits by blank lines and extracts key: value lines
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const projects = [];

  for (const block of blocks) {
    const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    const obj = {};
    for (const line of lines) {
      const sep = line.indexOf(':');
      if (sep === -1) continue;
      const key = line.slice(0, sep).trim();
      const val = line.slice(sep + 1).trim();
      const k = key.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      obj[k] = val;
    }
    if (Object.keys(obj).length) projects.push(obj);
  }

  return projects;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI in environment before running this script');
    process.exit(1);
  }

  if (!fs.existsSync(PROJECTS_FILE)) {
    console.error('Projects file not found at', PROJECTS_FILE);
    process.exit(1);
  }

  const raw = fs.readFileSync(PROJECTS_FILE, 'utf8');
  const parsed = parseProjects(raw);
  if (!parsed || !parsed.length) {
    console.error('No projects parsed from file. Exiting.');
    process.exit(1);
  }

  await mongoose.connect(uri);

  const projectSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    tags: [String],
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
    featured: { type: Boolean, default: false },
  }, { timestamps: true });

  const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

  for (const p of parsed) {
    const title = p.title || p[Object.keys(p)[0]] || 'Untitled';
    const slug = (title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const description = p.description || p.desc || '';
    const tags = (p.tags || p.stack || '') ? (p.tags || p.stack).split(',').map(s => s.trim()).filter(Boolean) : [];
    const liveUrl = p.liveurl || p.live || '';
    const githubUrl = p.github || p.githuburl || p.repo || '';

    const images = [{ url: '/docs/image.png', caption: 'Default', showOnProject: true }];

    const up = {
      title,
      slug,
      description,
      tags,
      liveUrl,
      githubUrl,
      images,
      active: true,
    };

    console.log('Upserting', title);
    await Project.updateOne({ slug }, { $set: up }, { upsert: true });
  }

  await mongoose.disconnect();
  console.log('Seeding complete');
}

main().catch(err => { console.error(err); process.exit(1); });
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
    tags: [String],
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

  const file = path.join(__dirname, '..', 'Final_project_description.txt');
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

  for (const p of projects) {
    const slug = (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `project-${Date.now()}`;
    const images = p.images && Array.isArray(p.images) && p.images.length ? p.images : [{ url: p.imageUrl || DEFAULT_IMAGE, caption: 'Default', showOnProject: true }];
    const doc = {
      title: p.title,
      slug,
      description: p.description || '',
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
