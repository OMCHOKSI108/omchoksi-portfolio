"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  radius: number;
  layer: number;
  color: string;
}

export default function GalaxyBackground() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = window.scrollY * 0.12; // gentle parallax
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const update = () => {
      // simple easing towards target
      const cur = offset;
      const tgt = targetRef.current;
      const next = cur + (tgt - cur) * 0.12;
      setOffset(next);
      rafRef.current = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gradient = theme === "dark"
    ? "radial-gradient(600px 200px at 10% 10%, rgba(120, 90, 240, 0.08), transparent 20%), radial-gradient(800px 300px at 90% 30%, rgba(0, 200, 255, 0.05), transparent 25%)"
    : "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(147, 51, 234, 0.15), rgba(99, 102, 241, 0.12) 30%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        transform: `translate3d(0, ${-offset}px, 0)`,
        backgroundImage: gradient,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: 1,
        transition: "opacity 240ms linear",
      }}
    />
  );
}
