"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
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
                Full-Stack Developer and <br className="hidden lg:block" /> a little bit of{" "}
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  everything
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
                I&apos;m Om Choksi, a proactive full-stack developer passionate about creating dynamic web experiences. From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans React, Next.js, and Node.js, and I&apos;m always eager to learn more.
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

                {/* Image - Placeholder URL as requested, but set up for local file */}
                <div className="absolute inset-0 flex items-end justify-center">
                  {/* 
                            REPLACE THIS SRC with your local file path like: "/assets/my-photo.png" 
                            For now using a generic placeholder that looks professional
                         */}
                  <Image
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
                    alt="Om Choksi"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Gradient Fade at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
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