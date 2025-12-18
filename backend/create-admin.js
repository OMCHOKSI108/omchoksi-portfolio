/**
 * create-admin.js
 *
 * Script to create the first admin user in MongoDB.
 * Run with: MONGODB_URI="your-connection-string" node create-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, {
  timestamps: true,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Please set MONGODB_URI environment variable');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return;
    }

    // Create admin user
    const email = 'omchoksi99@gmail.com';
    const password = 'sanskari';
    const passwordHash = await bcrypt.hash(password, 12);

    const admin = new Admin({
      email,
      passwordHash,
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();