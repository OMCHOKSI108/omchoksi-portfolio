"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useRef } from "react";

// Rotating Badge Component
const RotatingBadge = () => (
  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="w-full h-full absolute inset-0"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <circle cx="50" cy="50" r="38" fill="black" />
        <text className="text-[10px] font-bold fill-white uppercase tracking-widest">
          <textPath href="#circlePath" startOffset="0%">
             • Open To Work • Open To Work • Open To Work
          </textPath>
        </text>
      </svg>
    </motion.div>
    {/* Center Star Icon */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white"/>
       </svg>
    </div>
  </div>
);

export default function ContactFooter() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for the left-right animation effect
  const firstLineX = useTransform(scrollYProgress, [0, 0.5], [-200, 0]);
  const secondLineX = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <footer className="relative w-full min-h-screen text-[var(--foreground)] overflow-hidden font-sans flex flex-col justify-between">
      
      {/* --- Background Image --- */}
      {/* Using cta.avif as a subtle texture background with professional blur gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/assets/cta.avif" 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-5" 
        />
        
        {/* Professional blur gradients for theme-appropriate effect */}
        {/* Top blur gradient - stronger blur at top */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[var(--background)]/60 via-[var(--background)]/20 to-transparent backdrop-blur-sm" />
        
        {/* Middle clear area - less blur */}
        <div className="absolute top-1/3 bottom-1/3 left-0 right-0 bg-gradient-to-b from-transparent via-[var(--background)]/5 to-transparent" />
        
        {/* Bottom blur gradient - stronger blur at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--background)]/60 via-[var(--background)]/20 to-transparent backdrop-blur-sm" />
        
        {/* Overall subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/10 to-[var(--muted)]/20" />
        
        {/* Additional top gradient for seamless blend */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--muted)]/40 to-transparent" />
      </div>

      {/* --- Main CTA Section --- */}
      <div ref={containerRef} className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 text-center flex-grow flex flex-col justify-center items-center">
        
        {/* Top Logo Icon */}
        <div className="mb-12">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                <path d="M12 2L2 22h20L12 2zm0 3l7.5 15h-15L12 5z"/>
                <path d="M12 14l-2.5 5h5L12 14z"/>
            </svg>
        </div>

        {/* Headlines with Left-Right Scroll Animation */}
        <motion.div
          style={{ scale, opacity }}
          className="relative"
        >
          <motion.h2 
              style={{ x: firstLineX }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--muted-foreground)] uppercase mb-2"
          >
              From Concept to Creation
          </motion.h2>

          <div className="relative inline-block mb-12">
               <motion.h2 
                  style={{ x: secondLineX }}
                  className="text-4xl md:text-6xl font-black tracking-tight text-[var(--foreground)] uppercase"
               >
                  Let's Make it Happen!
               </motion.h2>

               {/* Floating Badge */}
               <div className="absolute -top-8 -right-16 md:-right-32 hidden sm:block">
                  <RotatingBadge />
               </div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-[var(--muted)] hover:bg-[var(--secondary)] rounded-full text-[var(--foreground)] font-medium transition-colors mb-16 shadow-sm"
        >
            <span>Get In Touch</span>
            <div className="bg-white rounded-full p-1">
                <ArrowRight className="w-4 h-4 text-gray-900" />
            </div>
        </motion.button>

        {/* Status Text */}
        <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">
                I'm available for full-time roles & freelance projects.
            </h3>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
                I thrive on crafting dynamic web applications, and delivering seamless user experiences.
            </p>
        </div>
      </div>

      {/* --- Footer Grid Section --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 pt-20">
        {/* Animated Divider Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mb-20 origin-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
            
            {/* Column 1: Brand (Span 4) */}
            <div className="md:col-span-5 space-y-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white mb-4">
                    <path d="M12 2L2 22h20L12 2zm0 3l7.5 15h-15L12 5z"/>
                </svg>
                <p className="text-sm text-[var(--muted-foreground)] max-w-xs leading-relaxed">
                    I'm Om - an AI & Machine Learning engineer, freelancer & problem solver. Thanks for checking out my site!
                </p>
            </div>

            {/* Column 2: General */}
            <div className="md:col-span-2 space-y-6">
                <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">General</h4>
                <ul className="space-y-3 text-sm font-medium text-[var(--foreground)]">
                    <li><a href="/" className="hover:text-[var(--primary)] transition-colors">Home</a></li>
                    <li><a href="/about" className="hover:text-[var(--primary)] transition-colors">About</a></li>
                    <li><a href="/work" className="hover:text-[var(--primary)] transition-colors">work</a></li>
                    <li><a href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</a></li>
                </ul>
            </div>

            {/* Column 3: Specifics */}
            <div className="md:col-span-3 space-y-6">
                <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Specifics</h4>
                <ul className="space-y-3 text-sm font-medium text-[var(--foreground)]">
                    <li><a href="/guest-book" className="hover:text-[var(--primary)] transition-colors">Guest Book</a></li>
                    <li><a href="/bucket-list" className="hover:text-[var(--primary)] transition-colors">Bucket List</a></li>
                    <li><a href="/uses" className="hover:text-[var(--primary)] transition-colors">Uses</a></li>
                    <li><a href="/attribution" className="hover:text-[var(--primary)] transition-colors">Attribution</a></li>
                </ul>
            </div>

            {/* Column 4: More */}
            <div className="md:col-span-2 space-y-6">
                <h4 className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest">More</h4>
                <ul className="space-y-3 text-sm font-medium text-[var(--foreground)]">
                    <li><a href="/book" className="hover:text-[var(--primary)] transition-colors">Book a call</a></li>
                    <li><a href="/links" className="hover:text-[var(--primary)] transition-colors">Links</a></li>
                    <li><a href="/rss" className="hover:text-[var(--primary)] transition-colors">RSS</a></li>
                </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-[var(--muted-foreground)] gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <span>© 2025 Om Choksi. All rights reserved</span>
                <div className="flex gap-6">
                    <a href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms & Conditions</a>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors">
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="w-px h-4 bg-[var(--border)]"></div>
                <a href="https://linkedin.com/in/omchoksi" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="https://github.com/omchoksi108" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"><Github className="w-4 h-4" /></a>
                <a href="https://x.com/ChoksiOm" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
}