"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useRef } from "react";

/* ---------------- ROTATING BADGE ---------------- */
const RotatingBadge = () => (
  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>

        <circle cx="50" cy="50" r="38" fill="var(--primary)" opacity="0.9" />

        <text
          className="text-[10px] font-bold uppercase tracking-widest"
          fill="white"
        >
          <textPath href="#circlePath">
            • Open To Work • Open To Work • Open To Work
          </textPath>
        </text>
      </svg>
    </motion.div>

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-[var(--primary-foreground)]"
      >
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
  </div>
);

/* ---------------- MAIN FOOTER ---------------- */
export default function ContactFooter() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Removed scroll-driven animations

  // Use viewport-triggered animations instead of scroll-driven springs

  return (
    <footer className="relative min-h-screen flex flex-col justify-between overflow-hidden text-[var(--foreground)]">
      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/cta.avif"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/70 via-transparent to-[var(--background)]/70 backdrop-blur-sm" />
      </div>

      {/* ---------- CTA SECTION ---------- */}
      <div
        ref={containerRef}
        className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-120px" }}
        >
          <motion.h2
            initial={{ x: -140, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-medium uppercase text-[var(--muted-foreground)] mb-2"
          >
            From Concept to Creation
          </motion.h2>

          <div className="relative inline-block mb-12">
            <motion.h2
              initial={{ x: 140, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-black uppercase text-[var(--foreground)]"
            >
              Let’s Make it Happen!
            </motion.h2>

            <div className="absolute -top-8 -right-20 md:-right-32 hidden sm:block">
              <RotatingBadge />
            </div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-quick-connect"))
          }
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--muted)] hover:bg-[var(--secondary)] transition-colors shadow-sm mb-16"
        >
          <span>Get In Touch</span>
          <span className="bg-white rounded-full p-1">
            <ArrowRight className="w-4 h-4 text-gray-900" />
          </span>
        </motion.button>

        <h3 className="text-xl md:text-2xl font-bold mb-2">
          I’m available for full-time & freelance work.
        </h3>
        <p className="text-[var(--muted-foreground)] max-w-md">
          I build performant, scalable web experiences with clean architecture.
        </p>
      </div>

      {/* ---------- FOOTER BAR ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--muted-foreground)]">
          <span>© 2025 Om Choksi. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--muted)]"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <a
              href="https://linkedin.com/in/omchoksi"
              target="_blank"
              className="p-2 rounded-full hover:bg-[var(--muted)]"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/omchoksi108"
              target="_blank"
              className="p-2 rounded-full hover:bg-[var(--muted)]"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/ChoksiOm"
              target="_blank"
              className="p-2 rounded-full hover:bg-[var(--muted)]"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
