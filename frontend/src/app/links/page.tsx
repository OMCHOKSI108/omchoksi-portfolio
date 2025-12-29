"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Globe, MapPin, Calendar, Send, BookOpen } from "lucide-react";

export default function LinksPage() {
  const socialLinks = [
    {
      title: "GitHub",
      handle: "@omchoksi108",
      url: "https://github.com/OMCHOKSI108",
      icon: Github,
      category: "CODE & CRAFT"
    },
    {
      title: "Projects",
      handle: "View my work",
      url: "/work",
      icon: BookOpen,
      category: "CODE & CRAFT"
    },
    {
      title: "LinkedIn",
      handle: "in/om-choksi",
      url: "https://www.linkedin.com/in/om-choksi/",
      icon: Linkedin,
      category: "CONNECT"
    },
    {
      title: "Twitter / X",
      handle: "@ChoksiOm",
      url: "https://x.com/ChoksiOm",
      icon: Twitter,
      category: "CONNECT"
    },
    {
      title: "Email",
      handle: "omchoksi108@gmail.com",
      url: "mailto:omchoksi108@gmail.com",
      icon: Mail,
      category: "CONNECT"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--primary)]/20 selection:text-[var(--foreground)] relative overflow-hidden transition-colors duration-300">

      {/* Grid Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none h-full w-full">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex justify-center w-full max-w-[1400px] mx-auto">

          {/* Left Stripe Border */}
          <div className="hidden md:block w-12 border-r border-[var(--border)] bg-[linear-gradient(45deg,transparent_25%,var(--border)_25%,var(--border)_50%,transparent_50%,transparent_75%,var(--border)_75%,var(--border)_100%)] bg-[size:8px_8px] opacity-20"></div>

          <div className="flex-1 max-w-[1200px] px-6 pt-32 pb-20">

            {/* Header */}
            <div className="text-center mb-20 pointer-events-none">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif text-[var(--foreground)]"
              >
                Connect With <span className="font-script bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent px-1" style={{ fontFamily: 'var(--font-geist-mono)' /* Fallback, ideally import a script font */ }}>Me</span>
              </motion.h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

              {/* Profile Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-1/3"
              >
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-sm">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-purple-500 to-blue-500">
                      <img src="/images/omchoksi.jpg" alt="Om Choksi" className="w-full h-full object-cover rounded-full border-4 border-[var(--card)]" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--card)]"></div>
                  </div>

                  <h2 className="text-2xl font-serif font-medium mb-2">Om Choksi</h2>
                  <div className="flex gap-2 mb-8">
                    <span className="px-3 py-1 rounded-full bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)]">Developer</span>
                    <span className="px-3 py-1 rounded-full bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)]">Freelancer</span>
                  </div>

                  <div className="w-full space-y-4 mb-8 text-left">
                    <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                      <MapPin className="w-4 h-4" />
                      <span>Ahmedabad, India</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">omchoksi108@gmail.com</span>
                    </div>
                  </div>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quick-connect'))}
                    className="w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium mb-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Call
                  </button>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <a href="/" className="flex items-center justify-center gap-2 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors">
                      <Globe className="w-3 h-3" />
                      Website
                    </a>
                    <a href="mailto:omchoksi108@gmail.com" className="flex items-center justify-center gap-2 py-2 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors">
                      <Mail className="w-3 h-3" />
                      Email
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Links Grid */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="lg:w-2/3 space-y-12"
              >
                {/* Group 1: CODE & CRAFT */}
                <div>
                  <h3 className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-2 inline-block">Code & Craft</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialLinks.filter(l => l.category === "CODE & CRAFT").map((link) => (
                      <motion.a
                        key={link.title}
                        variants={item}
                        href={link.url}
                        target={link.url.startsWith('/') ? undefined : "_blank"}
                        rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                        className="group flex p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/50 transition-all hover:bg-[var(--muted)]/30"
                      >
                        <div className="p-3 rounded-xl bg-[var(--muted)] group-hover:bg-[var(--background)] transition-colors mr-4 h-fit">
                          <link.icon className="w-5 h-5 text-[var(--foreground)]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--foreground)] mb-1">{link.title}</h4>
                          <p className="text-sm text-[var(--muted-foreground)] font-mono">{link.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Group 2: CONNECT */}
                <div>
                  <h3 className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest mb-6 border-b border-[var(--border)] pb-2 inline-block">Connect</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialLinks.filter(l => l.category === "CONNECT").map((link) => (
                      <motion.a
                        key={link.title}
                        variants={item}
                        href={link.url}
                        target={link.url.startsWith('/') ? undefined : "_blank"}
                        rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                        className="group flex p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/50 transition-all hover:bg-[var(--muted)]/30"
                      >
                        <div className="p-3 rounded-xl bg-[var(--muted)] group-hover:bg-[var(--background)] transition-colors mr-4 h-fit">
                          <link.icon className="w-5 h-5 text-[var(--foreground)]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--foreground)] mb-1">{link.title}</h4>
                          <p className="text-sm text-[var(--muted-foreground)] font-mono">{link.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Right Stripe Border */}
          <div className="hidden md:block w-12 border-l border-[var(--border)] bg-[linear-gradient(45deg,transparent_25%,var(--border)_25%,var(--border)_50%,transparent_50%,transparent_75%,var(--border)_75%,var(--border)_100%)] bg-[size:8px_8px] opacity-20"></div>
        </div>

        <Footer />
      </div>
    </main>
  );
}