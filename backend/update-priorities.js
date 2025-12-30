/*
  Priority Update Script
  
  This script assigns priority numbers to all existing projects in the database.
  Projects will be assigned priorities 1, 2, 3, ... based on their creation date (oldest first).
  
  Usage:
    node update-priorities.js
*/

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('❌ Please set MONGODB_URI in .env.local');
        process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Define Project schema with priority field
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

    // Fetch all projects sorted by creation date (oldest first)
    console.log('📊 Fetching all projects...');
    const projects = await Project.find({}).sort({ createdAt: 1 }).exec();

    if (!projects.length) {
        console.log('⚠️  No projects found in database');
        await mongoose.disconnect();
        process.exit(0);
    }

    console.log(`📦 Found ${projects.length} projects`);
    console.log('🔄 Updating priorities...\n');

    // Update each project with sequential priority
    let updated = 0;
    let skipped = 0;

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const newPriority = i + 1; // 1, 2, 3, 4, ...

        // Only update if priority is 0 or 999 (default values)
        if (project.priority === 0 || project.priority === 999 || !project.priority) {
            await Project.findByIdAndUpdate(project._id, { priority: newPriority });
            console.log(`✅ [${newPriority}] ${project.title} (was: ${project.priority || 0})`);
            updated++;
        } else {
            console.log(`⏭️  [${project.priority}] ${project.title} (already set, skipping)`);
            skipped++;
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Priority update complete!`);
    console.log(`   Updated: ${updated} projects`);
    console.log(`   Skipped: ${skipped} projects (already had custom priority)`);
    console.log('='.repeat(60));

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
}

main().catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
});
