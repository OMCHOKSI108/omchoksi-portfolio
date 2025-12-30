"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, ChevronDown, Command, ArrowRight, Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import CommandMenu from "@/components/command-menu";

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
      : "relative px-5 py-2.5 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-50 pt-6 flex justify-center items-start w-full pointer-events-none"
      >
        {/* Centered Pill Navbar */}
        <div className="pointer-events-auto flex items-center p-1.5 gap-1 rounded-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
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
            <button className="relative px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1">
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
              <a href="https://drive.google.com/file/d/1TJjCk-HImfvgH-v8vygzeWan1mB8RGB-/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Resume
              </a>
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
            className="px-5 py-2 rounded-full bg-black dark:bg-white dark:hover:bg-zinc-200 border border-transparent text-white dark:text-black font-medium text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            Book a Call
          </button>
        </div>

        {/* Right Actions (Search) - Absolute Positioned */}
        <div className="pointer-events-auto absolute right-6 top-6 flex items-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-zinc-900 dark:text-white"
            aria-label="Search"
            title="Search (⌘K)"
          >
            <span className="text-lg font-medium">⌘</span>
          </button>
        </div>
      </motion.nav>

      <CommandMenu isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
}
