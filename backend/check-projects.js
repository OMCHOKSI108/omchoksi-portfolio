/**
 * check-projects.js
 *
 * Script to check projects in MongoDB.
 * Run with: MONGODB_URI="your-connection-string" node check-projects.js
 */

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  tags: [{ type: String, index: true }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  images: [
    {
      url: { type: String },
      caption: { type: String },
      showOnProject: { type: Boolean, default: false },
    },
  ],
  active: { type: Boolean, default: true, index: true },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'live', 'archived'], default: 'draft', index: true },
}, {
  timestamps: true,
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function checkProjects() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI environment variable');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Count all projects
    const totalProjects = await Project.countDocuments({});
    console.log('Total projects in database:', totalProjects);

    // Count active projects
    const activeProjects = await Project.countDocuments({ active: true });
    console.log('Active projects:', activeProjects);

    // Count projects by status
    const draftProjects = await Project.countDocuments({ status: 'draft' });
    const liveProjects = await Project.countDocuments({ status: 'live' });
    const archivedProjects = await Project.countDocuments({ status: 'archived' });
    console.log('Draft projects:', draftProjects);
    console.log('Live projects:', liveProjects);
    console.log('Archived projects:', archivedProjects);

    // Get a sample of projects
    const sampleProjects = await Project.find({}).limit(5).select('title active status').lean();
    console.log('\nSample projects:');
    sampleProjects.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title} - active: ${p.active}, status: ${p.status}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkProjects();