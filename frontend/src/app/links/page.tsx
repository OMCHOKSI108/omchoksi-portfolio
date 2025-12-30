"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Send,
  BookOpen,
  Instagram
} from "lucide-react";

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
      title: "Kaggle",
      handle: "OMCHOKSI04",
      url: "https://www.kaggle.com/omchoksi04",
      icon: Globe,
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
      url: "https://www.linkedin.com/in/omchoksi/",
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
      title: "Instagram",
      handle: "@omchoksii",
      url: "https://www.instagram.com/omchoksii",
      icon: Instagram,
      category: "CONNECT"
    },
    {
      title: "Telegram",
      handle: "@om_395",
      url: "https://t.me/om_395",
      icon: Send,
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex justify-center max-w-[1400px] mx-auto">
          <div className="hidden md:block w-12 border-r border-[var(--border)] opacity-20"></div>

          <div className="flex-1 max-w-[1200px] px-6 pt-32 pb-20">
            <div className="text-center mb-20">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif"
              >
                Connect With{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Me
                </span>
              </motion.h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/3"
              >
                <div className="bg-[var(--card)] border rounded-3xl p-8 text-center">
                  <img
                    src="/images/omchoksi.jpg"
                    className="w-32 h-32 mx-auto rounded-full border-4 mb-6"
                  />
                  <h2 className="text-2xl font-serif mb-4">Om Choksi</h2>

                  <div className="space-y-3 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Ahmedabad, India
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> omchoksi108@gmail.com
                    </div>
                  </div>

                  <button className="mt-6 w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)]">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Book a Call
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="lg:w-2/3 space-y-12"
              >
                {["CODE & CRAFT", "CONNECT"].map(section => (
                  <div key={section}>
                    <h3 className="text-xs uppercase mb-6 border-b pb-2">
                      {section}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {socialLinks
                        .filter(l => l.category === section)
                        .map(link => (
                          <motion.a
                            key={link.title}
                            variants={item}
                            href={link.url}
                            target="_blank"
                            className="flex p-4 rounded-2xl border hover:bg-[var(--muted)]"
                          >
                            <div className="p-3 rounded-xl bg-[var(--muted)] mr-4">
                              <link.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{link.title}</h4>
                              <p className="text-sm opacity-70 font-mono">
                                {link.handle}
                              </p>
                            </div>
                          </motion.a>
                        ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="hidden md:block w-12 border-l border-[var(--border)] opacity-20"></div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
