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
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Texture - Dot Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Fading Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]" />
      </div>

      {/* Use shared Navbar (contains search) */}
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          {/* LEFT SIDEBAR: "Pillar" Style Navigation */}
          <aside className="order-2 lg:order-1 relative hidden lg:block">
            <div className="sticky top-32">

              {/* Back Link (Top of Pillar) */}
              <div className="mb-12 relative pl-6">
                <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors -ml-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Works
                </Link>
              </div>

              {/* The Vertical Pillar Line */}
              <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-gradient-to-b from-[var(--foreground)]/50 via-[var(--foreground)]/20 to-transparent" />

              {/* NAV SECTIONS */}
              <div className="space-y-12">

                {/* Section: Technologies */}
                <div className="relative pl-8 group">
                  {/* Branch Connector */}
                  <div className="absolute left-0 top-3 w-6 h-[1px] bg-[var(--foreground)]/20 group-hover:bg-[var(--foreground)]/50 transition-colors" />
                  <div className="absolute -left-[3px] top-[10px] w-[7px] h-[7px] rounded-full border border-[var(--foreground)] bg-[var(--background)] z-10" />

                  <h3 className="font-serif italic text-xl text-[var(--foreground)] mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) ? (
                      (project.technologies ?? project.tags ?? []).map((t, i) => (
                        <span key={i} className="text-xs font-mono text-[var(--muted-foreground)] block border-l-2 border-[var(--border)] pl-2">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[var(--muted-foreground)]">No tags</span>
                    )}
                  </div>
                </div>

                {/* Section: Date */}
                <div className="relative pl-8 group">
                  {/* Branch Connector */}
                  <div className="absolute left-0 top-3 w-6 h-[1px] bg-[var(--foreground)]/20 group-hover:bg-[var(--foreground)]/50 transition-colors" />
                  <div className="absolute -left-[3px] top-[10px] w-[7px] h-[7px] rounded-full border border-[var(--foreground)] bg-[var(--background)] z-10" />

                  <h3 className="font-serif italic text-xl text-[var(--foreground)] mb-2">Date</h3>
                  <p className="font-mono text-sm text-[var(--muted-foreground)]">{new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</p>
                </div>

                {/* Section: Links */}
                <div className="relative pl-8 group">
                  {/* Branch Connector */}
                  <div className="absolute left-0 top-3 w-6 h-[1px] bg-[var(--foreground)]/20 group-hover:bg-[var(--foreground)]/50 transition-colors" />
                  <div className="absolute -left-[3px] top-[10px] w-[7px] h-[7px] rounded-full border border-[var(--foreground)] bg-[var(--background)] z-10" />

                  <h3 className="font-serif italic text-xl text-[var(--foreground)] mb-4">Links</h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:underline decoration-1 underline-offset-4 group/link">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                        <Github className="w-3.5 h-3.5" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* Mobile Actions (Visible only on small screens) */}
          <div className="lg:hidden order-2 space-y-4 mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {((project.technologies ?? project.tags ?? []).map((t, i) => (
                <span key={i} className="px-2 py-1 bg-[var(--muted)] rounded text-xs text-[var(--muted-foreground)]">{t}</span>
              )))}
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium text-sm">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2.5 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-medium text-sm">
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
            </div>
            <div className="h-[1px] bg-[var(--border)] w-full my-6" />
          </div>


          {/* RIGHT CONTENT: Title, Carousel, Article */}
          <div className="order-1 lg:order-2 space-y-12">

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-[var(--foreground)] leading-[1.1]">
                {project.title}
              </h1>
            </div>

            {/* Image Carousel */}
            {project.images && project.images.length > 0 ? (
              <div className="space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--muted)] group">

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
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex((prev) => (prev + 1) % project.images!.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/40 hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {project.images.length > 1 && (
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative aspect-video rounded-md overflow-hidden border transition-all ${selectedImageIndex === idx ? 'ring-2 ring-[var(--foreground)] ring-offset-2' : 'border-[var(--border)] opacity-50 hover:opacity-100'}`}
                      >
                        <img src={img.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {/* Markdown Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-serif prose-headings:font-medium prose-headings:text-[var(--foreground)] 
              prose-p:text-[var(--muted-foreground)] prose-p:leading-8 prose-p:font-light
              prose-li:text-[var(--muted-foreground)] 
              prose-strong:text-[var(--foreground)] prose-strong:font-semibold
              first-letter:text-5xl first-letter:font-serif first-letter:text-[var(--foreground)] first-letter:mr-3 first-letter:float-left">
              <ReactMarkdown>
                {((project.projectMarkdown && project.projectMarkdown.length > (project.description?.length || 0)) ? project.projectMarkdown : project.description).replace(/\\n/g, '\n')}
              </ReactMarkdown>
            </article>

          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}