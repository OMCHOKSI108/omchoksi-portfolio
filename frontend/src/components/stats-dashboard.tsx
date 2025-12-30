"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    GraduationCap,
    Linkedin,
    Twitter,
    Github,
    Mail,
    RefreshCw,
    ExternalLink,
    Trophy,
    Award,
    Calendar,
    Code,
    Star,
    GitCommit,
    GitPullRequest,
    AlertCircle,
    ChevronDown,
    Flame
} from "lucide-react";

// --- Custom Brand Icons (SVGs) ---
const Icons = {
    LeetCode: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ffa116]">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-1.803-1.458-4.821-1.396-6.602.16L3.896 11.23a.35.35 0 0 0 0 .003c-.027-.023-.054-.049-.079-.075l3.854-4.126 5.405-5.788a1.372 1.372 0 0 0 .408-.961 1.372 1.372 0 0 0-1.371-1.371zM10.8 14.8c-.8 0-1.45.65-1.45 1.45v5.3c0 .8.65 1.45 1.45 1.45.8 0 1.45-.65 1.45-1.45v-5.3c0-.8-.65-1.45-1.45-1.45z" />
        </svg>
    ),
    GitHub: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black dark:text-white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
    Codeforces: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <rect x="1.5" y="9" width="4.5" height="12" rx="1.5" fill="#FFC107" />
            <rect x="9.75" y="1.5" width="4.5" height="19.5" rx="1.5" fill="#2196F3" />
            <rect x="18" y="9" width="4.5" height="12" rx="1.5" fill="#F44336" />
        </svg>
    ),
    CodeChef: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#5B4638] dark:text-[#a0806b]">
            <path d="M12.003 1.556c-1.328 0-2.392.348-3.085.698l1.01 2.915c.616-.273 1.348-.52 2.075-.52 2.455 0 3.736 1.503 3.736 4.39v.152c-.65-.776-1.748-1.34-3.116-1.34-2.88 0-5.068 2.446-5.068 5.626 0 3.12 2.158 5.534 5.068 5.534 1.398 0 2.508-.57 3.16-1.365v.13c0 2.92-1.35 4.383-3.79 4.383-.797 0-1.597-.246-2.275-.572l-.845 2.955c.87.397 1.956.666 3.12.666 4.67 0 7.433-2.614 7.433-7.43V7.276c0-4.04-2.5-5.72-7.422-5.72zM12.68 19.86c-1.42 0-2.435-1.12-2.435-2.858 0-1.72 1.015-2.82 2.435-2.82 1.41 0 2.378 1.1 2.378 2.82 0 1.737-.968 2.858-2.378 2.858z" />
        </svg>
    ),
};

// --- Types ---
interface PlatformData {
    total: number;
    rank?: number | string;
    activeDays: number;
    easy?: number;
    medium?: number;
    hard?: number;
    rating?: number;
    submissionCalendar?: Record<string, number> | any; // LeetCode or GitHub Object
    // GitHub Specifics
    stars?: number;
    issues?: number;
    languages?: { name: string, percent: number, color: string }[];
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
    total: number; // Total contributions in selected period
}

