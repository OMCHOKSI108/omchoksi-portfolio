"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Search, Clock, ArrowUpRight, Calendar, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// --- API Data Types ---
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  createdAt: string;
  active: boolean;
}

const TOPICS = [
  "nextjs", "react", "css", "tailwindcss", "java", "flexbox",
  "design", "tips", "grid", "tools", "vite", "core-concept",
  "git", "pattern", "typescript", "setup", "form",
  "productivity", "web", "animation"
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState("Newest First");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-admin-panel-sigma.vercel.app/api/blogs?page=1&limit=50");
        const data = await res.json();
        if (data.success) {
          setPosts(data.data.items.filter((b: BlogPost) => b.active));
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(query) ||
           post.description.toLowerCase().includes(query) ||
           post.tags.some(tag => tag.toLowerCase().includes(query));
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300 flex items-center justify-center">
        <div className="animate-pulse">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent transition-colors duration-300 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      {/* Background Texture */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
          <img
            src="/assets/cta.avif"
            alt="Background Texture"
            className="w-full h-full object-cover dark:brightness-25 dark:contrast-150"
          />
          <div className="absolute inset-0 bg-transparent dark:bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* MAIN CONTAINER */}
        <section className="relative w-full min-h-screen py-32 bg-[var(--background)] font-sans text-[var(--foreground)]">
          {/* Seamless blend gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[var(--background)]/10 to-[var(--muted)]/20 pointer-events-none z-10" />

          {/* Inject Fonts */}
          <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
            .font-serif-display { font-family: 'Playfair Display', serif; }
          `}} />

          {/* Background Noise */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">

            {/* --- Header Section --- */}
            <div className="flex flex-col items-center text-center mb-20 space-y-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                    The Blog
                </span>
                <h2 className="text-5xl md:text-7xl font-serif-display text-[var(--foreground)] leading-tight">
                    Handpicked insights <br />
                    from <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">the pensieve</span>
                </h2>

                {/* Search Bar */}
                <div className="relative w-full max-w-xl mt-8">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-16 py-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--ring)] transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        <kbd className="hidden sm:inline-block px-2 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-md text-[10px] font-bold text-[var(--muted-foreground)] shadow-sm">
                            Ctrl
                        </kbd>
                        <kbd className="hidden sm:inline-block px-2 py-1 bg-[var(--muted)] border border-[var(--border)] rounded-md text-[10px] font-bold text-[var(--muted-foreground)] shadow-sm">
                            K
                        </kbd>
                    </div>
                </div>
            </div>

            {/* --- Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* --- Left Column: Blog Posts (Span 8) --- */}
                <div className="lg:col-span-8 space-y-12">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group flex flex-col md:flex-row gap-8 items-start border-b border-[var(--border)] pb-12 last:border-0 cursor-pointer"
                            onClick={() => router.push(`/blog/${post.slug}`)}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-4">
                                {/* Meta Row */}
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="text-[var(--muted-foreground)] font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed line-clamp-3">
                                    {post.description.length > 150 ? post.description.substring(0, 150) + "..." : post.description}
                                </p>

                                {/* Footer Row */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                                        <Clock className="w-3 h-3" />
                                        <span>5 min read</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {post.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Read More Button */}
                                {post.link && (
                                    <div className="pt-4">
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-sm font-medium hover:bg-[var(--primary)]/80 transition-colors"
                                        >
                                            Read Full Article
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Image Thumbnail */}
                            <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                                <img
                                    src={post.image || "/assets/cta.avif"}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    ))}
                    {filteredPosts.length === 0 && searchQuery && (
                        <div className="text-center py-12">
                            <p className="text-[var(--muted-foreground)]">No blogs found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                {/* --- Right Column: Sidebar (Span 4) --- */}
                <div className="lg:col-span-4 space-y-10 pl-0 lg:pl-8">

                    {/* Filter Box */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--muted)] transition-colors">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-[var(--muted-foreground)]" />
                            <div>
                                <div className="text-sm font-bold text-[var(--foreground)]">Newest First</div>
                                <div className="text-xs text-[var(--muted-foreground)]">Most recent posts first</div>
                            </div>
                        </div>
                        <div className="bg-[var(--muted)] p-1 rounded-md shadow-sm">
                            <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                        </div>
                    </div>

                    {/* Topics Cloud */}
                    <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                            <span className="text-[var(--muted-foreground)] text-xl">#</span> Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {TOPICS.map((topic) => (
                                <button
                                    key={topic}
                                    className="px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--foreground)] hover:border-[var(--ring)] hover:text-[var(--primary)] transition-all font-mono"
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}