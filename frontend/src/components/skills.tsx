"use client";

import { motion } from "framer-motion";
import { Brain, Eye, MessageSquare, BarChart3, Zap } from "lucide-react";

const skills = [
  { icon: Brain, name: "Machine Learning" },
  { icon: Brain, name: "Deep Learning" },
  { icon: Eye, name: "Computer Vision" },
  { icon: MessageSquare, name: "NLP" },
  { icon: BarChart3, name: "Data Science" }
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
          The <span className="font-serif-italic font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>Secret Sauce</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <skill.icon className="w-8 h-8 text-[var(--primary)] mb-2" />
              <span className="text-sm font-medium text-[var(--foreground)] text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}