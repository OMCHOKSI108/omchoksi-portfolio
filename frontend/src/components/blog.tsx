"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable React Applications",
    excerpt: "Learn how to structure your React apps for better performance and maintainability.",
    date: "Nov 25, 2025",
    readTime: "5 min read",
    category: "React"
  },
  {
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape.",
    date: "Nov 20, 2025",
    readTime: "7 min read",
    category: "Trends"
  },
  {
    title: "Optimizing Database Queries",
    excerpt: "Best practices for writing efficient database queries and improving application performance.",
    date: "Nov 15, 2025",
    readTime: "6 min read",
    category: "Backend"
  }
];

export default function Blog() {
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
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[var(--card)] text-[var(--primary)] rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-[var(--text-secondary)] text-xs">
                  <Calendar size={12} />
                  {post.date}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 hover:text-[var(--primary)] transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">{post.readTime}</span>
                <button className="flex items-center gap-1 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors font-medium">
                  Read more
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
          <button className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-medium hover:bg-[var(--primary)]/80 transition-colors">
            View All Posts
          </button>
        </motion.div>
      </div>
    </section>
  );
}