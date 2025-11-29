import React from 'react';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export default async function AdminDashboard() {
  // Query the database directly on the server to avoid internal HTTP calls
  await dbConnect();
  const total = (await Project.countDocuments()) || 0;
  const featured = (await Project.countDocuments({ featured: true })) || 0;

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Total Projects</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Featured</div>
          <div className="text-2xl font-bold">{featured}</div>
        </div>
        <div className="product-card p-4">
          <div className="text-sm text-gray-500">Views (N/A)</div>
          <div className="text-2xl font-bold">—</div>
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
