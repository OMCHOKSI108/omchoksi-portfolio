"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { techIcons } from "@/data/techIcons";

export default function SecretSauce() {
  const [sectionProgress, setSectionProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on section position in viewport
      // 0 when section just enters from bottom, 1 when centered, 2 when just exits top
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const viewportCenter = windowHeight / 2;

      // Progress from -1 (below viewport) to 1 (above viewport), with 0 at center
      const progress = (viewportCenter - sectionCenter) / (windowHeight / 2);
      const clampedProgress = Math.max(-1, Math.min(1, progress));

      setSectionProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initially
    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Wheel rotation: faster rotation, 720 degrees total
  const wheelRotation = sectionProgress * 720;

  return (
    <section ref={sectionRef} className="py-32 text-center overflow-hidden">
      {/* Rotating Wheel Image */}
      <div className="flex justify-center mb-12">
        <motion.img
          src="/assets/steel-flower.webp"
          alt="Skills Wheel"
          className="w-[320px] md:w-[420px] object-contain"
          style={{
            rotate: wheelRotation,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>

      {/* Title */}
      <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">My Skills</p>
      <h2 className="text-5xl md:text-6xl font-serif text-foreground mt-3 mb-8">
        The Secret{" "}
        <span className="italic bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-accent)' }}>Sauce</span>
      </h2>

      {/* Centered Skills Grid - 4 Rows */}
      <div
        className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-10 justify-items-center w-fit mx-auto px-4"
        style={{
          columnGap: `${Math.abs(Math.min(0, sectionProgress)) * 200}px`,
          rowGap: "0px",
        }}
      >
        {techIcons.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-center rounded-2xl border transition-all duration-300 w-16 h-16 md:w-[72px] md:h-[72px] ${isDarkMode
              ? 'bg-[#111111] border-[#222] hover:border-[#333] hover:bg-[#161616]'
              : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
              }`}
          >
            <item.icon
              size={32}
              style={{
                color: isDarkMode ? item.darkColor || '#ffffff' : item.color,
              }}
              className={`transition-all duration-300 transform group-hover:scale-110 ${!isDarkMode ? 'opacity-90' : ''}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
