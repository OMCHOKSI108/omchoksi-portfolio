/**
 * fix_images.js
 *
 * Connects to MongoDB and replaces every project's images array with a single
 * image pointing to '/docs/image.png', and marks it as the main image
 * (showOnProject: true). Use with care.
 *
 * Usage (PowerShell):
 *   $env:MONGODB_URI='your-uri'; node .\fix_images.js
 */

const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI in environment before running this script');
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
    active: Boolean,
    featured: Boolean,
  }, { timestamps: true });

  const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

  const newImage = { url: '/docs/image.png', caption: 'Default', showOnProject: true };

  try {
    console.log('Updating all projects to use /docs/image.png as main image...');
    const res = await Project.updateMany({}, { $set: { images: [newImage] } });
    console.log(`Matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  } catch (err) {
    console.error('Update failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
