"use client";

import React from "react";
import TopNav from "../components/admin/TopNav";
import SubNav from "../components/admin/SubNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)", color: "var(--text-primary)" }}
    >
      {/* Top navigation */}
      <TopNav />

      {/* Sub navigation */}
      <SubNav />

      {/* Main content container */}
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="bg-white rounded-lg shadow-sm border"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="p-6">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
