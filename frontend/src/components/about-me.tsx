"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, ArrowRight, Code, Layout, Server, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <section className="py-24 px-6 bg-[var(--background)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* TEXT SIDE */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-6 block">
                Know About Me
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.1] mb-8">
                Data Scientist & <br className="hidden lg:block" /> AI Engineer in{" "}
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  Machine Learning
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 text-xl text-[var(--foreground)] leading-relaxed font-medium"
            >
              <p>
                I&apos;m Om Choksi, a passionate Data Scientist and AI Engineer dedicated to transforming data into actionable insights. From machine learning models to deep learning architectures, I thrive on solving complex problems with innovative solutions. My expertise spans Python, TensorFlow, PyTorch, and advanced ML algorithms, and I&apos;m always eager to explore cutting-edge AI technologies.
              </p>
              <p>
                When I&apos;m not immersed in work, I&apos;m exploring new ideas and staying curious. Life&apos;s about balance, and I love embracing every part of it.
              </p>
              <p className="font-bold text-[var(--foreground)]">
                I believe in waking up each day eager to make a difference!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 pt-4"
            >
              <SocialLink icon={<Linkedin size={22} />} href="https://linkedin.com/in/omchoksi" />
              <SocialLink icon={<Github size={22} />} href="https://github.com/omchoksi108" />
              <SocialLink icon={<Twitter size={22} />} href="https://x.com/ChoksiOm" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-8"
            >
              <a href="/about#experience" className="inline-flex items-center gap-2 text-lg text-[var(--foreground)] font-bold border-b-2 border-[var(--foreground)] pb-1 hover:text-purple-500 hover:border-purple-500 transition-colors">
                Check my Work Experience <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>

          {/* PHOTO SIDE */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-[4/5]"
            >
              {/* Main Card */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--card)]">
                {/* Background Pattern - Clean */}
                <div className="absolute inset-0 opacity-10">
                  {/* Removed foggy gradient overlay */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 C 50 100 80 100 100 0 Z" fill="url(#grad1)" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.2 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="relative w-full h-full">
                    {/* Neural Network Visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="netGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="currentColor" className="text-purple-500/20" />
                          <stop offset="100%" stopColor="currentColor" className="text-purple-500/50" />
                        </linearGradient>
                      </defs>

                      {/* Connections: Input -> Center */}
                      <path d="M70 80 L200 150" stroke="url(#netGradient)" strokeWidth="2" />
                      <path d="M70 220 L200 150" stroke="url(#netGradient)" strokeWidth="2" />

                      {/* Connections: Center -> Output */}
                      <path d="M200 150 L330 80" stroke="url(#netGradient)" strokeWidth="2" />
                      <path d="M200 150 L330 220" stroke="url(#netGradient)" strokeWidth="2" />

                      {/* Data Packets Animation */}
                      <circle r="3" fill="var(--primary)">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M70 80 L200 150 L330 80" />
                      </circle>
                      <circle r="3" fill="var(--primary)">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s" path="M70 220 L200 150 L330 220" />
                      </circle>
                    </svg>

                    {/* Nodes (HTML Overlay for crisp icons) */}

                    {/* Inputs (Left) */}
                    <div className="absolute top-[60px] left-[30px] p-3 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg flex items-center gap-2 animate-[float_4s_ease-in-out_infinite]">
                      <Database className="w-5 h-5 text-purple-500" />
                      <span className="text-xs font-bold hidden sm:block">Data</span>
                    </div>
                    <div className="absolute bottom-[60px] left-[30px] p-3 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg flex items-center gap-2 animate-[float_5s_ease-in-out_infinite]">
                      <Cloud className="w-5 h-5 text-blue-500" />
                      <span className="text-xs font-bold hidden sm:block">Source</span>
                    </div>

                    {/* Central Processing Unit */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-20 h-20 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-2xl flex items-center justify-center z-10">
                        <Code className="w-8 h-8 text-[var(--foreground)]" />
                        <div className="absolute inset-0 bg-purple-500/10 rounded-2xl animate-pulse" />
                      </div>
                      {/* Spinning Rings */}
                      <div className="absolute inset-[-10px] rounded-full border border-purple-500/20 border-l-transparent animate-[spin_3s_linear_infinite]" />
                      <div className="absolute inset-[-20px] rounded-full border border-cyan-500/20 border-r-transparent animate-[spin_5s_linear_infinite_reverse]" />
                    </div>

                    {/* Outputs (Right) */}
                    <div className="absolute top-[60px] right-[30px] p-3 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg flex items-center gap-2 animate-[float_4.5s_ease-in-out_infinite]">
                      <Layout className="w-5 h-5 text-pink-500" />
                      <span className="text-xs font-bold hidden sm:block">UI</span>
                    </div>
                    <div className="absolute bottom-[60px] right-[30px] p-3 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg flex items-center gap-2 animate-[float_3.5s_ease-in-out_infinite]">
                      <Server className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-bold hidden sm:block">API</span>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
  >
    {icon}
  </a>
);

export default AboutMe;