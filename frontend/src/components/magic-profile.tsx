"use client";



import React, { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

// --- The Core Section Component ---
function MagicProfile() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-6 md:p-20 overflow-hidden relative"
    >
      {/* Injecting Fonts directly for this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 font-inter">

        {/* Left Side: Text Content */}
        <div className="relative">
          <ContentSide />
        </div>

        {/* Right Side: The Magic Interaction */}
        <MagicCard />
      </div>
    </section>
  );
}

// --- Sub-Component: The Text Content ---
function ContentSide() {
  return (
    <div className="space-y-10 z-10 animate-fade-in-up pl-4">
      <div className="space-y-6">
        <p className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase flex items-center gap-3">
          KNOW ABOUT ME
        </p>

        {/* Updated Typography to match image */}
        <h1 className="text-6xl md:text-8xl font-playfair text-[var(--foreground)] leading-[0.9] tracking-tight">
          AI & Machine Learning Engineer and Cloude enthusiastic
        </h1>
      </div>

      <p className="text-[var(--muted-foreground)] leading-relaxed max-w-lg text-lg font-light">
        I'm Om Choksi — an AI & Machine Learning engineer focused on building deployable, production-ready intelligence systems. I specialize in transforming raw datasets into scalable ML products through end-to-end engineering.
      </p>

      <div className="flex gap-6 text-[var(--muted-foreground)] pt-2">
        <SocialLink icon={<Linkedin size={22} />} href="https://linkedin.com/in/omchoksi" />
        <SocialLink icon={<Github size={22} />} href="https://github.com/omchoksi108" />
        <SocialLink icon={<span className="text-sm font-bold">K</span>} href="https://kaggle.com/omchoksi04" />
        <SocialLink icon={<Twitter size={22} />} href="https://x.com/ChoksiOm" />
      </div>

      <div className="flex items-center gap-4 text-sm font-semibold text-[var(--foreground)] cursor-pointer group w-max pt-4">
        <span className="border-b border-[var(--border)] pb-1 group-hover:border-[var(--foreground)] transition-colors">
          Work Experience
        </span>
        <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all duration-300 transform group-hover:rotate-[-45deg]">
             <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="hover:text-[var(--foreground)] transition-colors duration-300"
    >
      {icon}
    </a>
  );
}

// --- Sub-Component: The Magic Card & Wand ---
function MagicCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  // Mouse coordinates relative to the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics for the wand movement (Heavier feel for a longer stick)
  const springConfig = { damping: 50, stiffness: 300, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full max-w-[550px] aspect-square mx-auto group"
      style={{ cursor: "none" }}
    >
      {/* LAYER 1: The Base (Logo) - Always Visible */}
      <div className="absolute inset-0 bg-secondary rounded-[2.5rem] overflow-hidden flex items-center justify-center shadow-2xl border border-border-light">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
        </div>

        {/* Logo Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img
            src="/images/omchoksi.jpg"
            alt="Om Choksi"
            className="w-3/4 h-3/4 object-cover rounded-2xl opacity-80 select-none pointer-events-none"
          />
        </div>
      </div>

      {/* LAYER 2: The Reveal (Profile Photo) */}
      <motion.div
        className="absolute inset-0 bg-secondary-light rounded-[2.5rem] overflow-hidden flex items-center justify-center z-20 pointer-events-none"
        style={{
          // The Magic Mask: Shows full image when wand is over the card
          maskImage: isHovering ? 'linear-gradient(to right, white 0%, white 100%)' : 'linear-gradient(to right, transparent 0%, transparent 100%)',
          WebkitMaskImage: isHovering ? 'linear-gradient(to right, white 0%, white 100%)' : 'linear-gradient(to right, transparent 0%, transparent 100%)',
        }}
      >
        <div className="relative w-full h-full bg-primary">
            <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover pointer-events-none select-none scale-110"
            />
             {/* Theme-aware Tint Overlay */}
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none"></div>
        </div>
      </motion.div>

      {/* LAYER 3: The Long Wand */}
      <motion.div
        className="absolute z-50 pointer-events-none top-0 left-0"
        style={{
          x: smoothX,
          y: smoothY,
          // Subtle tilt based on movement
          rotate: useTransform(smoothX, [0, 500], [-5, 5]),
          // Only show wand when hovering
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
      >
        {/* Wand Container - Positioned precisely at mouse location */}
        <div className="relative w-16 h-[400px] origin-bottom transition-transform duration-75">

           {/* Wand Shadow */}
           <div className="absolute top-10 left-10 w-full h-full bg-black/20 blur-xl rounded-full"></div>

           {/* The Stick Itself */}
           <div className="w-full h-full relative">

             {/* 1. The White Tip (The "Light" Source) - At the top */}
             <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-full shadow-[0_0_50px_rgba(255,255,255,0.8)] z-20 border-x border-t border-white">
                {/* Highlight */}
                <div className="absolute top-4 left-3 w-4 h-16 bg-white rounded-full blur-[2px] opacity-80"></div>
             </div>

             {/* 2. The Two-Part Body */}
             {/* Upper Part: Bright White */}
             <div className="absolute top-28 left-1 right-1 bottom-1/2 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-full z-10 shadow-lg border-l border-r border-white/50">
                {/* Texture overlay */}
                <div className="absolute inset-0 bg-noise opacity-5"></div>
                {/* Specular highlight */}
                <div className="absolute top-0 left-2 w-2 h-full bg-gradient-to-b from-gray-200 to-transparent opacity-40 blur-[1px]"></div>
             </div>

             {/* Lower Part: Dark Brownish */}
             <div className="absolute top-1/2 left-1 right-1 bottom-0 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 rounded-b-full z-10 shadow-2xl border-l border-r border-amber-900/50">
                {/* Wood texture overlay */}
                <div className="absolute inset-0 bg-noise opacity-15"></div>
                {/* Specular highlight running down */}
                <div className="absolute bottom-0 left-2 w-2 h-full bg-gradient-to-t from-amber-700 to-transparent opacity-40 blur-[1px]"></div>
             </div>

             {/* 3. The Connector Ring */}
             <div className="absolute top-28 left-0 right-0 h-1 bg-amber-800 z-30 shadow-md border-t border-amber-700"></div>

           </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MagicProfile;