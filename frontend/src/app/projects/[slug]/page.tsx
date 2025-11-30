"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Info, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
              backgroundSize: '12px 12px',
              opacity: 0.06,
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      {/* Use shared Navbar (contains search) */}
      <Navbar />

      {/* Project Content (hero, grid, article) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Watermark large background title for emphasis */}
        <div className="relative mb-12 pt-6">

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[var(--foreground)] mb-4">{project.title}</h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto mb-6 font-light">A focused case study exploring the architecture, design and technical choices behind {project.title}.</p>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) ? (
                  (project.technologies ?? project.tags ?? []).slice(0,6).map((t,i) => (
                    <span key={i} className="px-3 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-md text-xs font-medium text-[var(--foreground)] uppercase">{t}</span>
                  ))
                ) : null}
                <span className="px-3 py-1 text-[var(--muted-foreground)] text-xs">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-stretch rounded-full overflow-hidden group shadow-sm">
                  <span className="flex items-center justify-center w-10 h-10 bg-[var(--card)] border border-[var(--border)]">
                    <ExternalLink className="w-4 h-4 text-[var(--foreground)]" />
                  </span>
                  <span
                    className={`px-5 py-3 font-medium text-sm flex items-center gap-2 transition-all group-hover:brightness-95 ${
                      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    Check it out
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-stretch rounded-full overflow-hidden group shadow-sm">
                  <span className="flex items-center justify-center w-10 h-10 bg-[var(--background)] border border-[var(--border)]">
                    <Github className="w-4 h-4 text-[var(--foreground)]" />
                  </span>
                  <span className="px-5 py-3 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm flex items-center gap-2 transition-all group-hover:brightness-95">
                    Source Code
                  </span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left content column */}
          <div className="space-y-10">
            <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[var(--accent)]/8 border border-[var(--accent)]/20 rounded-xl p-6 flex gap-4 items-start">
              <div className="bg-[var(--accent)]/20 p-2 rounded-full shrink-0 text-[var(--accent)] mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">Project Overview</h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed font-light">{project.title} is built with performance and clarity in mind — using modern tooling and clean architecture to deliver a delightful experience.</p>
              </div>
            </motion.div>

            {/* Primary feature image */}
            {project.images && project.images.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-[var(--card)]">
                <div className="relative aspect-video w-full">
                  <Image src={project.images[selectedImageIndex].url} alt={project.images[selectedImageIndex].alt || project.title} fill className="object-cover" />
                </div>
              </motion.div>
            )}

            {/* Thumbnails */}
            {project.images && project.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {project.images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImageIndex(idx)} className={`relative aspect-video rounded-lg overflow-hidden border transition-all ${selectedImageIndex === idx ? 'ring-2 ring-[var(--accent)] ring-offset-2' : 'border-[var(--border)] opacity-70 hover:opacity-100'}`}>
                    <img src={img.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Rich markdown article */}
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:font-light prose-p:leading-7 prose-a:text-[var(--accent)] prose-strong:font-semibold prose-img:rounded-xl prose-img:shadow-lg">
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </article>

            {/* Tags + Action Row (below article) */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) ? (
                  (project.technologies ?? project.tags ?? []).map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))
                ) : (
                  <div className="text-sm text-[var(--muted-foreground)]">No tags provided by the API</div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-stretch rounded-full overflow-hidden group shadow-sm">
                    <span className="flex items-center justify-center w-9 h-9 bg-[var(--card)] border border-[var(--border)]">
                      <ExternalLink className="w-4 h-4 text-[var(--foreground)]" />
                    </span>
                    <span className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] font-medium text-sm flex items-center gap-2 transition-all group-hover:brightness-95">
                      Live
                    </span>
                  </a>
                ) : (
                  <div className="text-sm text-[var(--muted-foreground)]">No live URL provided</div>
                )}

                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-stretch rounded-full overflow-hidden group shadow-sm">
                    <span className="flex items-center justify-center w-9 h-9 bg-[var(--background)] border border-[var(--border)]">
                      <Github className="w-4 h-4 text-[var(--foreground)]" />
                    </span>
                    <span className="px-4 py-2 bg-[var(--card)] text-[var(--foreground)] font-medium text-sm flex items-center gap-2 transition-all group-hover:brightness-95">
                      View on GitHub
                    </span>
                  </a>
                ) : (
                  <div className="text-sm text-[var(--muted-foreground)]">No GitHub link provided</div>
                )}
              </div>
            </div>

            {/* Outcome box */}
            <div className="mt-8 bg-green-50/60 border border-green-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="font-serif font-bold text-lg text-[var(--foreground)]">Result & Impact</h3>
              </div>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">{project.title} demonstrates high-performance patterns and continuous delivery best practices — making it production-ready and easy to iterate on.</p>
              {project.liveUrl && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--muted-foreground)]">Explore it live:</span>
                  <a href={project.liveUrl} className="font-medium text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">Visit the live app</a>
                </div>
              )}
            </div>
          </div>

          {/* Right column: TOC / sticky - placeholder
              TODO: Populate this TOC/index from API when available. Kept a simple back link for now. */}
          <aside className="hidden lg:block relative h-full">
            <div className="sticky top-24 space-y-8">
              <div className="pt-8 border-t border-[var(--border)]">
                <Link href="/work" className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-2 transition-colors"><ArrowLeft className="w-3 h-3" />Back to all projects</Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}