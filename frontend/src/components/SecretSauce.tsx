"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { techIcons } from "@/data/techIcons";

export default function SecretSauce() {
  const [sectionProgress, setSectionProgress] = useState(0);
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
        <span className="italic bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Sauce</span>
      </h2>

      {/* Centered Skills Grid - 4 Rows */}
      <div className="flex justify-center -mt-4">
        <div
          className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3 max-w-6xl"
          style={{
            gap: `${4 + Math.abs(sectionProgress) * 16}px`,
          }}
        >
          {techIcons.map((item, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-transparent border-2 border-black backdrop-blur-none dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-2 dark:border-white/20 dark:backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-gray-600 dark:hover:border-white/40 hover:shadow-lg hover:shadow-gray-300/20 dark:hover:shadow-white/10"
            >
              <item.icon size={28} style={{ color: item.color, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


