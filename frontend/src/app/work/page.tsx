"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
        console.log('Fetching from:', `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`, { cache: 'no-store' }); // Fetch up to 20 active projects, no cache for live updates
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        console.log('API Response:', data);
        setProjects(data.data?.items || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-primary)' }}>
              All My Projects
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              A complete collection of my work, from AI applications to web development projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full bg-[var(--card)] rounded-3xl overflow-hidden shadow-lg border border-[var(--border)] hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
              >
                {project.images?.[0]?.url && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.images[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 font-serif">
                    {project.title}
                  </h3>
                  <div className="text-[var(--muted-foreground)] mb-6 line-clamp-3 text-sm leading-relaxed">
                    {project.projectMarkdown && project.projectMarkdown.trim() ? (
                      <ReactMarkdown>{project.projectMarkdown}</ReactMarkdown>
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium rounded-full border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
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
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--muted-foreground)]">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}