"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Info, CheckCircle2, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ReactMarkdown from 'react-markdown';

interface Project {
  _id: string;
  title: string;
  description: string;
  projectMarkdown?: string;
  slug: string;
  images?: { url: string; alt: string }[];
  technologies?: string[];
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/api/projects?slug=${slug}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success && data.data.items.length > 0 ? data.data.items[0] : null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { slug } = await params;
        const projectData = await getProject(slug);
        if (!projectData) {
          setError('Project not found');
        } else {
          setProject(projectData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params]);

  // Debug: log project to console when loaded to help troubleshoot missing fields
  useEffect(() => {
    if (project) {
      // eslint-disable-next-line no-console
      console.log('Loaded project (slug page):', project);
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-xl text-[var(--muted-foreground)]">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Project Not Found</h1>
          <p className="text-[var(--muted-foreground)] mb-6">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Foggy Background Effects + subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[color:var(--accent)/0.08] rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[color:var(--accent)/0.06] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[color:var(--muted)/0.04] rounded-full blur-3xl"></div>

        {/* Subtle repeating grid texture (CSS gradients) - visually similar to the supplied attachment */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
            /* make this page-local grid very subtle so it doesn't double up with the global .site-grid */
            backgroundSize: '24px 24px',
            opacity: 0.02,
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      {/* Use shared Navbar (contains search) */}
      <Navbar />

      {/* Project Content (hero, grid, article) */}
      {/* Project Content (2-Column Layout) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 items-start">

          {/* LEFT SIDEBAR: Tags, Actions, Meta */}
          <aside className="order-2 lg:order-1 relative">
            <div className="sticky top-24 space-y-8 p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">

              {/* Back Link */}
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Works
              </Link>

              <div className="h-[1px] bg-[var(--border)] w-full" />

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) ? (
                    (project.technologies ?? project.tags ?? []).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--foreground)] hover:border-[var(--accent)] transition-colors cursor-default">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--muted-foreground)]">No tags</span>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Date</h3>
                <p className="font-medium text-[var(--foreground)]">{new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-bold shadow-md hover:brightness-110 transition-all">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-lg font-bold shadow-sm hover:bg-[var(--accent)]/10 transition-all">
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </aside>


          {/* RIGHT CONTENT: Title, Carousel, Article */}
          <div className="order-1 lg:order-2 space-y-10">

            {/* Title & Desc */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[var(--foreground)] leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-[var(--muted-foreground)] font-light leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Image Carousel */}
            {project.images && project.images.length > 0 ? (
              <div className="space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-[var(--muted)] group">

                  <Image
                    src={project.images[selectedImageIndex].url}
                    alt={project.images[selectedImageIndex].alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500"
                    priority
                  />

                  {/* Carousel Controls */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex((prev) => (prev + 1) % project.images!.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {project.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative aspect-video rounded-lg overflow-hidden border transition-all ${selectedImageIndex === idx ? 'ring-2 ring-[var(--accent)] ring-offset-2' : 'border-[var(--border)] opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {/* Overview Box */}
            <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-8 flex gap-6 items-start">
              <div className="bg-[var(--accent)]/20 p-3 rounded-full shrink-0 text-[var(--accent)]">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[var(--foreground)]">Project Overview</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  A deep dive into the technical implementation and design challenges solved during the development of {project.title}. This project highlights modern best practices and scalable architecture.
                </p>
              </div>
            </div>

            {/* Markdown Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-[var(--muted-foreground)] prose-p:font-light prose-p:leading-8 prose-li:text-[var(--muted-foreground)] prose-strong:text-[var(--foreground)] prose-strong:font-semibold">
              <ReactMarkdown>{project.projectMarkdown && project.projectMarkdown.trim() ? project.projectMarkdown : project.description}</ReactMarkdown>
            </article>

          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}