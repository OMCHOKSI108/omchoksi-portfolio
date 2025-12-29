"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import FloatingElements from "@/components/floating-elements";
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

const TECH_LINKS: Record<string, string> = {
  TensorFlow: "https://www.tensorflow.org/",
  "Scikit-learn": "https://scikit-learn.org/stable/",
  XGBoost: "https://xgboost.readthedocs.io/",
  OpenCV: "https://docs.opencv.org/",
  Statsmodels: "https://www.statsmodels.org/",
  PCA: "https://en.wikipedia.org/wiki/Principal_component_analysis",
  Clustering: "https://en.wikipedia.org/wiki/Cluster_analysis",
  Embeddings: "https://en.wikipedia.org/wiki/Word_embedding",
  "Prompt Engineering": "https://en.wikipedia.org/wiki/Prompt_engineering",
  "Semantic Search": "https://en.wikipedia.org/wiki/Semantic_search",
  "Tone Transformation": "https://en.wikipedia.org/wiki/Style_transfer_(computer_science)",
  "Feature Engineering": "https://en.wikipedia.org/wiki/Feature_engineering",
  "Statistical Modeling": "https://en.wikipedia.org/wiki/Statistical_model",
  EDA: "https://en.wikipedia.org/wiki/Exploratory_data_analysis",
  "KPI Tracking": "https://en.wikipedia.org/wiki/Key_performance_indicator",
  "A/B Testing": "https://en.wikipedia.org/wiki/A/B_testing",
  FastAPI: "https://fastapi.tiangolo.com/",
  Flask: "https://flask.palletsprojects.com/",
  Streamlit: "https://streamlit.io/",
  PostgreSQL: "https://www.postgresql.org/docs/",
  "REST APIs": "https://restfulapi.net/",
  Python: "https://www.python.org/doc/",
  "C++": "https://en.cppreference.com/w/",
  Java: "https://docs.oracle.com/en/java/",
  R: "https://cran.r-project.org/manuals.html",
  SQL: "https://www.w3schools.com/sql/",
  Jupyter: "https://jupyter.org/documentation",
  Git: "https://git-scm.com/doc",
  GitHub: "https://docs.github.com/",
  "VS Code": "https://code.visualstudio.com/docs",
};

export default function Stack() {
  return (
    <>
      <FloatingElements />
      <Navbar />
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
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          .font-serif-display { font-family: 'Playfair Display', serif; }
        `}} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 antialiased">
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
              My <span className="italic font-light text-transparent bg-clip-text bg-cover" style={{ backgroundImage: 'var(--gradient-accent)' }}>Tech Arsenal</span>
            </h1>
            <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
              The tools, frameworks, and technologies I use to build intelligent systems and solve complex problems.
            </p>
          </motion.div>

          {/* Animated translucent decorative blob */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0.18, scale: 0.9, x: -40 }}
            animate={{ x: [-40, 40, -40], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-40 -top-16 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 blur-3xl opacity-30 mix-blend-screen"
          />

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(TECH_STACK).map(([category, technologies], categoryIndex) => (
              <motion.article
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />

                <div className="relative">
                  <header className="mb-4 text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">
                      {category}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {`Core ${category.toLowerCase()} skills and tools`}
                    </p>
                  </header>

                  {/* Technologies rendered as clickable chips */}
                  <div className="flex flex-wrap gap-3 items-stretch">
                    {technologies.map((tech, techIndex) => (
                      <motion.button
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.36, delay: categoryIndex * 0.06 + techIndex * 0.04 }}
                        onClick={() => {
                          const url = TECH_LINKS[tech.name] || `https://www.google.com/search?q=${encodeURIComponent(tech.name + ' documentation')}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--background)]/40 border border-[var(--border)] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 cursor-pointer min-w-[10rem] sm:min-w-[12rem]"
                        aria-label={`Open documentation for ${tech.name}`}
                      >
                        <div className={`p-2 rounded-md bg-[var(--muted)]/20 ${tech.color}`}>
                          <tech.icon className="w-4 h-4" />
                        </div>
                        <span className="text-base font-semibold text-[var(--foreground)] leading-tight whitespace-normal break-words">
                          {tech.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.article>
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