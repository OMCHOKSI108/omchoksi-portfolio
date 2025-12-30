"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

// The text content from the user's reference image
const items = [
  "MACHINE LEARNING", "DEEP LEARNING", "COMPUTER VISION", "NLP", "GENERATIVE AI",
  "LLMs", "NEURAL NETWORKS", "DATA SCIENCE", "AI AGENTS", "PREDICTIVE ANALYTICS"
];

const MarqueeTrack = ({ direction = "left" }: { direction?: "left" | "right" }) => (
  <div className="flex select-none py-3">
    <motion.div
      initial={{ x: direction === "left" ? 0 : "-50%" }}
      animate={{ x: direction === "left" ? "-50%" : 0 }}
      transition={{
        duration: 100,
        repeat: Infinity,
        ease: "linear"
      }}
      className="flex flex-shrink-0"
    >
      {[...Array(20)].map((_, i) => (
        <div key={i} className="flex items-center gap-6 mx-6">
          {items.map((item, idx) => (
            <div key={`${i}-${idx}`} className="flex items-center gap-6">
              <span className="text-lg md:text-xl font-serif font-bold text-white tracking-widest">{item}</span>
              <Sparkle className="w-4 h-4 text-white fill-white" />
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  </div>
);

export default function Marquee() {
  return (
    <section className="py-40 relative overflow-hidden bg-[var(--background)]">

      {/* Blank Ribbon - Behind (Static) */}
      <div className="absolute top-1/2 left-[-10%] w-[120%] h-20 -translate-y-1/2 rotate-2 z-0 bg-[#2563EB] opacity-40 shadow-xl pointer-events-none border-y border-white/10" />

      {/* Running Ribbon - Front (Dynamic) */}
      <div className="absolute top-1/2 left-[-10%] w-[120%] -translate-y-1/2 -rotate-2 z-10 bg-[#2563EB] shadow-2xl border-y border-white/20">
        <MarqueeTrack direction="left" />
      </div>

    </section>
  );
}