"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import { motion } from "framer-motion";
import Image from "next/image";


interface Project {
    _id: string;
    title: string;
    slug: string;
    description: string;
    projectMarkdown?: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    images?: Array<{ url: string; caption?: string; showOnProject?: boolean }>;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function WorkPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=10`, { cache: 'no-store' });
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data.data?.items || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg font-medium"
                >
                    Loading projects...
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="text-lg text-red-500">Error: {error}</div>
            </div>
        );
    }

    const featuredProjects = projects.filter(p => p.featured);
    const regularProjects = projects.filter(p => !p.featured);

    return (
        <main className="min-h-screen bg-[var(--background)] relative">
            <Navbar />

            {/* TECHNICAL BLUEPRINT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center">
                {/* 1. Large "project" Text layer - FITTED */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] dark:opacity-[0.08]">
                    <span
                        className="font-serif font-black tracking-tighter text-transparent lowercase leading-none"
                        style={{
                            fontSize: '18vw', // Reduced size to fit fit perfectly
                            WebkitTextStroke: '1px var(--foreground)',
                            backgroundImage: 'repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 0, transparent 50%)',
                            backgroundSize: '8px 8px',
                            WebkitBackgroundClip: 'text',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        project
                    </span>
                </div>

                {/* 2. Engineering/Technical Lines Overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.15]" aria-hidden="true">
                    <defs>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
                        </pattern>
                    </defs>

                    {/* Grid Pattern */}
                    <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

                    {/* Central Crosshair */}
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="10 10" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="10 10" />

                    {/* Concentric Circles (Technical Measures) */}
                    <circle cx="50%" cy="50%" r="15%" fill="none" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="30%" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="var(--foreground)" strokeWidth="0.5" strokeDasharray="20 10" />

                    {/* Degree Markers */}
                    <text x="50%" y="20%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">90°</text>
                    <text x="80%" y="50%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">0°</text>
                    <text x="50%" y="80%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">270°</text>
                    <text x="20%" y="50%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">180°</text>

                    {/* Decorative Lines */}
                    <line x1="10%" y1="10%" x2="20%" y2="10%" stroke="var(--foreground)" strokeWidth="2" />
                    <text x="10%" y="9%" fill="var(--foreground)" fontSize="10" fontFamily="monospace">REF-01</text>

                    <line x1="80%" y1="90%" x2="90%" y2="90%" stroke="var(--foreground)" strokeWidth="2" />
                    <text x="80%" y="89%" fill="var(--foreground)" fontSize="10" fontFamily="monospace">SCALE 1:1</text>
                </svg>
            </div>

            <section className="pt-32 pb-16 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-32"
                    >
                        <h1 className="text-6xl md:text-8xl font-serif font-black mb-6 relative inline-block">
                            Curated <span className="italic font-light text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>Work</span>
                        </h1>
                    </motion.div>

                    {/* Staggered 2-Column Grid Layout */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-32">

                        {/* Central Divider Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--border)] hidden lg:block opacity-30" />

                        {projects.map((project, index) => {
                            // Vibrant Accent Colors (Pink, Green, Yellow, Blue, Purple, Orange)
                            const colors = ['#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#f97316'];
                            const accentColor = colors[index % colors.length];

                            return (
                                <ProjectCard
                                    key={project._id || index}
                                    project={{
                                        id: project.slug,
                                        title: project.title,
                                        description: project.description,
                                        imageUrl: project.images?.[0]?.url || '',
                                        projectUrl: project.liveUrl || '',
                                        githubUrl: project.githubUrl,
                                        liveUrl: project.liveUrl,
                                        tags: project.tags,
                                        category: project.tags?.[0] || 'WORK'
                                    }}
                                    index={index}
                                    accentColor={accentColor}
                                />
                            );
                        })}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[var(--muted-foreground)] text-lg">No projects available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}