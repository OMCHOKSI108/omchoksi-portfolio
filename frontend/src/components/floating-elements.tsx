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
  // Floating elements disabled per user request
  return null;
}