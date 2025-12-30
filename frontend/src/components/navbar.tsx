"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, ChevronDown, Command, ArrowRight, Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

export default function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper for Link Styles
  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all text-white bg-black dark:bg-white dark:text-black shadow-sm"
      : "relative px-5 py-2.5 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center w-full max-w-[1400px] mx-auto pointer-events-none"
      >
        {/* Logo */}
        <Link
          href="/"
          className="pointer-events-auto relative z-50 text-[var(--foreground)] hover:scale-105 transition-transform"
        >
          <img
            src="/images/omchoksi.jpg"
            alt="Om Choksi"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--border)] ring-offset-2 ring-offset-[var(--background)]"
          />
        </Link>

        {/* Center Dock - Desktop */}
        <div className="pointer-events-auto hidden md:flex items-center p-1.5 gap-1 rounded-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-xl dark:shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
          <Link href="/" className={getLinkStyles("/")}>
            Home
          </Link>
          <Link href="/about" className={getLinkStyles("/about")}>
            About
          </Link>
          <Link href="/work" className={getLinkStyles("/work")}>
            Work
          </Link>
          <Link href="/blog" className={getLinkStyles("/blog")}>
            Blog
          </Link>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="relative px-5 py-2.5 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1">
              More <ChevronDown size={14} />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right overflow-hidden z-50">
              <Link href="/stack" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Tech Stack
              </Link>
              <Link href="/certifications" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Certifications
              </Link>
              <Link href="/links" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Links
              </Link>
              <Link href="/resume" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Resume
              </Link>
            </div>
          </div>

          <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10 mx-1" />

          <button
            onClick={() => {
              if (onContactClick) {
                onContactClick();
              } else {
                window.dispatchEvent(new CustomEvent('open-quick-connect'));
              }
            }}
            className="px-6 py-2.5 rounded-full bg-black dark:bg-white border border-transparent text-white dark:text-black font-bold shadow-md hover:opacity-80 transition-all hover:scale-105 active:scale-95"
          >
            Book a Call
          </button>
        </div>

        {/* Right Actions */}
        <div className="pointer-events-auto flex items-center justify-end">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 dark:bg-[var(--card)]/80 backdrop-blur-xl border border-black/5 dark:border-[var(--border)] hover:bg-black/5 dark:hover:bg-[var(--muted)] transition-all shadow-sm text-zinc-900 dark:text-[var(--foreground)]"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <span className="text-base font-semibold">⌘</span>
          </button>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className="absolute inset-0 bg-[var(--background)]/40 backdrop-blur-sm transition-opacity" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-[var(--card)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="flex items-center px-4 py-4 border-b border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search pages, projects, blogs..."
                  className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none font-medium"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-[var(--foreground)]" />
                    ) : (
                      <Moon className="w-4 h-4 text-[var(--foreground)]" />
                    )}
                  </button>
                  <span className="text-[10px] font-bold text-[var(--muted-foreground)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                    ESC
                  </span>
                </div>
              </div>

              {/* Search Content */}
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                <div className="px-2 py-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Pages
                </div>
                {[
                  { title: "Home", href: "/", desc: "Back to landing page" },
                  { title: "About", href: "/about", desc: "My background & story" },
                  { title: "Work", href: "/work", desc: "Featured projects showcase" },
                  { title: "Blog", href: "/blog", desc: "Latest articles & insights" },
                  { title: "Tech Stack", href: "/stack", desc: "Technologies I use" },
                  { title: "Certifications", href: "/certifications", desc: "My certifications & achievements" },
                  { title: "Attribution", href: "/attribution", desc: "Credits & inspiration" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--foreground)]">{item.title}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{item.desc}</div>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Jump to
                    </span>
                  </Link>
                ))}

                <div className="px-2 py-2 mt-4 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Resources
                </div>
                {[
                  { title: "Resume", href: "https://drive.google.com/file/d/1TJjCk-HImfvgH-v8vygzeWan1mB8RGB-/view?usp=sharing", desc: "Download my resume", external: true },
                  { title: "GitHub", href: "https://github.com/OMCHOKSI108", desc: "View my code repositories", external: true },
                  { title: "LinkedIn", href: "https://www.linkedin.com/in/omchoksi/", desc: "Connect with me", external: true },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--foreground)]">{item.title}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{item.desc}</div>
                      </div>
                    </div>
                    {item.external && (
                      <span className="text-xs text-[var(--muted-foreground)]">↗</span>
                    )}
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-[var(--muted)] border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--muted-foreground)]">
                <div className="flex gap-4">
                  <a href="https://x.com/ChoksiOm" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[var(--foreground)] transition-colors">
                    <Twitter className="w-3.5 h-3.5 mr-1.5" />
                    Twitter
                  </a>
                  <a href="https://github.com/OMCHOKSI108" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[var(--foreground)] transition-colors">
                    <Github className="w-3.5 h-3.5 mr-1.5" />
                    GitHub
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Command className="w-3 h-3" />
                  <span>⌘K to search</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}