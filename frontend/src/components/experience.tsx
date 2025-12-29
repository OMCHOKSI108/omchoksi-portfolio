"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    Briefcase,
    MapPin,
    Star,
    GitFork,
    Users,
    BookOpen,
    Music,
} from "lucide-react";

// --- Experience Data (Design Template) ---
const EXPERIENCE = [
    {
        company: "Samatrix Consulting Pvt. Ltd.",
        location: "Remote",
        type: "",
        role: "AI Product Development Intern",
        date: "JUN 2025",
        description: [
            "Engineered supervised and unsupervised ML models for production-grade decision systems (not research-only prototypes)",
            "Designed feature pipelines to minimize leakage and maximize signal strength across noisy datasets",
            "Implemented clustering for customer behavioral segmentation, improving audience targeting and insight generation",
            "Constructed analytics dashboards visualizing model KPIs, explainability metrics, and business lift estimates",
            "Developed cross-department mindset: AI should be understandable and usable by non-technical decision makers"
        ],
        tags: ["ML Engineering", "Feature Pipelines", "Model Explainability", "KPI Dashboards", "Product Strategy"]
    },
    {
        company: "Oasis Infobyte",
        location: "Remote",
        type: "",
        role: "Data Analytics Intern",
        date: "MAY 2025",
        description: [
            "Performed full-cycle EDA on large datasets with statistical reasoning and storytelling-based insight delivery",
            "Identified data issues, engineered analytical features, normalized structure, and uncovered actionable patterns",
            "Evaluated business hypotheses using descriptive statistics and experimentation",
            "Designed dynamic analytical dashboards to help stakeholders quickly understand trends and actions"
        ],
        tags: ["EDA", "Statistical Analysis", "Data Storytelling", "Dashboarding", "Insight Communication"]
    }
];

