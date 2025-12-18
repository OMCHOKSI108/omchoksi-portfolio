"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from 'lucide-react';

// API Project interface
interface ApiProject {
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

// Mapped Project interface for component
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  tech: { name: string; icon: string }[];
  image: string;
  color: string;
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        const apiProjects: ApiProject[] = data.data?.items || [];

        // Map API projects to component format and take first 3
        const mappedProjects: Project[] = apiProjects.slice(0, 3).map((apiProj, index) => ({
          id: apiProj._id,
          title: apiProj.title,
          slug: apiProj.slug,
          description: apiProj.description,
          features: apiProj.tags, // Use tags as features
          tech: apiProj.tags.slice(0, 4).map(tag => ({ name: tag, icon: tag.toLowerCase() })), // Simple mapping
          image: apiProj.images?.[0]?.url || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
          color: ["bg-blue-700", "bg-purple-700", "bg-red-700"][index % 3],
          liveUrl: apiProj.liveUrl,
          githubUrl: apiProj.githubUrl
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to empty array
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full bg-[var(--background)] py-4 px-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="text-lg">Loading projects...</div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative w-full bg-[var(--background)] py-4 px-6">
      {/* Inject Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4 block">
            Featured Work
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--foreground)] mb-6">
            My <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">AI Projects</span>
          </h2>
          <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            A portfolio of AI applications, ML research experiments, cybersecurity tools, and deployed web apps — each built to solve a real-world problem, not just get an accuracy score.
          </p>
        </div>

        {/* Projects Layout */}
        <div className="space-y-18">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center pt-8">
          <a
            href="/work"
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-[var(--border)] rounded-full text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-purple-500 transition-all duration-300"
          >
            <span className="text-lg font-medium">View All Projects</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
    >
      {/* Left: Image */}
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-[var(--border)] bg-[var(--card)]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Right: Text Content */}
      <div className="w-full flex flex-col justify-center py-8">
        {/* Title & Accent */}
        <div className="flex items-start gap-6 mb-4">
          <div className="mt-2">
            <div className="w-1 h-10 bg-blue-500 rounded-full" />
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-[var(--foreground)] leading-tight">
              {project.title}
            </h3>

            {/* Render description as multiple paragraphs (supports future markdown endpoint) */}
            <div className="mt-3 text-sm text-[var(--muted-foreground)] max-w-2xl space-y-3">
              {project.description.split('\n').map((line, idx) => (
                <p key={idx} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* Quick info card with live/source links (theme-friendly) */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-6 max-w-2xl">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--card)] border border-[var(--card-border)] shadow-sm">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-[var(--success-bg)] text-[var(--success-text)] flex items-center justify-center font-bold">✓</div>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">Want to explore it live?</p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700">Visit the live app</a>
                      )}
                      {project.githubUrl && (
                        <>
                          {project.liveUrl ? ' or ' : ''}
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700">view the source code</a>
                        </>
                      )}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature bullets (small list like attachment) */}
        <ul className="mt-6 mb-6 space-y-3 max-w-2xl">
          {project.features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
              <span className="mt-1 text-[var(--primary)]">
                <Star className="w-4 h-4" />
              </span>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tech.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--card)]/60 border border-[var(--card-border)] text-[var(--foreground)] rounded-full text-xs font-medium shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--muted)]/30 text-[var(--muted-foreground)] text-[10px]">
                {tech.icon ? tech.icon.charAt(0).toUpperCase() : tech.name.charAt(0).toUpperCase()}
              </span>
              {tech.name}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-3 px-5 py-3 border border-slate-200 rounded-full text-slate-900 bg-white hover:shadow-md transition-all duration-200"
            aria-label={`View ${project.title}`}
          >
            <span className="text-sm font-medium">View Project</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;