export default function StatsDashboard() {
    const [activeTab, setActiveTab] = useState("LeetCode");
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter State
    const [selectedYear, setSelectedYear] = useState<string>("Current");
    const [yearOptions, setYearOptions] = useState<string[]>(["Current"]);

    // Data State
    const [leetcodeData, setLeetcodeData] = useState<PlatformData | null>(null);
    const [githubData, setGithubData] = useState<PlatformData | null>(null);
    const [cfData, setCfData] = useState<PlatformData | null>(null);
    const [codechefData, setCodechefData] = useState<PlatformData | null>(null);

    // Computeds
    const [heatmapValues, setHeatmapValues] = useState<HeatmapCell[][]>([]);
    const [currentStreaks, setCurrentStreaks] = useState<StreakStats>({ current: 0, max: 0, total: 0 });

    // --- Helpers ---
    const generateSimulatedHeatmap = (baseIntensity = 0.5): HeatmapCell[][] => {
        const weeks = 20;
        const days = 7;
        const grid: HeatmapCell[][] = [];

        for (let w = 0; w < weeks; w++) {
            const weekRow: HeatmapCell[] = [];
            for (let d = 0; d < days; d++) {
                const rand = Math.random();
                let intensity = 0;
                if (rand > 0.8) intensity = 1;
                if (rand > 0.9) intensity = 2;
                if (rand > 0.95) intensity = 3;

                weekRow.push({
                    date: `sim-${w}-${d}`,
                    count: intensity,
                    intensity: intensity
                });
            }
            grid.push(weekRow);
        }
        return grid;
    }

    const calculateStreaks = (dateMap: Map<string, number>): StreakStats => {
        // Sort dates
        const sortedDates = Array.from(dateMap.keys()).sort();
        if (sortedDates.length === 0) return { current: 0, max: 0, total: 0 };

        let maxStreak = 0;
        let currentStreak = 0;
        let runningStreak = 0;
        let total = 0;

        // Iterate through all days in range (fill gaps)
        const start = new Date(sortedDates[0]);
        const end = new Date(); // Today

        // Normalize
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        // Map Lookup
        // We iterate backwards from today for Current Streak
        // And forwards for Max Streak

        // 1. Total
        dateMap.forEach(v => total += v);

        // 2. Current Streak
        let dayCursor = new Date(end);
        while (true) {
            const key = dayCursor.toISOString().split('T')[0];
            const count = dateMap.get(key) || 0;
            if (count > 0) {
                currentStreak++;
                dayCursor.setDate(dayCursor.getDate() - 1);
            } else {
                // Check if today is 0, maybe streak broke yesterday?
                // If today is 0, and yesterday > 0, streak is still valid if we consider 'yesterday' the active one?
                // Usually strict current streak means Today or Yesterday must be active.

                // If dayCursor is Today and count is 0, we continue to check yesterday.
                if (key === end.toISOString().split('T')[0]) {
                    dayCursor.setDate(dayCursor.getDate() - 1);
                    continue;
                }
                break;
            }
        }

        // 3. Max Streak
        let tempStreak = 0;
        // Logic: Iterate over sorted active days is not enough, must check continuity.
        // Better: Iterate from First Active Day to Today.

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

    // --- Fetch Functions ---

    const fetchLeetCode = async () => {
        try {
            const res = await fetch("https://leetcode-api-faisalshohag.vercel.app/omchoksi_23aiml010");
            const data = await res.json();
            if (data.status === "success" || data.totalSolved !== undefined) {
                setLeetcodeData({
                    total: data.totalSolved,
                    easy: data.easySolved,
                    medium: data.mediumSolved,
                    hard: data.hardSolved,
                    rank: data.ranking,
                    submissionCalendar: data.submissionCalendar,
                    activeDays: 0
                });
            }
        } catch (e) {
            console.error("LC Fetch Error", e);
        }
    };

    const fetchGitHub = async () => {
        try {
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
                .slice(0, 5); // Top 5

            // 3. Contributions & Heatmap (External API)
            const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/omchoksi108");
            const contribData = await contribRes.json();

            let totalContribs = userData.public_repos;
            if (contribData?.total) {
                // Get all totals as fallback
                const years = Object.keys(contribData.total).map(y => parseInt(y)).sort((a, b) => b - a); // Desc
                // Set Year Options
                setYearOptions(["Current", ...years.map(y => y.toString()), "All"]);
                totalContribs = contribData.total[years[0].toString()]; // Last Year/Current
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

        } catch (e) {
            console.error("GitHub Fetch Error", e);
        }
    };

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

    const fetchCodeforces = async () => {
        try {
            const res = await fetch("https://codeforces.com/api/user.info?handles=omchoksi");
            const data = await res.json();
            if (data.status === "OK") {
                const user = data.result[0];
                setCfData({
                    total: user.contribution,
                    rating: user.rating,
                    rank: user.rank || "unrated",
                    activeDays: user.friendOfCount
                });
            }
        } catch (e) {
            console.error("CF Fetch Error", e);
        }
    };

    const fetchCodeChef = async () => {
        try {
            const res = await fetch("https://codechef-api.vercel.app/handle/om_23aiml010");
            const data = await res.json();
            if (data.success) {
                setCodechefData({
                    total: data.currentRating,
                    rank: data.globalRank,
                    rating: data.currentRating,
                    activeDays: 0,
                    easy: 0, medium: 0, hard: 0
                });
            }
        } catch (e) {
            console.warn("CodeChef API unavailable or network error", e);
        }
    }

    // --- Main Refresh Logic ---
    const refreshAll = async () => {
        setLoading(true);
        await Promise.allSettled([
            fetchLeetCode(), fetchGitHub(), fetchCodeforces(), fetchCodeChef()
        ]);
        setLastUpdated(new Date());
        setLoading(false);
    };

    useEffect(() => {
        refreshAll();
    }, []);

    // Compute Heatmap when Tab or Filter Changes
    useEffect(() => {
        let grid: HeatmapCell[][] = [];
        const dateMap = new Map<string, number>();

        // 1. Build DateMap based on Source
        if (activeTab === "LeetCode" && leetcodeData?.submissionCalendar) {
            const calendar = leetcodeData.submissionCalendar;
            Object.keys(calendar).forEach(ts => {
                const submissionDate = new Date(parseInt(ts) * 1000);
                const year = submissionDate.getFullYear().toString();
                // Filter by Year
                if (selectedYear === "Current" || selectedYear === "All" || year === selectedYear) {
                    const key = submissionDate.toISOString().split('T')[0];
                    dateMap.set(key, (dateMap.get(key) || 0) + calendar[ts]);
                }
            });
            // Update Options if not set roughly (LC data is limited usually to recent)
            if (yearOptions.length === 1) setYearOptions(["Current", "All"]);
        }
        else if (activeTab === "GitHub" && githubData?.submissionCalendar) {
            const contribs: GithubContributionDay[] = githubData.submissionCalendar.contributions || [];
            contribs.forEach(c => {
                const d = new Date(c.date);
                const year = d.getFullYear().toString();
                const currentYear = new Date().getFullYear().toString();

                let include = false;
                if (selectedYear === "All") include = true;
                else if (selectedYear === "Current") {
                    // GitHub 'Current' usually means last 365 days or this calendar year data?
                    // The API returns 'lastYear' and older years.
                    // Let's assume Current = This Year (2024 or 2025)
                    if (year === currentYear) include = true;
                }
                else if (year === selectedYear) include = true;

                if (include) {
                    dateMap.set(c.date, c.count);
                }
            });
        }

        // 2. Calculate Stats from Map
        const stats = calculateStreaks(dateMap);
        setCurrentStreaks(stats);

        // 3. Build Grid (Last N weeks based on selection? No, standard 20-52 weeks view usually)
        // If year is selected, we might want to show that whole year?
        // For simplicity to match UI, we keep the 'Last 5-6 Months' or 'Selected Year' view.
        // Let's try to fit 20 weeks window for now, anchored to End Date of selection.

        // Find End Date
        let endDate = new Date(); // Today
        if (selectedYear !== "Current" && selectedYear !== "All") {
            // End of that year
            endDate = new Date(`${selectedYear}-12-31`);
        }
        endDate.setHours(0, 0, 0, 0);

        // Generate 20 weeks back from endDate
        for (let w = 19; w >= 0; w--) {
            const weekRow: HeatmapCell[] = [];
            for (let d = 0; d < 7; d++) {
                const weeksAgo = 19 - w;
                // Standard visual: Left=Old, Right=New
                // d=0 (Sun) .. d=6 (Sat)

                // We need to align endDate to Saturday? Or just standard calendar days.
                // Let's rely on standard 'daysAgo'
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

        // Fallback for empty/simulation
        if (grid.length === 0 || (activeTab !== "LeetCode" && activeTab !== "GitHub")) {
            setHeatmapValues(generateSimulatedHeatmap());
            setCurrentStreaks({ current: 0, max: 0, total: 0 });
        } else {
            setHeatmapValues(grid);
        }

    }, [activeTab, leetcodeData, githubData, selectedYear]);


    // --- Render Helpers ---
    const getActiveData = () => {
        switch (activeTab) {
            case "LeetCode": return leetcodeData;
            case "GitHub": return githubData;
            case "Codeforces": return cfData;
            case "CodeChef": return codechefData;
            default: return null;
        }
    };
    const data = getActiveData();

    // Color Mapping
    const getCellColor = (intensity: number) => {
        if (activeTab === "LeetCode") {
            const colors = ["bg-[var(--muted)]", "bg-yellow-200 dark:bg-yellow-900", "bg-yellow-400 dark:bg-yellow-600", "bg-yellow-500 dark:bg-yellow-500"];
            return colors[intensity] || colors[0];
        }
        if (activeTab === "GitHub") {
            const colors = ["bg-[var(--muted)]", "bg-[#9be9a8]", "bg-[#40c463]", "bg-[#30a14e]", "bg-[#216e39]"];
            return colors[intensity] || colors[0];
        }
        if (activeTab === "Codeforces") {
            const colors = ["bg-[var(--muted)]", "bg-blue-200 dark:bg-blue-900", "bg-blue-400 dark:bg-blue-600", "bg-blue-500 dark:bg-blue-500"];
            return colors[intensity] || colors[0];
        }
        if (activeTab === "CodeChef") {
            const colors = ["bg-[var(--muted)]", "bg-orange-200 dark:bg-orange-900", "bg-orange-400 dark:bg-orange-600", "bg-orange-500 dark:bg-orange-500"];
            return colors[intensity] || colors[0];
        }
        return "bg-[var(--muted)]";
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">

                {/* ==================== SIDEBAR ==================== */}
                <div className="w-full lg:w-[280px] flex-shrink-0 space-y-6">
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center sticky top-24">
                        {/* Avatar */}
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full bg-[var(--muted)] flex items-center justify-center border-4 border-[var(--card)] shadow-xl p-1">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://github.com/omchoksi108.png"
                                        alt="OM"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                    <span className="text-4xl font-bold text-white tracking-widest absolute">OM</span>
                                </div>
                            </div>
                            <div className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-4 border-[var(--card)] rounded-full animate-pulse" title="Online" />
                        </div>

                        {/* Name */}
                        <h2 className="text-xl font-bold text-[var(--foreground)] uppercase tracking-wide">OM CHOKSI</h2>
                        <p className="text-sm text-[var(--muted-foreground)] mb-6">Full Stack Developer</p>

                        <button
                            onClick={() => window.open('https://linkedin.com/in/omchoksi', '_blank')}
                            className="w-full py-2.5 px-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-bold rounded-lg text-sm transition-all shadow-lg mb-6 flex items-center justify-center gap-2"
                        >
                            <ExternalLink size={16} /> View Full Profile
                        </button>

                        <div className="w-full h-px bg-[var(--border)] mb-6" />

                        <div className="w-full space-y-4 text-left text-sm text-[var(--muted-foreground)]">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-4 h-4" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[var(--foreground)]">CSPIT, CHAROTAR University</span>
                                    <span className="text-xs">B.Tech in AI & ML • 6th Semester</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award className="w-4 h-4" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-[var(--foreground)]">CGPA: 8.74/10</span>
                                    <span className="text-xs">Current Academic Performance</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4" />
                                <span>Gujarat, India</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-[var(--border)] my-6" />

                        <div className="flex gap-4 text-[var(--muted-foreground)]">
                            <Mail className="w-5 h-5 hover:text-[var(--foreground)] cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 hover:text-[var(--foreground)] cursor-pointer transition-colors" onClick={() => window.open('https://www.linkedin.com/in/omchoksi/', '_blank')} />
                            <Github className="w-5 h-5 hover:text-[var(--foreground)] cursor-pointer transition-colors" onClick={() => window.open('https://github.com/omchoksi108', '_blank')} />
                            <Twitter className="w-5 h-5 hover:text-[var(--foreground)] cursor-pointer transition-colors" onClick={() => window.open('https://x.com/ChoksiOm', '_blank')} />
                        </div>
                    </div>
                </div>


                {/* ==================== MAIN DASHBOARD ==================== */}
                <div className="flex-1 space-y-6">

                    {/* Platform Tabs */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        {["LeetCode", "GitHub", "Codeforces", "CodeChef"].map((platform) => (
                            <button
                                key={platform}
                                onClick={() => setActiveTab(platform)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${activeTab === platform
                                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-lg transform scale-105"
                                    : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                                    }`}
                            >
                                {/* @ts-ignore */}
                                {Icons[platform]()}
                                {platform}
                            </button>
                        ))}

                        <button
                            onClick={refreshAll}
                            className="ml-auto p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors"
                            title="Refresh Data"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Top Row Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                                {/* Primary Stat */}
                                <div className="md:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                                    <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                                        {activeTab === "Codeforces" || activeTab === "CodeChef" ? "Rating" :
                                            activeTab === "GitHub" ? "Total Contributions" : "Total Solved"}
                                    </span>
                                    <span className="text-5xl lg:text-6xl font-black text-[var(--foreground)]">
                                        {data?.total !== undefined ? data.total : (loading ? "..." : "0")}
                                    </span>
                                </div>

                                {/* Secondary Stat */}
                                <div className="md:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                                    <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                                        {activeTab === "Codeforces" ? "Rank" :
                                            activeTab === "GitHub" ? "Total Active Days" : "Global Rank"}
                                    </span>
                                    <span className="text-xl lg:text-3xl font-black text-[var(--foreground)] capitalize">
                                        {activeTab === "GitHub" ?
                                            (data?.activeDays || (loading ? "..." : "0")) :
                                            (data?.rank ? (typeof data.rank === 'number' ? `#${data.rank}` : data.rank) : (loading ? "..." : "Unranked"))
                                        }
                                    </span>
                                </div>

                                {/* Heatmap Widget */}
                                <div className="md:col-span-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm overflow-hidden relative flex flex-col justify-center">
                                    <div className="flex justify-between items-center mb-4">

                                        {/* Dynamic Stats for Heatmap */}
                                        <div className="flex gap-4 text-xs">
                                            <div>
                                                <span className="text-[var(--muted-foreground)] font-bold">Contributions </span>
                                                <span className="font-black text-[var(--foreground)]">{currentStreaks.total}</span>
                                            </div>
                                            <div>
                                                <span className="text-[var(--muted-foreground)] font-bold">Max Streak </span>
                                                <span className="font-black text-[var(--foreground)]">{currentStreaks.max}</span>
                                            </div>
                                            <div>
                                                <span className="text-[var(--muted-foreground)] font-bold">Current Streak </span>
                                                <span className="font-black text-[var(--foreground)]">{currentStreaks.current}</span>
                                            </div>
                                        </div>

                                        {/* Year Filter */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                className="flex items-center gap-1 text-xs font-medium bg-[var(--muted)] px-3 py-1.5 rounded-lg text-[var(--foreground)] hover:bg-[var(--muted)]/80 transition-colors"
                                            >
                                                <Calendar className="w-3 h-3" />
                                                {selectedYear}
                                                <ChevronDown className="w-3 h-3" />
                                            </button>

                                            {/* Dropdown */}
                                            {isFilterOpen && (
                                                <div className="absolute right-0 top-full mt-2 w-32 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                    {yearOptions.map(year => (
                                                        <div
                                                            key={year}
                                                            onClick={() => {
                                                                setSelectedYear(year);
                                                                setIsFilterOpen(false);
                                                            }}
                                                            className={`px-4 py-2 text-xs font-bold cursor-pointer hover:bg-[var(--muted)] ${selectedYear === year ? 'bg-[var(--muted)] text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}
                                                        >
                                                            {year}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Render Heatmap from State */}
                                    <div className="flex gap-[3px] opacity-90 overflow-hidden w-full justify-center lg:justify-start flex-wrap lg:flex-nowrap h-[100px] lg:h-auto items-end">
                                        {heatmapValues.map((col, w) => (
                                            <div key={w} className="flex flex-col gap-[3px]">
                                                {col.map((cell, d) => (
                                                    <div
                                                        key={`${w}-${d}`}
                                                        title={`${cell.date}: ${cell.count} contributions`}
                                                        className={`w-3 h-3 rounded-[1px] ${getCellColor(cell.intensity)}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                        {heatmapValues.length === 0 && (
                                            <div className="w-full text-center text-xs text-[var(--muted-foreground)]">Loading Data...</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* LeetCode / CodeChef Charts */}
                            {(activeTab === "LeetCode" || activeTab === "CodeChef") && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Distribution Donut */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
                                        <h3 className="text-lg font-bold text-[var(--muted-foreground)] mb-8 text-center">Difficulty Distribution</h3>
                                        <div className="flex items-center justify-between px-4">
                                            <div className="relative w-40 h-40 flex items-center justify-center">
                                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--muted)" strokeWidth="3" />
                                                    {data?.total ? (
                                                        <>
                                                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${((data.easy || 0) / (data.total || 1)) * 100}, 100`} />
                                                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray={`${((data.medium || 0) / (data.total || 1)) * 100}, 100`} strokeDashoffset={-(((data.easy || 0) / (data.total || 1)) * 100)} />
                                                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray={`${((data.hard || 0) / (data.total || 1)) * 100}, 100`} strokeDashoffset={-(((data.easy || 0) + (data.medium || 0)) / (data.total || 1)) * 100} />
                                                        </>
                                                    ) : null}
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-black text-[var(--foreground)]">
                                                        {data?.total || 0}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-4 flex-1 pl-8">
                                                <div className="flex justify-between items-center p-2 rounded-lg bg-[var(--muted)]/50">
                                                    <span className="text-sm font-medium text-green-500">Easy</span>
                                                    <span className="font-bold">{data?.easy || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-2 rounded-lg bg-[var(--muted)]/50">
                                                    <span className="text-sm font-medium text-yellow-500">Medium</span>
                                                    <span className="font-bold">{data?.medium || 0}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-2 rounded-lg bg-[var(--muted)]/50">
                                                    <span className="text-sm font-medium text-red-500">Hard</span>
                                                    <span className="font-bold">{data?.hard || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Awards/Badges */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-[var(--muted-foreground)]">Profile Badges</h3>
                                            <Trophy className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <div className="flex flex-wrap gap-4 items-center justify-center py-4">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <div key={i} className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center border-2 border-[var(--border)] hover:scale-110 transition-transform cursor-pointer" title="Badge">
                                                    <Award className="w-8 h-8 text-[var(--primary)]" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <span className="text-xs font-bold text-blue-500 cursor-pointer hover:underline">View all achievements</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* GitHub Specific Layout */}
                            {activeTab === "GitHub" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Languages */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
                                        <h3 className="text-lg font-bold text-[var(--muted-foreground)] mb-6">Languages</h3>
                                        {data?.languages && data.languages.length > 0 ? (
                                            <>
                                                <div className="flex h-4 w-full rounded-full overflow-hidden mb-6">
                                                    {data.languages.map((lang, i) => (
                                                        <div key={lang.name} style={{ width: `${lang.percent}%`, backgroundColor: lang.color }} className="h-full" />
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {data.languages.map(lang => (
                                                        <div key={lang.name} className="flex items-center gap-2">
                                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                                                            <span className="text-sm font-medium">{lang.name}</span>
                                                            <span className="text-sm text-[var(--muted-foreground)]">{lang.percent}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-sm text-[var(--muted-foreground)]">Loading languages...</div>
                                        )}
                                    </div>

                                    {/* Stats List */}
                                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-sm flex flex-col justify-center">
                                        <h3 className="text-lg font-bold text-[var(--muted-foreground)] mb-6">Stats</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Star className="w-5 h-5 text-yellow-500" />
                                                    <span className="font-bold">Stars</span>
                                                </div>
                                                <span className="font-mono text-xl">{data?.stars || 0}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <GitCommit className="w-5 h-5 text-orange-500" />
                                                    <span className="font-bold">Total Contributions</span>
                                                </div>
                                                <span className="font-mono text-xl">{data?.total || 0}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                                    <span className="font-bold">Issues (Open)</span>
                                                </div>
                                                <span className="font-mono text-xl">{data?.issues || 0}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Flame className="w-5 h-5 text-red-500" />
                                                    <span className="font-bold">Current Streak</span>
                                                </div>
                                                <span className="font-mono text-xl">{currentStreaks.current}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CodeChef/LeetCode Additional Charts could go here if more data exists */}
                        </motion.div>
                    </AnimatePresence>

                </div>

            </div>
        </div>
    );
}
