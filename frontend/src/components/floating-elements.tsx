"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const floatingElements = [
  { size: 20, color: "bg-[var(--primary)]/30", delay: 0 },
  { size: 15, color: "bg-[var(--secondary)]/25", delay: 1 },
  { size: 25, color: "bg-[var(--accent)]/20", delay: 2 },
  { size: 18, color: "bg-[var(--primary)]/25", delay: 0.5 },
  { size: 22, color: "bg-[var(--secondary)]/20", delay: 1.5 },
  { size: 16, color: "bg-[var(--accent)]/30", delay: 2.5 },
];

export default function FloatingElements() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${element.color} opacity-40`}
          style={{
            width: element.size,
            height: element.size,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: element.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}