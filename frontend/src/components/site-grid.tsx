"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SiteGrid() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out as scroll increases

  return (
    <motion.div
      className="site-grid"
      aria-hidden
      style={{ opacity }}
    />
  );
}