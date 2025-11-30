"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Mail } from "lucide-react";

export default function Hero() {
  const copyEmail = () => {
    navigator.clipboard.writeText("omchoksi108@gmail.com");
    // Could add toast notification
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      {/* Curved grid overlays — placed above page background but behind content */}
      <div aria-hidden className="absolute left-0 right-0 top-0 h-1/2 pointer-events-none z-0">
        {/* Light theme grid */}
        <div
          className="absolute inset-0 block dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(1000px 260px at 50% 0%, rgba(0,0,0,0.22), rgba(0,0,0,0) 50%), linear-gradient(rgba(0,0,0,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.14) 1px, transparent 1px)",
            backgroundSize: "cover, 18px 18px, 18px 18px",
            backgroundRepeat: "no-repeat, repeat, repeat",
            opacity: 0.95,
          }}
        />

        {/* Dark theme grid */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(1000px 260px at 50% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0) 50%), linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "cover, 18px 18px, 18px 18px",
            backgroundRepeat: "no-repeat, repeat, repeat",
            opacity: 0.9,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="mb-8"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Upcoming: NextNode is launching soon!
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-[var(--foreground)]">
            I help founders turn ideas into seamless <span className="font-serif-italic text-primary">digital experiences</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Hello, I'm Om Choksi</h2>
          <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            Available
          </span>
          </div>
          <p className="text-lg text-[var(--muted-foreground)]">A Full Stack Developer</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-[var(--muted-foreground)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Surat, India
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-medium hover:from-[var(--primary)]/80 hover:to-[var(--primary)]/80 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg">
            Let's Connect
            <ArrowRight size={20} />
          </button>
          <button
            onClick={copyEmail}
            className="border border-[var(--border)] px-8 py-4 rounded-full font-medium hover:bg-[var(--muted)] transition-colors flex items-center justify-center gap-2 text-[var(--foreground)]"
          >
            <Mail size={20} />
            omchoksi108@gmail.com
            <Copy size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}