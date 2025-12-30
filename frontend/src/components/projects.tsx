// ... (imports)
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

// ... (interfaces ApiProject and Project remain same)
interface ApiProject {
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
  markdown?: string;
}

const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Refs for images to track scrolling
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ... (fetch logic remains same)
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?limit=20`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        const apiProjects: ApiProject[] = data.data?.items || [];

        const mappedProjects: Project[] = apiProjects.slice(0, 4).map((apiProj, index) => ({
          id: apiProj._id,
          title: apiProj.title,
          slug: apiProj.slug,
          // Use Full Markdown if available, otherwise Description
          description: (apiProj.projectMarkdown && apiProj.projectMarkdown.trim().length > 0)
            ? apiProj.projectMarkdown
            : apiProj.description,
          features: apiProj.tags,
          tech: apiProj.tags.slice(0, 4).map(tag => ({ name: tag, icon: tag.toLowerCase() })),
          image: apiProj.images?.[0]?.url || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
          color: ["bg-blue-700", "bg-purple-700", "bg-red-700"][index % 3],
          liveUrl: apiProj.liveUrl,
          githubUrl: apiProj.githubUrl,
          markdown: apiProj.projectMarkdown || undefined,
        }));
        setProjects(mappedProjects);
      } catch (error) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Intersection Observer to track ACTIVE IMAGE
  useEffect(() => {
    const observers = imageRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveProjectIndex(index);
            }
          });
        },
        {
          threshold: 0.6, // Trigger when 60% of image is visible
          rootMargin: "-20% 0px -20% 0px" // Shrink hit area to center of screen
        }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [projects]);


  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (projects.length === 0) return null;

  const activeProject = projects[activeProjectIndex];

  return (
    <section className="relative w-full py-20 px-6 bg-[var(--background)]">
      {/* Inject Fonts */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4 block">
            Featured Work
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--foreground)] mb-6">
            My <span className="italic font-light text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>AI Projects</span>
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 xl:gap-20 relative items-start">

          {/* LEFT COLUMN: SCROLLING IMAGES - Snap Scrolling Enabled */}
          <div className="w-full lg:w-[48%] flex flex-col gap-[15vh] pb-[20vh] snap-y snap-mandatory">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { if (el) imageRefs.current[index] = el; }} // Assign Ref
                className={`snap-center group w-full aspect-[16/11] rounded-[2rem] overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-2xl transition-all duration-700 ease-out ${activeProjectIndex === index
                  ? 'opacity-100 scale-100 ring-4 ring-[var(--foreground)]/10 shadow-[var(--foreground)]/20'
                  : 'opacity-50 scale-95'
                  }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: STICKY TEXT CONTENT - Scrollable if content is long */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-32 h-auto min-h-[50vh] flex flex-col justify-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject ? activeProject.id : 'empty'}
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="relative p-8 md:p-10 rounded-3xl bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--border)] shadow-2xl overflow-y-auto scrollbar-hide max-h-[75vh]"
              >
                {activeProject && (
                  <>
                    {/* Floating Number Badge */}
                    <div className="absolute -top-6 -left-4 w-16 h-16 rounded-full bg-[var(--foreground)] text-[var(--background)] border-4 border-[var(--background)] shadow-xl flex items-center justify-center font-serif text-2xl font-bold italic">
                      0{activeProjectIndex + 1}
                    </div>

                    <div className="mt-4 space-y-8">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-3 pl-2">
                        {activeProject.tech.slice(0, 4).map(t => (
                          <span key={t.name} className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--foreground)] shadow-sm flex items-center gap-2 hover:bg-[var(--muted)] transition-colors">
                            {t.name}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-serif font-black text-[var(--foreground)] leading-[0.95] tracking-tight mb-4">
                        {activeProject.title}
                      </h3>

                      {/* Description - Styled Markdown - HIGH CONTRAST */}
                      <div className="text-base md:text-lg text-[var(--foreground)]/90 leading-relaxed font-medium">
                        <ReactMarkdown components={{
                          p: ({ node, ...props }) => <p className="mb-4" {...props} />
                        }}>
                          {activeProject.description}
                        </ReactMarkdown>
                      </div>

                      {/* CTA Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-[var(--border)]/50">
                        <a
                          href={`/projects/${activeProject.slug}`}
                          className="group flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--foreground)]/10"
                        >
                          View Case Study <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </a>

                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-base font-bold text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors border-b-2 border-transparent hover:border-[var(--muted-foreground)] py-1"
                          >
                            <ExternalLink size={18} /> Live Project
                          </a>
                        )}
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-base font-bold text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors border-b-2 border-transparent hover:border-[var(--muted-foreground)] py-1"
                          >
                            <Github size={18} /> Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-24">
          <a href="/work" className="px-10 py-4 rounded-full border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-all hover:tracking-widest duration-300 uppercase text-sm">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;