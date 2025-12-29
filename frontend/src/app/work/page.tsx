"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Sparkles, Star } from "lucide-react";
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`, { cache: 'no-store' });
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

            {/* Clean Subtle Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.02]" aria-hidden>
                <div className="absolute top-40 right-20 w-96 h-96 border border-[var(--border)] rounded-full" />
                <div className="absolute bottom-40 left-20 w-64 h-64 border border-[var(--border)] rounded-full" />
            </div>

            <section className="pt-24 pb-16 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Clean Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--muted)] border border-[var(--border)] mb-6">
                            <Sparkles size={16} className="text-[var(--accent)]" />
                            <span className="text-sm font-medium text-[var(--muted-foreground)]">Portfolio Showcase</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif mb-6">
                            Curated <span className="italic font-light text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>work</span>
                        </h1>

                        <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                            A curated collection of projects showcasing{" "}
                            <span className="text-[var(--foreground)] font-medium">innovation</span>,{" "}
                            <span className="text-[var(--foreground)] font-medium">technical excellence</span>, and{" "}
                            <span className="text-[var(--foreground)] font-medium">creative problem-solving</span>
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <div className="px-6 py-3 rounded-full bg-[var(--card)] border border-[var(--border)]">
                                <span className="text-2xl font-bold text-[var(--foreground)]">{projects.length}</span>
                                <span className="text-sm text-[var(--muted-foreground)] ml-2">Projects</span>
                            </div>
                            <div className="px-6 py-3 rounded-full bg-[var(--card)] border border-[var(--border)]">
                                <span className="text-2xl font-bold text-[var(--accent)]">{featuredProjects.length}</span>
                                <span className="text-sm text-[var(--muted-foreground)] ml-2">Featured</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Projects */}
                    {featuredProjects.length > 0 && (
                        <div className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className="w-1 h-10 bg-gradient-to-b from-[var(--accent)] to-[var(--primary)] rounded-full" />
                                <div>
                                    <h2 className="text-3xl font-bold flex items-center gap-3">
                                        Featured Projects
                                        <Star size={20} className="text-yellow-500 fill-yellow-500" />
                                    </h2>
                                    <p className="text-[var(--muted-foreground)] mt-1">Handpicked highlights from my portfolio</p>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {featuredProjects.map((project, index) => (
                                    <motion.article
                                        key={project._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                        className="group relative bg-[var(--card)] rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        {/* Featured Badge */}
                                        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white text-xs font-bold shadow-lg flex items-center gap-1">
                                            <Sparkles size={12} />
                                            Featured
                                        </div>

                                        {project.images?.[0]?.url && (
                                            <div className="relative overflow-hidden h-64 md:h-80">
                                                <Image
                                                    src={project.images[0].url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            </div>
                                        )}

                                        <div className="p-8">
                                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: 'var(--gradient-accent)' }}>
                                                {project.title}
                                            </h3>

                                            <div className="text-[var(--muted-foreground)] mb-6 line-clamp-3 leading-relaxed">
                                                {project.projectMarkdown && project.projectMarkdown.trim() ? (
                                                    <ReactMarkdown>{project.projectMarkdown}</ReactMarkdown>
                                                ) : (
                                                    <p>{project.description}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags.slice(0, 4).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-semibold rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-3">
                                                <a
                                                    href={`/projects/${project.slug}`}
                                                    className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 text-white"
                                                    style={{ backgroundImage: 'var(--gradient-accent)' }}
                                                >
                                                    View Details
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </a>
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--muted)] transition-all"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--muted)] transition-all"
                                                        title="View Code"
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Projects */}
                    {regularProjects.length > 0 && (
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                                <div>
                                    <h2 className="text-3xl font-bold">All Projects</h2>
                                    <p className="text-[var(--muted-foreground)] mt-1">Explore my complete portfolio</p>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularProjects.map((project, index) => (
                                    <motion.article
                                        key={project._id}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.02 }}
                                        className="group h-full bg-[var(--card)] rounded-2xl overflow-hidden shadow-lg border border-[var(--border)] hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                                    >
                                        {project.images?.[0]?.url && (
                                            <div className="relative overflow-hidden h-48">
                                                <Image
                                                    src={project.images[0].url}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                                                {project.title}
                                            </h3>

                                            <div className="text-[var(--muted-foreground)] mb-4 line-clamp-2 text-sm leading-relaxed">
                                                {project.projectMarkdown && project.projectMarkdown.trim() ? (
                                                    <ReactMarkdown>{project.projectMarkdown}</ReactMarkdown>
                                                ) : (
                                                    <p>{project.description}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium rounded-full border border-[var(--border)]"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                <a
                                                    href={`/projects/${project.slug}`}
                                                    className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium text-sm hover:opacity-90 transition-opacity"
                                                >
                                                    View Project
                                                </a>
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                                                        title="View Code"
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    )}

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