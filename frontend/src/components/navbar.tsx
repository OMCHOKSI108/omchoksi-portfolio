"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, ChevronDown, Command, ArrowRight, Github, Twitter, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import CommandMenu from "@/components/command-menu";

export default function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? `relative px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${theme === 'dark' ? 'text-black bg-white' : 'text-white bg-black'
      }`
      : `relative px-5 py-2.5 rounded-full text-sm font-medium transition-all ${theme === 'dark'
        ? 'text-zinc-300 hover:text-white hover:bg-white/5'
        : 'text-zinc-600 hover:text-black hover:bg-black/5'
      }`;
  };

  const navbarBgClass = theme === 'dark'
    ? 'bg-zinc-950/90 border-zinc-800 ring-white/5'
    : 'bg-white/90 border-zinc-200 ring-black/5';

  const mobileMenuBgClass = theme === 'dark'
    ? 'bg-zinc-950/95 border-zinc-800'
    : 'bg-white/95 border-zinc-200';

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-50 pt-6 flex justify-center items-start w-full pointer-events-none"
      >
        {/* Centered Pill Navbar */}
        <div className={`pointer-events-auto flex items-center p-1.5 gap-1 rounded-full backdrop-blur-md border shadow-lg ring-1 transition-colors duration-300 ${navbarBgClass}`}>
          {/* Desktop Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-1">
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
              <button className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${theme === 'dark'
                ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                : 'text-zinc-600 hover:text-black hover:bg-black/5'
                }`}>
                More <ChevronDown size={14} />
              </button>
              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 mt-2 w-48 rounded-2xl backdrop-blur-3xl border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right overflow-hidden z-50 ${theme === 'dark'
                ? 'bg-neutral-900/90 border-white/10'
                : 'bg-white/90 border-black/5'
                }`}>
                <Link href="/stack" className={`block px-4 py-3 text-sm transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
                  Tech Stack
                </Link>
                <Link href="/certifications" className={`block px-4 py-3 text-sm transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
                  Certifications
                </Link>
                <Link href="/links" className={`block px-4 py-3 text-sm transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
                  Links
                </Link>
                <a href="https://drive.google.com/file/d/1vZFyvsRzv17dm6z1uKDXI07Z_gfTHQgC/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={`block px-4 py-3 text-sm transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white hover:bg-white/5' : 'text-zinc-600 hover:text-black hover:bg-black/5'
                  }`}>
                  Resume
                </a>
              </div>
            </div>

            <div className={`w-[1px] h-6 mx-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />

            <button
              onClick={() => {
                if (onContactClick) {
                  onContactClick();
                } else {
                  window.dispatchEvent(new CustomEvent('open-quick-connect'));
                }
              }}
              className={`px-5 py-2 rounded-full border border-transparent font-medium text-sm shadow-sm transition-all hover:scale-105 active:scale-95 ${theme === 'dark'
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-black text-white'
                }`}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2 pl-2">
            <Link href="/" className={`p-2 font-bold text-lg tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              OC
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
                }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`absolute top-24 left-4 right-4 p-4 rounded-3xl backdrop-blur-xl border shadow-2xl flex flex-col gap-2 z-50 md:hidden pointer-events-auto ${mobileMenuBgClass}`}
            >
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Work', href: '/work' },
                { label: 'Blog', href: '/blog' },
                { label: 'Tech Stack', href: '/stack' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${theme === 'dark'
                    ? 'text-white hover:bg-white/5'
                    : 'text-black hover:bg-black/5'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className={`h-[1px] my-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onContactClick) onContactClick();
                  else window.dispatchEvent(new CustomEvent('open-quick-connect'));
                }}
                className={`w-full py-3 rounded-xl font-bold text-center ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
              >
                Book a Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Actions (Search) - Absolute Positioned */}
        <div className="pointer-events-auto absolute right-6 top-6 flex items-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border transition-all ${theme === 'dark'
              ? 'bg-black/20 border-white/5 hover:bg-white/10 text-white'
              : 'bg-white/20 border-black/5 hover:bg-black/5 text-zinc-900'
              }`}
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
