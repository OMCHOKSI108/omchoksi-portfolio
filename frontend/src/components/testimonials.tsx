"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Target } from "lucide-react";

const recognitions = [
  {
    title: "Finalist – IMMunoQuest Kaggle Contest",
    description: "Competed in a prestigious machine learning competition focused on immunological research and predictive modeling.",
    icon: Trophy,
    category: "Competition"
  },
  {
    title: "Winner – Data Science Treasure Hunt",
    description: "Secured first place in a challenging data science competition involving complex analytical puzzles and insights.",
    icon: Award,
    category: "Competition"
  },
  {
    title: "Competitor – HPC Event (AIML Club)",
    description: "Participated in high-performance computing challenges organized by the AI/ML club, showcasing computational skills.",
    icon: Target,
    category: "Event"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Mentions & <span className="font-serif-italic text-primary">Recognition</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] rounded-full flex items-center justify-center mb-4">
                  <recognition.icon className="w-6 h-6 text-[var(--primary-foreground)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{recognition.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-3">{recognition.description}</p>
                <span className="inline-block px-3 py-1 bg-[var(--muted)]/20 text-[var(--muted-foreground)] text-sm rounded-full">
                  {recognition.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>100% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
              <span>50+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>5-Star Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}