export default function Experience() {
    const containerRef = useRef(null);

    // State for Real GitHub Stats
    const [stats, setStats] = useState({
        followers: "...",
        stars: "...",
        repos: "...",
        forks: "..."
    });

    // Fetch Real GitHub Data
    useEffect(() => {
        async function fetchGitHubStats() {
            try {
                // 1. Fetch User Data
                const userRes = await fetch("https://api.github.com/users/omchoksi108");
                const userData = await userRes.json();

                // 2. Fetch Repos to calculate Stars & Forks
                // Note: Fetching 100 repos to get a good sum. If you have more, pagination is needed.
                const reposRes = await fetch("https://api.github.com/users/omchoksi108/repos?per_page=100");
                const reposData = await reposRes.json();

                // Calculate totals
                const totalStars = Array.isArray(reposData)
                    ? reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
                    : 0;

                const totalForks = Array.isArray(reposData)
                    ? reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0)
                    : 0;

                setStats({
                    followers: userData.followers || 0,
                    stars: totalStars || 0,
                    repos: userData.public_repos || 0,
                    forks: totalForks || 0
                });

            } catch (error) {
                console.error("Failed to fetch GitHub stats", error);
                // Fallback or keep loading state
            }
        }

        fetchGitHubStats();
    }, []);

    // Track scroll progress relative to the timeline container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 80%"]
    });

    // Map scroll progress to height (0% to 100%)
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="relative w-full py-20 overflow-hidden font-sans text-[var(--foreground)] bg-[var(--background)]">

            {/* Inject Fonts */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

            <div id="experience" className="max-w-6xl mx-auto px-6 space-y-32">

                {/* ==================== EXPERIENCE SECTION ==================== */}
                <div>
                    {/* Header */}
                    <div className="text-center mb-20 space-y-4">
                        <span className="text-sm font-bold tracking-[0.2em] text-[var(--foreground)] uppercase">The Experience</span>
                        <h2 className="text-5xl md:text-7xl font-serif-display leading-tight text-[var(--foreground)]">
                            Experience That <br />
                            Brings <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Ideas to Life</span>
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div ref={containerRef} className="relative">

                        {/* --- Static Base Line (Subtle) --- */}
                        <div className="absolute left-[18px] md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-px bg-[var(--border)] hidden md:block rounded-full" />

                        {/* --- Animated Scroll Line (Gradient) --- */}
                        <motion.div
                            style={{ height }}
                            className="absolute left-[18px] md:left-1/2 md:-ml-0.5 top-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] hidden md:block rounded-full origin-top"
                        >
                            {/* moving profile marker */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[var(--card)] border-2 border-[var(--border)] shadow z-20 overflow-hidden">
                                <img
                                    src="https://github.com/omchoksi108.png"
                                    alt="Moving Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        <div className="space-y-16 py-10">
                            {EXPERIENCE.map((exp, index) => (
                                <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                                    {/* Left Side (Meta Data) */}
                                    <div className={`md:text-right space-y-2 ${index % 2 !== 0 ? "md:order-2 md:text-left" : ""}`}>
                                        <span className="text-sm font-bold text-[var(--foreground)] tracking-wider uppercase block mb-1">
                                            {exp.date}
                                        </span>
                                        <h3 className="text-3xl font-serif-display font-medium text-[var(--foreground)]">
                                            {exp.company}
                                        </h3>
                                        <div className={`flex flex-col text-sm text-[var(--text-secondary)] gap-1 ${index % 2 !== 0 ? "md:items-start" : "md:items-end"}`}>
                                            {exp.location && (
                                                <span className="flex items-center gap-1">
                                                    {index % 2 !== 0 && <MapPin className="w-3 h-3" />}
                                                    {exp.location}
                                                    {index % 2 === 0 && <MapPin className="w-3 h-3" />}
                                                </span>
                                            )}
                                            {exp.type && (
                                                <span className="flex items-center gap-1">
                                                    {index % 2 !== 0 && <Briefcase className="w-3 h-3" />}
                                                    {exp.type}
                                                    {index % 2 === 0 && <Briefcase className="w-3 h-3" />}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Center Milestone Dot */}
                                    <div className="absolute left-[2px] md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-white border-4 border-[var(--border)] shadow-sm z-10 relative mt-2" />
                                    </div>

                                    {/* Right Side (Content) */}
                                    <div className={`${index % 2 !== 0 ? "md:order-1 md:text-right" : ""} pl-10 md:pl-0`}>
                                        <h4 className="text-xl font-bold text-[var(--foreground)] mb-6 font-serif-display">
                                            {exp.role}
                                        </h4>
                                        <div className="space-y-4 text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                                            {exp.description.map((desc, i) => (
                                                <p key={i}>{desc}</p>
                                            ))}
                                        </div>
                                        <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                                            {exp.tags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-md text-xs font-medium text-[var(--muted-foreground)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ==================== GITHUB SECTION ==================== */}
                <div>
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">Developer Insights</span>
                        <h2 className="text-4xl md:text-5xl font-serif-display leading-tight text-[var(--foreground)]">
                            <span className="block">GitHub</span>
                            <span className="block mt-2 italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Activity</span>
                        </h2>
                    </div>

                    {/* Contribution Graph Simulation (Visual Design) */}
                    <div className="w-full overflow-hidden mb-8">
                        <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-2 px-1">
                            <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                        </div>
                        {/* Note: A real contribution graph SVG requires a proxy or server-side scraping due to CORS.
                   We simulate the visual style here to match the design perfectly. 
                */}
                        <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px] opacity-90">
                            {Array.from({ length: 7 }).map((_, row) => (
                                Array.from({ length: 53 }).map((_, col) => {
                                    // Deterministic level calculation (avoids SSR/Client hydration mismatch)
                                    // Uses row/col to compute a repeatable pattern instead of Math.random()
                                    const combined = row * 53 + col;
                                    // Spread out non-zero levels roughly ~30% of the time
                                    const level = (combined % 10) > 6 ? (combined % 4) + 1 : 0;
                                    const githubColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
                                    return (
                                        <div
                                            key={`${row}-${col}`}
                                            className="w-full aspect-square rounded-sm border border-gray-400"
                                            style={{ backgroundColor: githubColors[level] }}
                                        />
                                    )
                                })
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 text-[10px] text-[var(--muted-foreground)]">
                            <span>{new Date().getFullYear()} Contributions</span>
                            <div className="flex items-center gap-1">
                                <span>Less</span>
                                <div className="w-3 h-3 rounded-sm border border-gray-400" style={{ backgroundColor: "#ebedf0" }} />
                                <div className="w-3 h-3 rounded-sm border border-gray-400" style={{ backgroundColor: "#9be9a8" }} />
                                <div className="w-3 h-3 rounded-sm border border-gray-400" style={{ backgroundColor: "#40c463" }} />
                                <div className="w-3 h-3 rounded-sm border border-gray-400" style={{ backgroundColor: "#216e39" }} />
                                <span>More</span>
                            </div>
                        </div>
                    </div>

                    {/* Real Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Followers", value: stats.followers, icon: Users },
                            { label: "Total Stars", value: stats.stars, icon: Star },
                            { label: "Public Repos", value: stats.repos, icon: BookOpen },
                            { label: "Total Forks", value: stats.forks, icon: GitFork },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-[var(--card)] border-none p-4 rounded-xl flex items-center gap-4"
                            >
                                <div className="p-3 rounded-lg bg-[var(--muted)]">
                                    <stat.icon className="w-5 h-5 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">{stat.label}</div>
                                    <div className="text-xl font-bold text-[var(--foreground)]">{stat.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ==================== EXPLORE SECTION ==================== */}
                <div className="pt-20 border-t border-[var(--border)]">
                    <div className="text-center mb-16 space-y-2">
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">My Site</span>
                        <h2 className="text-4xl md:text-5xl font-serif-display leading-tight text-[var(--foreground)]">
                            <span className="block">Explore, experiment</span>
                            <span className="block mt-2 font-semibold text-[var(--foreground)]">&& say hello</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Uses Card */}
                        <div className="bg-[var(--card)] rounded-2xl p-8 hover:bg-[var(--muted)] transition-colors group cursor-pointer border-none">
                            <div className="flex gap-4 mb-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">⚛️</div>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">💻</div>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🔮</div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase">Uses</span>
                                <h3 className="text-lg font-bold text-[var(--foreground)] mt-1 mb-2">Check out my favorite tools and spots around the web.</h3>
                            </div>
                        </div>

                        {/* Guestbook Card */}
                        <div className="bg-[var(--card)] rounded-2xl p-8 hover:bg-[var(--muted)] transition-colors group cursor-pointer border-none relative overflow-hidden">
                            <div className="absolute top-4 right-4 md:right-[-20px] md:top-8 rotate-12 opacity-90">
                                {/* Mock Phone UI */}
                                <div className="w-24 h-40 bg-gray-800 rounded-xl border-4 border-gray-700 p-2 shadow-xl">
                                    <div className="w-full h-full bg-purple-500/20 rounded flex flex-col gap-2 p-2">
                                        <div className="w-3/4 h-2 bg-white/20 rounded" />
                                        <div className="w-1/2 h-2 bg-white/20 rounded" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 mt-20">
                                <span className="text-xs font-bold text-[var(--muted-foreground)] uppercase">Guestbook</span>
                                <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">Let me know you were here</h3>
                            </div>
                        </div>

                        {/* Spotify Card */}
                        <div className="bg-[var(--card)] rounded-2xl p-6 hover:bg-[var(--muted)] transition-colors group cursor-pointer border-none flex flex-col justify-between overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 text-[var(--primary)] font-bold text-xs uppercase tracking-wider">
                                    <Music className="w-4 h-4" /> Last Played
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-1">Last Played <span className="font-bold text-[var(--foreground)]">Someone You Loved</span> by Lewis Capaldi</p>
                                <p className="text-xs text-[var(--muted-foreground)]">from Divinely Uninspired ...</p>
                            </div>

                            {/* Vinyl Record Visual */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-black rounded-full border-4 border-gray-800 flex items-center justify-center animate-spin-slow opacity-80">
                                <div className="w-12 h-12 bg-red-600 rounded-full border-2 border-white/20" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}