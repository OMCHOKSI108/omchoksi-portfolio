"use client";
import React, { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  color: string;
}

export default function GithubActivity({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Flatten all weeks into a single array of days
        const days = data.contributions.weeks.flatMap((week: any) => week.contributionDays);
        setContributions(days);
      } catch (e: any) {
        setError(e.message || "Error fetching activity");
      }
    }
    fetchContributions();
  }, [username]);

  if (error) return <div className="text-red-500 text-sm">GitHub activity unavailable</div>;
  if (!contributions.length) return <div className="text-xs opacity-60">Loading activity…</div>;

  // Render as a simple grid
  return (
    <div className="flex flex-col items-center my-8">
      <div className="grid grid-cols-53 gap-[2px]">
        {contributions.map((day, i) => (
          <div
            key={i}
            title={`${day.date}: ${day.count} contributions`}
            className="w-2 h-2 rounded-sm"
            style={{ background: day.color, opacity: day.count === 0 ? 0.15 : 1 }}
          />
        ))}
      </div>
      <div className="text-xs mt-2 opacity-60">GitHub Activity (OMCHOKSI108)</div>
    </div>
  );
}
