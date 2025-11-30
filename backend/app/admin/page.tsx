import React from 'react';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';

export default async function AdminDashboard() {
  // Query the database directly on the server to avoid internal HTTP calls
  await dbConnect();
  const totalProjects = (await Project.countDocuments()) || 0;
  const featuredProjects = (await Project.countDocuments({ featured: true })) || 0;
  const totalBlogs = (await Blog.countDocuments()) || 0;
  const featuredBlogs = (await Blog.countDocuments({ featured: true })) || 0;

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Total Projects</div>
          <div className="text-2xl font-bold">{totalProjects}</div>
        </div>
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Featured Projects</div>
          <div className="text-2xl font-bold">{featuredProjects}</div>
        </div>
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Total Blogs</div>
          <div className="text-2xl font-bold">{totalBlogs}</div>
        </div>
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Featured Blogs</div>
          <div className="text-2xl font-bold">{featuredBlogs}</div>
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Recent Activity</h2>
        <div className="product-card p-4">
          <ul className="text-sm text-gray-600">
            <li>No recent activity.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
