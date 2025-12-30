#!/usr/bin/env node
// Quick helper to inspect the projects collection and the database name
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please set MONGODB_URI in environment before running this script.');
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  console.log('Connected to database:', db.databaseName);
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name).join(', '));

  const hasProjects = collections.some(c => c.name === 'projects' || c.name === 'project' || c.name === 'projects');
  if (!hasProjects) {
    console.log('No `projects` collection found.');
  }

  const projects = await db.collection('projects').find().limit(5).toArray();
  console.log(`Found ${projects.length} sample project(s):`);
  projects.forEach((p, i) => {
    console.log(`--- Project ${i+1} ---`);
    console.log('title:', p.title);
    console.log('slug :', p.slug);
    console.log('tags :', p.tags);
    console.log('live :', p.liveUrl);
    console.log('image:', p.imageUrl);
  });

  const total = await db.collection('projects').countDocuments();
  console.log('Total projects count:', total);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
