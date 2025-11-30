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
      ? "relative px-4 py-2 rounded-full text-sm font-medium transition-all text-[var(--foreground)] bg-[var(--card)] shadow-sm"
      : "relative px-4 py-2 rounded-full text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all";
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
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>

        {/* Center Dock - Desktop */}
        <div className="pointer-events-auto hidden md:flex items-center p-1.5 gap-1 rounded-full bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] shadow-lg">
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

          {/* "More" Dropdown */}
          <div className="relative group px-4 py-2 cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm font-medium flex items-center gap-1 transition-all">
            More <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
            
            {/* Dropdown Content */}
            <div className="absolute top-full right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right translate-y-2 group-hover:translate-y-0">
              <div className="bg-[var(--card)] rounded-xl shadow-xl border border-[var(--border)] p-1.5 overflow-hidden">
                <Link href="/stack" className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-[var(--muted)] text-sm transition-colors text-left text-[var(--foreground)]">
                  Tech Stack
                </Link>
              </div>
            </div>
          </div>

          <div className="w-px h-5 bg-[var(--border)] mx-2"></div>

          <button 
            onClick={onContactClick}
            className="px-5 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/80 text-sm font-medium transition-all shadow-lg hover:shadow-xl active:scale-95" 
          >
            Book a Call
          </button>
        </div>

        {/* Right Actions */}
        <div className="pointer-events-auto flex items-center justify-end gap-3 w-[80px]">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-[var(--muted)] transition-colors group"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[var(--foreground)]" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--foreground)]" />
            )}
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-full hover:bg-[var(--muted)] transition-colors group"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-[var(--foreground)]" />
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
                  placeholder="Search pages, projects..."
                  className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none font-medium"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--muted-foreground)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                    ESC
                  </span>
                </div>
              </div>

              {/* Search Content */}
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                <div className="px-2 py-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Quick Links
                </div>
                
                {[
                    { title: "Home", href: "/", desc: "Back to landing page" },
                    { title: "Work", href: "/work", desc: "My selected projects" },
                    { title: "View All Projects", href: "/view-all-projects", desc: "Complete project portfolio" },
                    { title: "About", href: "/about", desc: "My background & story" },
                    { title: "Blog", href: "/blog", desc: "Latest articles" }
                ].map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
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
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-[var(--muted)] border-t border-[var(--border)] flex justify-between items-center text-xs text-[var(--muted-foreground)]">
                <div className="flex gap-4">
                    <a href="#" className="flex items-center hover:text-[var(--foreground)] transition-colors">
                        <Twitter className="w-3.5 h-3.5 mr-1.5" />
                        Twitter
                    </a>
                    <a href="#" className="flex items-center hover:text-[var(--foreground)] transition-colors">
                        <Github className="w-3.5 h-3.5 mr-1.5" />
                        GitHub
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <Command className="w-3 h-3" />
                    <span>Search by command</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}