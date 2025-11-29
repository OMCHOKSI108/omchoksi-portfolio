"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  hint?: string;
  actions?: React.ReactNode;
}

export default function SectionHeader({ title, hint, actions }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Title + hint */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)]">
          {title}
        </h2>
        {hint && (
          <p className="text-sm text-[var(--text-muted)] leading-tight">
            {hint}
          </p>
        )}
      </div>

      {/* Right: Actions (buttons / search / toggle) */}
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
