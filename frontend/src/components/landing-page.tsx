import React from 'react';
import { ArrowRight, Moon, Sun, Linkedin, Github, Twitter, X } from 'lucide-react';
import { useTheme } from './theme-provider';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-white/20 selection:text-white">

      {/* Background Abstract Effect */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[100px] bg-gray-800"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-black"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[80px] bg-gray-700"></div>
      </div>

      {/* Grid overlays moved outside the translucent blob container so their opacity is not reduced */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {/* Curved Grid Overlay - visible in light mode */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-1/2 pointer-events-none block dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(1400px 380px at 50% 0%, rgba(0,0,0,0.28), rgba(0,0,0,0) 55%), linear-gradient(rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "cover, 20px 20px, 20px 20px",
            backgroundRepeat: "no-repeat, repeat, repeat",
            opacity: 0.95,
            mixBlendMode: "normal",
          }}
        />

        {/* Curved Grid Overlay - visible in dark mode */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-1/2 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(1400px 380px at 50% 0%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%), linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "cover, 20px 20px, 20px 20px",
            backgroundRepeat: "no-repeat, repeat, repeat",
            opacity: 0.9,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-6 md:px-12">

        {/* Navigation / Header Logo */}
        <header className="py-8 flex justify-center">
          <div className="font-bold text-2xl tracking-tighter flex items-center gap-1 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H7L12 12L17 22H22L12 2Z" />
            </svg>
            <span className="hidden">AB</span>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center mt-12 md:mt-20 mb-20">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            FROM CONCEPT TO <span className="font-bold">CREATION</span>
            <br />
            LET'S MAKE IT <span className="font-bold relative inline-block">
              HAPPEN!
              {/* Spinning Badge */}
              <div className="absolute -top-8 -right-16 md:-top-10 md:-right-24 w-20 h-20 md:w-28 md:h-28 hidden sm:block animate-spin-slow">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 100 100" width="100%" height="100%" className="overflow-visible">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="transparent"
                    />
                    <text fill="currentColor" fontSize="13" fontWeight="bold" letterSpacing="2">
                      <textPath href="#circlePath" startOffset="0%">
                        • OPEN TO WORK • OPEN TO WORK
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <X size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </h1>

          {/* CTA Button */}
          <button className={`group mt-8 flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white/40 border-neutral-300 hover:bg-white/60 shadow-sm'}`}>
            <span className="font-medium">Get In Touch</span>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform group-hover:translate-x-1 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <ArrowRight size={16} />
            </span>
          </button>

          {/* Subtext */}
          <div className="mt-16 max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              I'm available for full-time roles & freelance projects.
            </h2>
            <p className={`text-lg md:text-xl font-light ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
              I thrive on crafting dynamic web applications, and delivering seamless user experiences.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Left Column - Brand */}
            <div className="md:col-span-5 space-y-6">
               <div className="font-bold text-2xl tracking-tighter flex items-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H7L12 12L17 22H22L12 2Z" />
                </svg>
              </div>
              <p className={`max-w-sm text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                I'm Om - an AI & Machine Learning engineer, freelancer & problem solver. Thanks for checking out my site!
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2">
              <h3 className={`text-xs font-semibold tracking-wider uppercase mb-6 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>General</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Projects</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className={`text-xs font-semibold tracking-wider uppercase mb-6 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>Specifics</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:underline">Guest Book</a></li>
                <li><a href="#" className="hover:underline">Bucket List</a></li>
                <li><a href="#" className="hover:underline">Uses</a></li>
                <li><a href="#" className="hover:underline">Attribution</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className={`text-xs font-semibold tracking-wider uppercase mb-6 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>More</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:underline">Book a call</a></li>
                <li><a href="#" className="hover:underline">Links</a></li>
                <li><a href="#" className="hover:underline">RSS</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col-reverse md:flex-row items-center justify-between gap-6">

            {/* Copyright & Legal */}
            <div className={`flex flex-col md:flex-row items-center gap-6 text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
              <span>© 2025 Om Choksi. All rights reserved</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-300">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-300">Terms & Conditions</a>
              </div>
            </div>

            {/* Socials & Theme Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-neutral-800 text-yellow-400' : 'bg-neutral-200 text-neutral-600'}`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

              <a href="#" className={`hover:text-blue-600 transition-colors ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/omchoksi108" className={`hover:text-black dark:hover:text-white transition-colors ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <Github size={20} />
              </a>
              <a href="#" className={`hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}