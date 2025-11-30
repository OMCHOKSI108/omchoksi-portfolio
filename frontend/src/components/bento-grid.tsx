"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Clock, Mail, Smartphone, Users, Star, TrendingUp, Zap } from "lucide-react";

export default function BentoGrid() {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          About & Highlights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Client Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Heart className="w-8 h-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Client Focus</h3>
              <p className="text-[var(--muted-foreground)]">I prioritize client collaboration and building long-term relationships through transparent communication and delivering exceptional results.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-[var(--primary)] rounded-full border-2 border-[var(--card)]"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-[var(--card)]"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-[var(--card)]"></div>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">+12 happy clients</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative bg-gradient-to-br from-[var(--primary)]/10 to-[var(--card)] rounded-3xl p-6 shadow-xl md:col-span-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Zap className="w-8 h-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">Passionate about cutting-edge technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['TensorFlow', 'Scikit-learn', 'OpenCV', 'FastAPI', 'PostgreSQL', 'AWS', 'Python'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[var(--muted)] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]/80 transition-colors cursor-pointer hover:scale-105"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Always learning</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>5+ years experience</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Timezone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative bg-[var(--card)] text-[var(--foreground)] rounded-3xl p-6 shadow-xl md:col-span-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">India</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-mono">{getCurrentTime()}</span>
              </div>
              <p className="text-[var(--muted-foreground)]">I'm very flexible with time zone communications and always available for urgent discussions.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Available for new projects</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Mail className="w-8 h-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Let's work together</h3>
              <p className="text-[var(--muted-foreground)] mb-4">on your next project</p>
              <button className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] text-[var(--primary-foreground)] py-3 rounded-full font-medium hover:from-[var(--primary)]/80 hover:to-[var(--primary)]/80 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg">
                <Mail size={16} />
                Get in touch
              </button>
            </div>
          </motion.div>

          {/* Card 5 - Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Smartphone className="w-8 h-8 text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Currently building</h3>
              <p className="text-[var(--muted-foreground)] mb-4">a SaaS Application with modern tech stack</p>
              <div className="bg-[var(--muted)] rounded-lg p-4 border border-[var(--border)]">
                <div className="bg-[var(--card)] border-2 border-dashed border-[var(--border)] rounded-lg h-20 flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                  <span className="text-[var(--muted-foreground)] text-sm font-medium">Wireframe UI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}