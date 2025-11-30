"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  MessageSquare,
  Database,
  Server,
  Code,
  Wrench,
  Cpu,
  Network,
  BarChart3,
  Zap,
  GitBranch,
  Monitor
} from "lucide-react";
import ContactFooter from "../../components/footer";

const TECH_STACK = {
  "ML & AI": [
    { name: "TensorFlow", icon: Cpu, color: "text-orange-500" },
    { name: "Scikit-learn", icon: Brain, color: "text-blue-500" },
    { name: "XGBoost", icon: Zap, color: "text-green-500" },
    { name: "OpenCV", icon: Eye, color: "text-red-500" },
    { name: "Statsmodels", icon: BarChart3, color: "text-purple-500" },
    { name: "PCA", icon: Network, color: "text-indigo-500" },
    { name: "Clustering", icon: Database, color: "text-teal-500" }
  ],
  "NLP / LLM": [
    { name: "Embeddings", icon: MessageSquare, color: "text-pink-500" },
    { name: "Prompt Engineering", icon: Code, color: "text-cyan-500" },
    { name: "Semantic Search", icon: Network, color: "text-violet-500" },
    { name: "Tone Transformation", icon: MessageSquare, color: "text-rose-500" }
  ],
  "Data & Pipelines": [
    { name: "Feature Engineering", icon: Wrench, color: "text-amber-500" },
    { name: "Statistical Modeling", icon: BarChart3, color: "text-emerald-500" },
    { name: "EDA", icon: BarChart3, color: "text-lime-500" },
    { name: "KPI Tracking", icon: Monitor, color: "text-sky-500" },
    { name: "A/B Testing", icon: BarChart3, color: "text-slate-500" }
  ],
  "Backend & Deployment": [
    { name: "FastAPI", icon: Server, color: "text-green-600" },
    { name: "Flask", icon: Server, color: "text-gray-500" },
    { name: "Streamlit", icon: Monitor, color: "text-red-600" },
    { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
    { name: "REST APIs", icon: Network, color: "text-purple-600" }
  ],
  "Programming": [
    { name: "Python", icon: Code, color: "text-yellow-500" },
    { name: "C++", icon: Code, color: "text-blue-700" },
    { name: "Java", icon: Code, color: "text-red-700" },
    { name: "R", icon: Code, color: "text-blue-800" },
    { name: "SQL", icon: Database, color: "text-orange-600" }
  ],
  "Tools": [
    { name: "Jupyter", icon: Monitor, color: "text-orange-600" },
    { name: "Git", icon: GitBranch, color: "text-red-500" },
    { name: "GitHub", icon: GitBranch, color: "text-gray-700" },
    { name: "VS Code", icon: Code, color: "text-blue-500" }
  ]
};

export default function Stack() {
  return (
    <>
      <section className="relative w-full min-h-screen py-20 bg-[var(--background)] overflow-hidden">
        {/* Background Effects */}
        {/* Top subtle gridlines — low opacity, repeating lines for texture */}
        {/* Theme-aware small grid (12px squares) — subtle lines for both themes */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-72 pointer-events-none z-0 block dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.18), rgba(0,0,0,0) 60%), linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "cover, 32px 32px, 32px 32px",
            opacity: 0.72,
            backgroundRepeat: "no-repeat, repeat, repeat",
          }}
        />

        <div
          aria-hidden
          className="absolute left-0 right-0 top-0 h-72 pointer-events-none z-0 hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.22), rgba(0,0,0,0) 60%), linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "cover, 32px 32px, 32px 32px",
            opacity: 0.64,
            backgroundRepeat: "no-repeat, repeat, repeat",
            mixBlendMode: "overlay",
          }}
        />

        {/* Inject Fonts */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          .font-serif-display { font-family: 'Playfair Display', serif; }
        `}} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4 block">
              Technology Stack
            </span>
            <h1 className="text-5xl md:text-7xl font-serif-display text-[var(--foreground)] mb-6">
              My <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Tech Arsenal</span>
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
              The tools, frameworks, and technologies I use to build intelligent systems and solve complex problems.
            </p>
          </motion.div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(TECH_STACK).map(([category, technologies], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  {/* Category Title */}
                  <h3 className="text-xl font-semibold mb-6 text-[var(--foreground)] text-center">
                    {category}
                  </h3>

                  {/* Technologies */}
                  <div className="space-y-4">
                    {technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + techIndex * 0.05
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)]/20 transition-colors group/item"
                      >
                        <div className={`p-2 rounded-lg bg-[var(--muted)]/30 ${tech.color}`}>
                          <tech.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-[var(--foreground)] group-hover/item:text-[var(--primary)] transition-colors">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-[var(--muted-foreground)] text-lg">
              Always learning, always evolving. This stack grows with every new challenge.
            </p>
          </motion.div>
        </div>
      </section>

      <ContactFooter />
    </>
  );
}