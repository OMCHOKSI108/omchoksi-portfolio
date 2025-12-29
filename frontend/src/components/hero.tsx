"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Mail } from "lucide-react";
import GalaxyBackground from "@/components/galaxy-background";

export default function Hero() {
  const copyEmail = () => {
    navigator.clipboard.writeText("omchoksi108@gmail.com");
    // Could add toast notification
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <GalaxyBackground />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
            <span className="bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">Upcoming</span>
            <span>NextNode is launching soon!</span>
            <ArrowRight size={12} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[var(--foreground)] leading-[1.1] md:leading-[1.2] mb-6 tracking-tight">
            I help founders turn ideas into <br className="hidden md:block" />
            seamless <span className="italic font-light text-[var(--foreground)]">digital experiences</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-base md:text-lg text-[var(--muted-foreground)]">
            <span>Hello, I'm Om Choksi</span>
            <div className="relative w-12 h-8 mx-2">
              {/* Stacked Avatars Mockup */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[var(--background)] bg-gray-200 z-10 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Om+Choksi&background=random" alt="Om" className="w-full h-full object-cover" />
              </div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-[var(--background)] bg-blue-100 z-0 flex items-center justify-center text-[10px]">
                💻
              </div>
            </div>
            <span>a Full Stack Developer</span>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-quick-connect'))}
            className="group relative inline-flex items-center gap-4 pl-8 pr-2 py-2 rounded-full bg-[var(--foreground)]/5 border border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/10 text-[var(--foreground)] font-medium transition-all duration-300"
          >
            <span className="text-lg">Let's Connect</span>
            <span className="w-10 h-10 bg-[var(--foreground)] text-[var(--background)] rounded-full flex items-center justify-center transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight size={18} />
            </span>
          </button>

          <button
            onClick={copyEmail}
            className="flex items-center gap-3 text-[var(--foreground)] font-medium hover:opacity-70 transition-opacity"
          >
            <Mail size={20} />
            omchoksi108@gmail.com
          </button>
        </motion.div>
      </div>
    </section>
  );
}