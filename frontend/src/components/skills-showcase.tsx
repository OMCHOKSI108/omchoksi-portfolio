"use client";

import React, { useEffect, useRef, useState } from "react";

const skills = [
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "nodejs",
  "docker",
  "aws",
  "postgresql",
  "mongodb",
  "pytorch",
  "tensorflow",
  "numpy",
];

export default function SkillsShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      const raw = (start - current) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  // ---- Tuned values (layout + motion) ----
  const gap = 56 - progress * 36;                 // tighter like reference
  const scale = 0.94 + progress * 0.06;           // subtle scale
  const opacity = 0.35 + progress * 0.65;

  // subtle 3D tilt (NO vertical movement)
  const tiltX = (mouse.y - 0.5) * 6;
  const tiltY = (mouse.x - 0.5) * -6;

  return (
    <section
      ref={ref}
      className="py-24 px-6 text-center select-none flex justify-center bg-[#f6f7f5]"
    >
      {/* width constraint to match screenshot */}
      <div className="w-full max-w-5xl mx-auto">
        {/* Title block */}
        <div
          style={{
            transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          }}
        >
          <p className="text-[11px] tracking-[0.4em] text-zinc-500 uppercase">
            My Skills
          </p>

          <h2 className="text-4xl md:text-5xl font-serif text-black my-4">
            The Secret{" "}
            <span className="italic bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Sauce
            </span>
          </h2>

          <p className="text-sm text-zinc-500 mb-10">
            A curated collection of technologies I use.
          </p>
        </div>

        {/* Slower rotating flower */}
        <div className="flex justify-center mb-12">
          <img
            src="/assets/steel-flower.webp"
            alt="Skills Wheel"
            className="w-28 h-28 md:w-40 md:h-40 object-contain"
            style={{
              transform: `rotate(${progress * 9}deg)`, // even slower
              transition: "transform 0.4s ease-out",
            }}
          />
        </div>

        {/* Skills grid */}
        <div
          className="mx-auto flex flex-wrap justify-center items-center"
          style={{
            gap: `${gap}px`,
            width: "100%",
            transform: `scale(${scale})`,
            opacity,
            transition:
              "gap 220ms linear, transform 220ms ease, opacity 220ms ease",
          }}
        >
          {skills.map((name) => (
            <div
              key={name}
              className="
                group relative
                w-16 h-16 md:w-20 md:h-20
                rounded-xl
                bg-white
                border border-black/40
                hover:border-black/60
                flex items-center justify-center
                transition-colors
              "
              title={name}
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={`/assets/skills/${name}.svg`}
                alt={name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `/assets/skills/${name}.png`;
                }}
                style={{
                  width: "58%",
                  height: "58%",
                  objectFit: "contain",
                }}
              />

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
