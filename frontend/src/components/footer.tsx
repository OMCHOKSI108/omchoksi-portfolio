"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "./theme-provider";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="relative bg-[var(--background)] text-[var(--foreground)] pt-20 pb-8 overflow-hidden">

      {/* Background Gradients to match the premium feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.13] dark:opacity-[0.17]">
          <Image
            src="/assets/cta.avif"
            alt="Footer Background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          {/* Gradient masks to blend edges seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-transparent" style={{ height: '30%' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)]" />
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Main CTA Section */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-sans font-bold tracking-tight mb-6"
          >
            FROM CONCEPT TO <span className="opacity-50">CREATION</span>
          </motion.h2>
          <div className="relative inline-block">
            <motion.h2 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-7xl font-sans font-bold tracking-tight mb-8"
            >
              LET'S MAKE IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">HAPPEN!</span>
            </motion.h2>
            {/* Rotating Badge */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -right-8 -top-8 md:-right-24 md:-top-16 w-24 h-24 md:w-32 md:h-32 hidden md:flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[10px] font-bold uppercase fill-[var(--foreground)] tracking-[0.15em]">
                  <textPath href="#curve">
                    Open to work • Open to work • Open to work •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 m-auto w-10 h-10 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 -rotate-45" />
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-quick-connect"))}
              className="group relative inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <span className="font-medium text-lg tracking-wide">Get In Touch</span>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl font-medium mb-1">I'm available for <span className="text-blue-500">full-time roles</span> & <span className="text-purple-500">freelance projects</span>.</p>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-sm">
              I thrive on crafting dynamic web applications, and delivering seamless user experiences.
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[var(--border)] pt-16 pb-12">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tight">OM.</Link>
            <p className="text-[var(--muted-foreground)] max-w-sm leading-relaxed">
              I'm Om - a full-stack developer, freelancer & problem solver. Thanks for checking out my site!
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for work
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">General</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue-500 transition-colors">About</Link></li>
                <li><Link href="/work" className="hover:text-blue-500 transition-colors">Projects</Link></li>
                <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Specifics</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/resources" className="hover:text-blue-500 transition-colors">Resources</Link></li>
                <li><Link href="/bucket-list" className="hover:text-blue-500 transition-colors">Bucket List</Link></li>
                <li><Link href="/uses" className="hover:text-blue-500 transition-colors">Uses</Link></li>
                <li><Link href="/attribution" className="hover:text-blue-500 transition-colors">Attribution</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">More</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => window.dispatchEvent(new CustomEvent("open-quick-connect"))} className="hover:text-blue-500 transition-colors text-left">Contact me</button></li>
                <li><Link href="/links" className="hover:text-blue-500 transition-colors">Links</Link></li>
                <li><Link href="/rss" className="hover:text-blue-500 transition-colors">RSS</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[var(--border)] text-sm text-[var(--muted-foreground)]">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>© 2025 Om Choksi. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-[var(--foreground)] transiton-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[var(--foreground)] transiton-colors">Terms of Use</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="w-px h-4 bg-[var(--border)]" />
            <div className="flex gap-2">
              <a href="https://linkedin.com/in/omchoksi" target="_blank" className="p-2 rounded-full hover:bg-[var(--muted)] hover:text-[#0077b5] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://github.com/omchoksi108" target="_blank" className="p-2 rounded-full hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"><Github className="w-4 h-4" /></a>
              <a href="https://x.com/ChoksiOm" target="_blank" className="p-2 rounded-full hover:bg-[var(--muted)] hover:text-[#1DA1F2] transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
