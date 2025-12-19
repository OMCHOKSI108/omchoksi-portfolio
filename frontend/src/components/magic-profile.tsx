"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// --- The Core Section Component ---
function MagicProfile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const [reveal, setReveal] = useState(false); // true when wand is close to card
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  // Mouse coordinates for the whole section so the wand can float over the text side
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slower, heavier spring for a languid wand motion
  const springConfig = { damping: 40, stiffness: 90, mass: 1.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotate = useTransform(smoothX, [0, 1200], [-8, 8]);

  // Proximity-based reveal: when the wand is near the card, open curtains after a short delay
  useEffect(() => {
    if (!cardRef.current || !sectionRef.current) return;
    let openTimer: number | undefined;
    let closeTimer: number | undefined;
    const threshold = 120; // px

    const check = () => {
      // Defensive: refs may be null during mount/unmount; bail out if not available
      if (!sectionRef.current || !cardRef.current) return;
      const x = smoothX.get();
      const y = smoothY.get();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const cardCenterX = cardRect.left - sectionRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top - sectionRect.top + cardRect.height / 2;
      const dx = x - cardCenterX;
      const dy = y - cardCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < threshold) {
        window.clearTimeout(closeTimer);
        if (!reveal) openTimer = window.setTimeout(() => setReveal(true), 180);
      } else {
        window.clearTimeout(openTimer);
        if (reveal) closeTimer = window.setTimeout(() => setReveal(false), 120);
      }
    };

    const unsubX = smoothX.onChange(check);
    const unsubY = smoothY.onChange(check);

    return () => {
      unsubX();
      unsubY();
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, [smoothX, smoothY, reveal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Set raw client coordinates relative to section; we'll position the wand
    // using left/top + translate(-50%, -100%) so the wand's bottom-center
    // maps exactly to the pointer location.
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="min-h-screen flex items-center justify-center p-6 md:p-20 overflow-hidden relative"
    >
      {/* Injecting Fonts directly for this component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        /* Curtain animation + decorative background */
        .curtain-stage { position: absolute; inset: 0; z-index: 30; pointer-events: none; }
        .curtain-left, .curtain-right { position: absolute; top: 0; bottom: 0; width: 52%; background: linear-gradient(120deg,#6b21a8,#4c1d95); transform: translateY(0%); transition: transform 850ms cubic-bezier(.2,.9,.2,1); }
        .curtain-left { left: 0; clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%); }
        .curtain-right { right: 0; clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%); }
        .curtain-stage.open .curtain-left, .curtain-stage.open .curtain-right { transform: translateY(-110%); }

        .animated-bg { width:100%; height:100%; background: linear-gradient(120deg,#0f172a,#0b1220); background-size: 200% 200%; animation: bgShift 8s ease-in-out infinite; }
        .reveal-cover { position: absolute; inset: 0; z-index: 10; pointer-events: none; transition: opacity 420ms cubic-bezier(.2,.9,.2,1); }
        @keyframes bgShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        @media (prefers-reduced-motion: reduce) { .curtain-left, .curtain-right, .animated-bg { transition: none; animation: none; } }
        /* Wand glow and sparkles */
        .wand-tip { position: absolute; left: 50%; transform: translateX(-50%); bottom: -8px; pointer-events: none; z-index: 60; }
        .wand-glow { width: 6rem; height: 6rem; border-radius: 9999px; filter: blur(18px); opacity: 0; transform-origin: center; transition: opacity 260ms ease, transform 260ms ease; }
        .wand-sparks { position: absolute; inset: 0; pointer-events: none; }
        .spark { position: absolute; width: 8px; height: 8px; border-radius: 9999px; opacity: 0; transform: translateY(0) scale(0.6); }
        @keyframes sparkUp {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          20% { opacity: 1; transform: translateY(-8px) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(0.2); }
        }
        @media (prefers-reduced-motion: reduce) { .wand-glow, .spark { transition: none; animation: none !important; } }
      `}</style>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 font-inter">

        {/* Left Side: Text Content */}
        <div className="relative">
          <ContentSide />
        </div>

        {/* Right Side: The Magic Interaction */}
        <MagicCard isHovering={reveal} cardRef={cardRef} theme={theme} />
      </div>

      {/* Wand rendered at section level so it can float over both columns (text and card) */}
      <motion.div
        // Use left/top so we can combine with CSS translate to pin the bottom-center
        // of the wand to the pointer location exactly (translate -50% -100%).
        className="absolute z-40 pointer-events-none transform -translate-x-1/2 -translate-y-full"
        style={{ left: smoothX, top: smoothY, rotate, opacity: (isHovering || reveal) ? 1 : 0, scale: (isHovering || reveal) ? 1 : 0.95 }}
        transition={{ opacity: { duration: 0.18 }, scale: { duration: 0.25 } }}
      >
        <div className="relative w-12 h-[340px] origin-bottom">
          <div className="absolute top-10 left-10 w-full h-full bg-black/20 blur-xl rounded-full"></div>

          <div className="w-full h-full relative">
            <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-full shadow-[0_0_50px_rgba(255,255,255,0.8)] z-20 border-x border-t border-white">
              <div className="absolute top-4 left-3 w-4 h-16 bg-white rounded-full blur-[2px] opacity-80"></div>
            </div>

            <div className="absolute top-32 left-1 right-1 bottom-1/2 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-full z-10 shadow-lg border-l border-r border-white/50">
              <div className="absolute inset-0 bg-noise opacity-5"></div>
              <div className="absolute top-0 left-2 w-2 h-full bg-gradient-to-b from-gray-200 to-transparent opacity-40 blur-[1px]"></div>
            </div>

            <div className="absolute top-1/2 left-1 right-1 bottom-0 bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 rounded-b-full z-10 shadow-2xl border-l border-r border-amber-900/50">
              <div className="absolute inset-0 bg-noise opacity-15"></div>
              <div className="absolute bottom-0 left-2 w-2 h-full bg-gradient-to-t from-amber-700 to-transparent opacity-40 blur-[1px]"></div>
            </div>

            <div className="absolute top-32 left-0 right-0 h-1 bg-amber-800 z-30 shadow-md border-t border-amber-700"></div>
          </div>
          {/* Wand tip glow + sparks (positioned so bottom-center of wand aligns with pointer) */}
          <div className="wand-tip" aria-hidden>
            <div
              className="wand-glow"
              style={{
                background: (theme === 'dark') ? 'radial-gradient(circle at 30% 30%, rgba(255,210,80,0.95), rgba(255,140,0,0.55) 30%, rgba(255,140,0,0.08) 60%)' : 'radial-gradient(circle at 30% 30%, rgba(255,240,200,0.95), rgba(255,200,50,0.55) 30%, rgba(255,200,50,0.06) 60%)',
                opacity: (isHovering || reveal) ? 1 : 0,
                transform: (isHovering || reveal) ? 'scale(1)' : 'scale(0.85)'
              }}
            />
            <div className="wand-sparks">
              <span className="spark" style={{ left: '18%', bottom: '28%', background: (theme === 'dark') ? '#ffd580' : '#ffecb3', animation: (isHovering || reveal) ? 'sparkUp 900ms linear 0ms forwards' : 'none' }} />
              <span className="spark" style={{ left: '46%', bottom: '20%', background: (theme === 'dark') ? '#fff1a8' : '#fff3bf', animation: (isHovering || reveal) ? 'sparkUp 1000ms linear 120ms forwards' : 'none' }} />
              <span className="spark" style={{ left: '70%', bottom: '30%', background: (theme === 'dark') ? '#ffcc66' : '#ffd98a', animation: (isHovering || reveal) ? 'sparkUp 820ms linear 60ms forwards' : 'none' }} />
            </div>
          </div>
        </div>
      </motion.div>
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

// --- Sub-Component: The Magic Card & Reveal ---
function MagicCard({ isHovering, cardRef, theme }: { isHovering?: boolean; cardRef?: React.RefObject<HTMLDivElement | null>; theme?: string }) {
  // MagicCard no longer manages wand motion; it accepts isHovering from parent to control reveal mask
  return (
    <div ref={cardRef} className="relative w-full max-w-[550px] aspect-square mx-auto group">
      {/* LAYER 1: The Base (Logo) - Always Visible */}
      <div className="absolute inset-0 bg-secondary rounded-[2.5rem] overflow-hidden flex items-center justify-center shadow-2xl border border-border-light">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
        </div>

        {/* Logo Image or text */}
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
          // The Magic Mask: Shows full image when wand is over the card (driven by parent)
          maskImage: isHovering ? 'linear-gradient(to right, white 0%, white 100%)' : 'linear-gradient(to right, transparent 0%, transparent 100%)',
          WebkitMaskImage: isHovering ? 'linear-gradient(to right, white 0%, white 100%)' : 'linear-gradient(to right, transparent 0%, transparent 100%)',
        }}
      >
        <div className="relative w-full h-full bg-primary overflow-hidden">
          {/* Decorative animated background */}
          {/* Decorative cover that will fade to reveal the base image beneath */}
          <div
            className="reveal-cover"
            style={{ opacity: isHovering ? 0 : 1 }}
            aria-hidden
          >
            <div
              className="animated-bg"
              style={{ background: theme === 'dark' ? 'linear-gradient(120deg,#071033,#0b1220)' : 'linear-gradient(120deg,#eef2ff,#fff7ed)' }}
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
          </div>

          {/* Curtains that slide up on hover (above the cover) */}
          <div className={`curtain-stage ${isHovering ? "open" : ""}`} aria-hidden>
            <div
              className="curtain-left"
              style={{ background: theme === 'dark' ? 'linear-gradient(120deg,#7c3aed,#5b21b6)' : 'linear-gradient(120deg,#fde68a,#f59e0b)' }}
            />
            <div
              className="curtain-right"
              style={{ background: theme === 'dark' ? 'linear-gradient(60deg,#5b21b6,#3b0764)' : 'linear-gradient(60deg,#f97316,#fb923c)' }}
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default MagicProfile;