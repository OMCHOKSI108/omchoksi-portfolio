"use client";

import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

const marqueeText = "AI & MACHINE LEARNING ENGINEER • PYTHON • TENSORFLOW • COMPUTER VISION • NLP • DEEP LEARNING • DATA SCIENCE • ML DEPLOYMENT • ";

export default function Marquee() {
  const { theme } = useTheme();

  return (
    <section className="py-8 overflow-hidden text-[var(--foreground)]">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="whitespace-nowrap text-2xl font-bold tracking-wider"
      >
        {marqueeText.repeat(10)}
      </motion.div>
    </section>
  );
}