#!/usr/bin/env node
// Quick helper to inspect the blogs collection
require('dotenv').config();
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

  const hasBlogs = collections.some(c => c.name === 'blogs');
  if (!hasBlogs) {
    console.log('No `blogs` collection found.');
  } else {
    const blogs = await db.collection('blogs').find().limit(5).toArray();
    console.log(`Found ${blogs.length} sample blog(s):`);
    blogs.forEach((b, i) => {
      console.log(`--- Blog ${i+1} ---`);
      console.log('title:', b.title);
      console.log('slug :', b.slug);
    });

    const total = await db.collection('blogs').countDocuments();
    console.log('Total blogs count:', total);
  }
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});