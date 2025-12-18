"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import FloatingElements from "@/components/floating-elements";
import {
  Github,
  Linkedin,
  Twitter,
  Send,
  Book,
  Globe,
  Mail,
  ExternalLink,
  BookOpen,
  ArrowUpRight
} from "lucide-react";

// --- Link Data ---
const LINKS = [
  { id: 1, title: "LinkedIn", url: "https://linkedin.com/in/omchoksi", icon: Linkedin },
  { id: 2, title: "Telegram", url: "https://t.me/om_395", icon: Send },
  { id: 3, title: "GitHub", url: "https://github.com/omchoksi108", icon: Github },
  { id: 4, title: "X (Twitter)", url: "https://x.com/ChoksiOm", icon: Twitter },
  { id: 5, title: "Kaggle", url: "https://kaggle.com/omchoksi04", icon: BookOpen },
];

const BADGES = [
  { text: "AI & ML Engineer", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { text: "Problem Solver", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
  { text: "Tech Enthusiast", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
];

export default function Links() {
  return (
    <>
      <FloatingElements />
      <Navbar />
      {/* MAIN CONTAINER */}
      <section className="relative w-full min-h-screen py-20 bg-[var(--background)] font-sans text-[var(--foreground)] flex flex-col items-center">

        {/* Inject Fonts */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          .font-serif-display { font-family: 'Playfair Display', serif; }
        `}} />

        {/* Background Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="w-full max-w-xl px-6 relative z-10 flex flex-col items-center space-y-8">

          {/* --- Header Section --- */}
            <div className="flex flex-col items-center text-center space-y-4">

              {/* Avatar - larger, framed, and tactile */}
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-2xl transform-gpu hover:scale-102 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--background)] bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-5xl sm:text-6xl font-extrabold drop-shadow-md select-none">OC</span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/20 dark:ring-black/30" />
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)]">
                Om Choksi
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2">
                  {BADGES.map((badge) => (
                      <span
                          key={badge.text}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
                      >
                          {badge.text}
                      </span>
                  ))}
              </div>

              {/* Main Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {/* Portfolio Button */}
                  <a
                      href="/"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg"
                  >
                      Portfolio <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Email Button */}
                  <a
                      href="mailto:omchoksi99@gmail.com"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[var(--muted)] text-[var(--foreground)] rounded-full text-sm font-medium hover:bg-[var(--muted)]/80 transition-colors"
                  >
                      omchoksi99@gmail.com <ArrowUpRight className="w-3 h-3" />
                  </a>
              </div>
          </div>

          {/* --- Links Stack --- */}
          <div className="w-full flex flex-col gap-3">
              {LINKS.map((link) => (
                  <motion.a
                      key={link.id}
                      href={link.url}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center justify-center w-full px-6 py-4 bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)]/20 hover:border-[var(--primary)]/30 rounded-xl transition-all shadow-sm"
                  >
                      {/* Icon (Left aligned absolute) */}
                      <div className="absolute left-6 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors">
                          <link.icon className="w-5 h-5" />
                      </div>

                      {/* Text (Centered) */}
                      <span className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                          {link.title}
                      </span>
                  </motion.a>
              ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[var(--muted)]/20 border-t border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-[var(--muted-foreground)]">
                <span>Made with ❤️ and ☕ by Om Choksi</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/omchoksi108"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/omchoksi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/ChoksiOm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} Om Choksi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}