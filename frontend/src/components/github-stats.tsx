"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitCommit, AlertCircle, GitPullRequest, Trophy, Calendar, ChevronDown } from "lucide-react";

// --- Types ---
interface PlatformData {
    total: number;
    rank?: number | string;
    activeDays: number;
    stars?: number;
    issues?: number;
    languages?: { name: string, percent: number, color: string }[];
    submissionCalendar?: any;
}

interface HeatmapCell {
    date: string;
    count: number;
    intensity: number; // 0-4
}

interface GithubContributionDay {
    date: string;
    count: number;
    level: number;
}

interface StreakStats {
    current: number;
    max: number;
    total: number;
}

export default function GithubStats() {
    const [loading, setLoading] = useState(true);
    const [githubData, setGithubData] = useState<PlatformData | null>(null);
    const [heatmapValues, setHeatmapValues] = useState<HeatmapCell[][]>([]);
    const [currentStreaks, setCurrentStreaks] = useState<StreakStats>({ current: 0, max: 0, total: 0 });
    const [selectedYear, setSelectedYear] = useState<string>("Current");
    const [yearOptions, setYearOptions] = useState<string[]>(["Current"]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // --- Helpers ---
    const getLangColor = (lang: string) => {
        const colors: Record<string, string> = {
            "JavaScript": "#f1e05a",
            "TypeScript": "#3178c6",
            "Python": "#3572A5",
            "HTML": "#e34c26",
            "CSS": "#563d7c",
            "Java": "#b07219",
            "C++": "#f34b7d",
            "C": "#555555"
        };
        return colors[lang] || "#8b949e";
    };

    const calculateStreaks = (dateMap: Map<string, number>): StreakStats => {
        const sortedDates = Array.from(dateMap.keys()).sort();
        if (sortedDates.length === 0) return { current: 0, max: 0, total: 0 };

        let maxStreak = 0;
        let currentStreak = 0;
        let total = 0;

        const start = new Date(sortedDates[0]);
        const end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        dateMap.forEach(v => total += v);

        // Current Streak
        let dayCursor = new Date(end);
        while (true) {
            const key = dayCursor.toISOString().split('T')[0];
            const count = dateMap.get(key) || 0;
            if (count > 0) {
                currentStreak++;
                dayCursor.setDate(dayCursor.getDate() - 1);
            } else {
                if (key === end.toISOString().split('T')[0]) {
                    dayCursor.setDate(dayCursor.getDate() - 1);
                    continue;
                }
                break;
            }
        }

        // Max Streak
        let tempStreak = 0;
        const iterDay = new Date(start);
        while (iterDay <= end) {
            const key = iterDay.toISOString().split('T')[0];
            const count = dateMap.get(key) || 0;
            if (count > 0) {
                tempStreak++;
                maxStreak = Math.max(maxStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
            iterDay.setDate(iterDay.getDate() + 1);
        }

        return { current: currentStreak, max: maxStreak, total };
    };

    const fetchGitHub = async () => {
        try {
            setLoading(true);
            // 1. Basic User Info
            const userRes = await fetch("https://api.github.com/users/omchoksi108");
            const userData = await userRes.json();

            // 2. Repos for Star/Language aggregation
            const reposRes = await fetch("https://api.github.com/users/omchoksi108/repos?per_page=100");
            const reposData = await reposRes.json();

            let stars = 0;
            let issues = 0;
            const langMap: Record<string, number> = {};

            if (Array.isArray(reposData)) {
                reposData.forEach((repo: any) => {
                    stars += repo.stargazers_count;
                    issues += repo.open_issues_count;
                    if (repo.language) {
                        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                    }
                });
            }

            // Process Languages
            const totalReposWithLang = Object.values(langMap).reduce((a, b) => a + b, 0);
            const languages = Object.keys(langMap)
                .map(lang => ({
                    name: lang,
                    percent: Math.round((langMap[lang] / totalReposWithLang) * 100),
                    color: getLangColor(lang)
                }))
                .sort((a, b) => b.percent - a.percent)
                .slice(0, 5);

            // 3. Contributions & Heatmap (External API)
            const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/omchoksi108");
            const contribData = await contribRes.json();

            let totalContribs = userData.public_repos;
            if (contribData?.total) {
                const years = Object.keys(contribData.total).map(y => parseInt(y)).sort((a, b) => b - a);
                setYearOptions(["Current", ...years.map(y => y.toString()), "All"]);
                totalContribs = contribData.total[years[0].toString()];
            }

            setGithubData({
                total: totalContribs,
                rank: userData.followers,
                activeDays: 0,
                stars,
                issues,
                languages,
                submissionCalendar: contribData
            });
            setLoading(false);

        } catch (e) {
            console.error("GitHub Fetch Error", e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHub();
    }, []);

    // Compute Heatmap
    useEffect(() => {
        if (!githubData?.submissionCalendar) return;

        const dateMap = new Map<string, number>();
        const contribs: GithubContributionDay[] = githubData.submissionCalendar.contributions || [];

        contribs.forEach(c => {
            const d = new Date(c.date);
            const year = d.getFullYear().toString();
            const currentYear = new Date().getFullYear().toString();

            let include = false;
            if (selectedYear === "All") include = true;
            else if (selectedYear === "Current") {
                if (year === currentYear) include = true;
            }
            else if (year === selectedYear) include = true;

            if (include) {
                dateMap.set(c.date, c.count);
            }
        });

        const stats = calculateStreaks(dateMap);
        setCurrentStreaks(stats);

        // Build Grid (Last 20 weeks logic or full year?)
        // Let's do a responsive grid - maybe 20-30 weeks
        let endDate = new Date();
        if (selectedYear !== "Current" && selectedYear !== "All") {
            endDate = new Date(`${selectedYear}-12-31`);
        }
        endDate.setHours(0, 0, 0, 0);

        const grid: HeatmapCell[][] = [];
        // Show last 24 weeks for compact view
        for (let w = 23; w >= 0; w--) {
            const weekRow: HeatmapCell[] = [];
            for (let d = 0; d < 7; d++) {
                const weeksAgo = 23 - w;
                const daysAgo = (weeksAgo * 7) + (6 - d);
                const date = new Date(endDate);
                date.setDate(date.getDate() - daysAgo);
                const dateStr = date.toISOString().split('T')[0];

                const count = dateMap.get(dateStr) || 0;
                let intensity = 0;
                if (count > 0) intensity = 1;
                if (count > 2) intensity = 2;
                if (count > 4) intensity = 3;
                if (count > 8) intensity = 4;

                weekRow.push({ date: dateStr, count, intensity });
            }
            grid.push(weekRow);
        }
        setHeatmapValues(grid);

    }, [githubData, selectedYear]);

    const getCellColor = (intensity: number) => {
        const colors = ["bg-[var(--muted)]", "bg-[#9be9a8]", "bg-[#40c463]", "bg-[#30a14e]", "bg-[#216e39]"];
        return colors[intensity] || colors[0];
    };

    return (
        <section className="py-24 px-6 bg-[var(--background)]">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-[var(--card)] rounded-xl border border-[var(--border)]">
                            <Github className="w-8 h-8 text-[var(--foreground)]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
                            GitHub Activity
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Stats Cards */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Primary Stat */}
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:border-[var(--accent)] transition-colors">
                                <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                                    Total Contributions
                                </span>
                                <span className="text-5xl font-black text-[var(--foreground)]">
                                    {githubData?.total || 0}
                                </span>
                            </div>

                            {/* Secondary Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Star className="w-5 h-5 text-yellow-500 mb-2" />
                                    <span className="text-2xl font-bold text-[var(--foreground)]">
                                        {githubData?.stars || 0}
                                    </span>
                                    <span className="text-xs text-[var(--muted-foreground)]">Stars</span>
                                </div>
                                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                                    <Trophy className="w-5 h-5 text-green-500 mb-2" />
                                    <span className="text-2xl font-bold text-[var(--foreground)]">
                                        {githubData?.rank || 0}
                                    </span>
                                    <span className="text-xs text-[var(--muted-foreground)]">Followers</span>
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-[var(--muted-foreground)] mb-4 uppercase tracking-wider">Top Languages</h3>
                                <div className="space-y-3">
                                    {githubData?.languages?.slice(0, 3).map(lang => (
                                        <div key={lang.name} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                                            <span className="text-sm font-medium flex-1">{lang.name}</span>
                                            <span className="text-xs text-[var(--muted-foreground)] font-mono">{lang.percent}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Heatmap Area */}
                        <div className="lg:col-span-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <span className="text-[var(--muted-foreground)] block text-xs font-bold uppercase mb-1">Current Streak</span>
                                        <span className="font-black text-2xl text-[var(--foreground)]">{currentStreaks.current}</span>
                                    </div>
                                    <div>
                                        <span className="text-[var(--muted-foreground)] block text-xs font-bold uppercase mb-1">Max Streak</span>
                                        <span className="font-black text-2xl text-[var(--foreground)]">{currentStreaks.max}</span>
                                    </div>
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="flex items-center gap-2 text-sm font-bold bg-[var(--muted)] px-4 py-2 rounded-lg text-[var(--foreground)] hover:opacity-80 transition-opacity"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        {selectedYear}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown */}
                                    {isFilterOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-32 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-20 overflow-hidden">
                                            {yearOptions.map(year => (
                                                <div
                                                    key={year}
                                                    onClick={() => {
                                                        setSelectedYear(year);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`px-4 py-2 text-sm font-bold cursor-pointer hover:bg-[var(--muted)] ${selectedYear === year ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Heatmap Grid */}
                            <div className="flex-1 flex items-center justify-center overflow-x-auto pb-4">
                                <div className="flex gap-[4px]">
                                    {heatmapValues.map((col, w) => (
                                        <div key={w} className="flex flex-col gap-[4px]">
                                            {col.map((cell, d) => (
                                                <div
                                                    key={`${w}-${d}`}
                                                    title={`${cell.date}: ${cell.count} contributions`}
                                                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[2px] transition-colors ${getCellColor(cell.intensity)}`}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 text-xs text-[var(--muted-foreground)] mt-4">
                                <span>Less</span>
                                <div className="flex gap-[2px]">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <div key={i} className={`w-3 h-3 rounded-[2px] ${getCellColor(i)}`} />
                                    ))}
                                </div>
                                <span>More</span>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
