"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock, ArrowLeft, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`https://portfolio-admin-panel-sigma.vercel.app/api/blogs?slug=${slug}`);
        const data = await res.json();
        if (data.success && data.data.items.length > 0) {
          setBlogPost(data.data.items[0]);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        setError("Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogPost();
  }, [slug]);

  // Check if content contains markdown syntax
  const isMarkdown = (text: string) => {
    const markdownPatterns = [
      /^#+\s/m,           // Headers
      /\*\*.*?\*\*/,      // Bold
      /\*.*?\*/,          // Italic
      /`.*?`/,            // Inline code
      /\[.*?\]\(.*?\)/,   // Links
      /^[-*+]\s/m,        // Lists
      /^\d+\.\s/m,        // Ordered lists
      /^>\s/m,            // Blockquotes
      /```[\s\S]*?```/m,  // Code blocks
    ];
    return markdownPatterns.some(pattern => pattern.test(text));
  };

  const renderContent = (content: string) => {
    if (isMarkdown(content)) {
      return (
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6 mt-8 first:mt-0">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 mt-8">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3 mt-6">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-[var(--foreground)] leading-relaxed mb-4 font-normal">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-[var(--foreground)] mb-4 space-y-2 font-normal">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-[var(--foreground)] mb-4 space-y-2 font-normal">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-[var(--foreground)] font-normal">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--primary)] pl-6 italic text-[var(--foreground)] my-6 font-normal">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-[var(--muted)] px-2 py-1 rounded text-sm font-mono text-[var(--foreground)] border border-[var(--border)]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-[var(--muted)] border border-[var(--border)] p-4 rounded-lg overflow-x-auto my-6">
                <code className="text-sm font-mono text-[var(--foreground)]">
                  {children}
                </code>
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      );
    } else {
      // Render as formatted plain text
      return (
        <div className="text-[var(--foreground)] leading-relaxed space-y-4 font-normal">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-[var(--foreground)] font-normal">
              {paragraph.split('\n').map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < paragraph.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      );
    }
  };

  // Calculate reading time based on word count
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="animate-pulse text-[var(--foreground)]">Loading article...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-red-500 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );

  if (!blogPost) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );

  const readingTime = calculateReadingTime(blogPost.description);

  return (
    <main className="min-h-screen relative bg-[var(--background)]">
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>

        {/* Hero Section with Image */}
        <div className="mb-12">
          {blogPost.image && (
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

            {/* Title and Meta */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
                {blogPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(blogPost.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 md:p-12 shadow-sm">
                {renderContent(blogPost.description)}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Tag size={18} />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Link */}
              {blogPost.link && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <ExternalLink size={18} />
                    External Link
                  </h3>
                  <a
                    href={blogPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                  >
                    View Original
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {/* Reading Stats */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Reading Stats
                </h3>
                <div className="space-y-3 text-[var(--muted-foreground)]">
                  <div className="flex justify-between">
                    <span>Words:</span>
                    <span>{blogPost.description.trim().split(/\s+/).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading Time:</span>
                    <span>{readingTime} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Published:</span>
                    <span>{new Date(blogPost.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}