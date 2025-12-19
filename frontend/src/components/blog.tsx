"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export default function Blog() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-admin-panel-sigma.vercel.app/api/blogs?page=1&limit=3");
        const data = await res.json();
        if (data.success) {
          setBlogPosts(data.data.items.filter((b: BlogPost) => b.active));
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">Loading blogs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Latest from my <span className="font-serif-italic text-[var(--primary)]">blog</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => post.link ? window.open(post.link, '_blank') : router.push(`/blog/${post.slug}`)}
            >
              <div className="flex items-center gap-2 mb-4">
                {post.tags.length > 0 && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                    {post.tags[0]}
                  </span>
                )}
                <div className="flex items-center gap-1 text-[var(--text-secondary)] text-xs">
                  <Calendar size={12} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 hover:text-[var(--primary)] transition-colors">
                {post.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                {post.description.length > 100 ? post.description.substring(0, 100) + "..." : post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Read more</span>
                <button className="flex items-center gap-1 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors font-medium">
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/blog')}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-medium hover:bg-[var(--primary)]/80 transition-colors"
          >
            View All Posts
          </button>
        </motion.div>
      </div>
    </section>
  );
}