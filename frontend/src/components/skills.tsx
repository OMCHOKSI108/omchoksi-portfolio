"use client";

import { motion } from "framer-motion";
import { Code, Database, Smartphone, Cloud, Palette, Globe, Cpu, Layers } from "lucide-react";

const skills = [
  { icon: "🤖", name: "Machine Learning" },
  { icon: "🧠", name: "Deep Learning" },
  { icon: "👁️", name: "Computer Vision" },
  { icon: "💬", name: "NLP" },
  { icon: "📊", name: "Data Science" }
];

export default function Skills() {
  return (
    <section className="py-20 px-6 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16"
        >
          The <span className="font-serif-italic text-[var(--primary)]">Secret Sauce</span>
        </motion.h2>

        <div className="relative h-96 flex items-center justify-center">
          {/* Central blob */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-48 h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] rounded-full shadow-2xl flex items-center justify-center"
          >
              <div className="w-32 h-32 bg-[var(--muted)]/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Code className="w-12 h-12 text-[var(--foreground)]" />
            </div>
          </motion.div>

          {/* Floating icons */}
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              animate={{
                x: Math.cos(index * (Math.PI * 2) / skills.length) * 150,
                y: Math.sin(index * (Math.PI * 2) / skills.length) * 150,
              }}
              className="absolute w-16 h-16 bg-[var(--card)] rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
            >
              {skill.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}