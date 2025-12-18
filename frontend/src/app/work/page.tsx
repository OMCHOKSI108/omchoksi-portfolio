"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`); // Fetch up to 20 active projects
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
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-4">
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
                className="bg-[var(--card)] rounded-lg overflow-hidden shadow-lg border border-[var(--border)] hover:shadow-xl transition-shadow"
              >
                {project.images?.[0]?.url && (
                  <img
                    src={project.images[0].url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View Project
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:bg-[var(--primary)]/80 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                      >
                        <Github size={16} />
                        Code
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