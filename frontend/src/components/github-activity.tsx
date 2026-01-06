"use client";
import React, { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  color: string;
  level: number;
}

interface WeekData {
  contributionDays: ContributionDay[];
}

export default function GithubActivity({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWeeks(data.contributions.weeks || []);
        setTotalContributions(data.contributions.total || 0);
      } catch (e: any) {
        setError(e.message || "Error fetching activity");
      }
    }
    fetchContributions();
  }, [username]);

  if (error) return (
    <div className="text-red-500 text-sm p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
      GitHub activity unavailable
    </div>
  );
  
  if (!weeks.length) return (
    <div className="text-sm opacity-60 animate-pulse">Loading activity…</div>
  );

  // Get month labels for the x-axis
  const getMonthLabels = () => {
    const labels: { month: string; weekIndex: number }[] = [];
    let currentMonth = "";
    
    weeks.forEach((week, weekIndex) => {
      if (week.contributionDays && week.contributionDays.length > 0) {
        const firstDay = week.contributionDays[0];
        const date = new Date(firstDay.date);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        // Only add label if month changed and it's not the first week
        if (monthName !== currentMonth && weekIndex > 0) {
          labels.push({ month: monthName, weekIndex });
          currentMonth = monthName;
        } else if (weekIndex === 0) {
          currentMonth = monthName;
          labels.push({ month: monthName, weekIndex: 0 });
        }
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();
  const dayLabels = ['Mon', 'Wed', 'Fri'];

  return (
    <div className="w-full my-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          GitHub Contributions
        </h3>
        <span className="text-xs text-[var(--muted-foreground)]">
          {totalContributions} contributions in the last year
        </span>
      </div>

      <div className="relative overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2 relative" style={{ paddingLeft: '32px' }}>
            {monthLabels.map((label, idx) => (
              <div
                key={idx}
                className="text-xs text-[var(--muted-foreground)] absolute"
                style={{
                  left: `${32 + label.weekIndex * 12}px`,
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Activity grid */}
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col justify-between pr-2 text-xs text-[var(--muted-foreground)]" style={{ height: '84px' }}>
              {dayLabels.map((day, idx) => (
                <div key={idx} className="h-[10px] leading-[10px]">
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day, dayIndex) => {
                  const date = new Date(day.date);
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  });
                  
                  return (
                    <div
                      key={dayIndex}
                      title={`${formattedDate}: ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`}
                      className="w-[10px] h-[10px] rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 dark:hover:ring-blue-400"
                      style={{
                        backgroundColor: day.count === 0 
                          ? 'var(--muted)' 
                          : day.color,
                        opacity: day.count === 0 ? 0.3 : 1,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-[var(--muted-foreground)]">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-[10px] h-[10px] rounded-sm"
                  style={{
                    backgroundColor: level === 0 ? 'var(--muted)' : `rgb(${34 + level * 30}, ${139 + level * 20}, ${34 + level * 30})`,
                    opacity: level === 0 ? 0.3 : 1,
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
