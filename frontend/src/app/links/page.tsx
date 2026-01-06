"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GithubActivity from "@/components/github-activity";
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
  const [showNavbar, setShowNavbar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setShowNavbar(true);

    // Fetch GitHub profile avatar for this page only
    fetch("https://api.github.com/users/omchoksi108")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.avatar_url) setAvatarUrl(data.avatar_url as string);
      })
      .catch(() => {
        // Silent fail – keep fallback if needed
      });
  }, []);

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
      {/* CALLIGRAPHIC SHAPES & FLOURISHES BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">

        {/* Ornamental Calligraphic Strokes & Flourishes */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">

          {/* Large Decorative Swirl - Top Left */}
          <path
            d="M 100,150 Q 200,50 350,100 Q 450,150 400,250 Q 350,350 250,300 Q 150,250 100,150"
            stroke="var(--foreground)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 120,140 Q 180,80 280,120 Q 350,150 320,220"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="5 10"
            opacity="0.3"
          />

          {/* Elegant Spiral - Top Right */}
          <path
            d="M 1400,100 Q 1450,150 1400,200 Q 1350,250 1400,300 Q 1450,350 1500,300"
            stroke="var(--foreground)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />
          <circle cx="1400" cy="100" r="4" fill="var(--foreground)" opacity="0.4" />

          {/* Flowing S-Curve - Center */}
          <path
            d="M 600,200 Q 700,100 800,200 Q 900,300 1000,200 Q 1100,100 1200,200"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="10 15"
            opacity="0.25"
          />

          {/* Decorative Corner Flourish - Bottom Left */}
          <path
            d="M 50,850 Q 150,750 250,850 L 200,900 Q 150,950 50,900 Z"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="var(--foreground)"
            fillOpacity="0.03"
            opacity="0.4"
          />
          <path
            d="M 80,870 Q 120,830 160,870"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Vertical Decorative Border - Left Side */}
          <path
            d="M 50,400 Q 100,450 50,500 Q 0,550 50,600"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.2"
          />

          {/* Ornamental Heart-like Shape - Center Right */}
          <path
            d="M 1200,500 Q 1250,450 1300,500 Q 1350,550 1300,600 Q 1250,650 1200,600 Q 1150,550 1200,500"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d="M 1250,520 L 1250,580"
            stroke="var(--foreground)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Flowing Wave - Bottom */}
          <path
            d="M 300,900 Q 500,850 700,900 Q 900,950 1100,900 Q 1300,850 1500,900"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* Small Decorative Dots & Nodes */}
          <circle cx="250" cy="200" r="3" fill="var(--foreground)" opacity="0.3" />
          <circle cx="1300" cy="250" r="2.5" fill="var(--foreground)" opacity="0.35" />
          <circle cx="450" cy="700" r="4" fill="var(--foreground)" opacity="0.25" />
          <circle cx="1100" cy="750" r="3" fill="var(--foreground)" opacity="0.3" />
          <circle cx="800" cy="400" r="2" fill="var(--foreground)" opacity="0.2" />

          {/* Infinity-like Loop - Center Bottom */}
          <path
            d="M 600,700 Q 700,650 800,700 Q 900,750 1000,700 Q 900,650 800,700 Q 700,750 600,700"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Delicate Leaf Branch - Right Side */}
          <path
            d="M 1450,400 Q 1480,450 1450,500 Q 1420,550 1450,600"
            stroke="var(--foreground)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path d="M 1450,420 Q 1470,430 1450,440" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M 1450,480 Q 1430,490 1450,500" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M 1450,540 Q 1470,550 1450,560" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />

        </svg>

        {/* Subtle Gradient Orbs */}
        <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-10 blur-[100px]"></div>
        <div className="absolute left-[20%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-pink-500 opacity-8 blur-[90px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {showNavbar && <Navbar />}

        <div className="flex-1 flex justify-center max-w-[1400px] mx-auto relative">
          {/* Left Pillar - Texture */}
          <div className="hidden md:block absolute left-[8%] xl:left-[12%] top-0 bottom-0 w-8 z-10 pointer-events-none select-none">
            <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)' }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                <defs>
                  <pattern id="diagonalStripesLeft" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)] opacity-30" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="64" height="1000" fill="url(#diagonalStripesLeft)" />
              </svg>
            </div>
          </div>
          {/* Right Pillar - Texture */}
          <div className="hidden md:block absolute right-[8%] xl:right-[12%] top-0 bottom-0 w-8 z-10 pointer-events-none select-none">
            <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)' }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                <defs>
                  <pattern id="diagonalStripesRight" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(-45)">
                    <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)] opacity-30" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="64" height="1000" fill="url(#diagonalStripesRight)" />
              </svg>
            </div>
          </div>

          <div className="flex-1 max-w-[1200px] px-6 pt-32 pb-20 relative z-20">
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

            <GithubActivity username="omchoksi108" />
            <div className="flex flex-col lg:flex-row gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/3"
              >
                <div className="bg-[var(--card)] border rounded-3xl p-8 text-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Om Choksi GitHub avatar"
                      className="w-32 h-32 mx-auto rounded-full border-4 mb-6 object-cover object-center"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto rounded-full border-4 mb-6 flex items-center justify-center bg-[var(--muted)] text-3xl font-semibold">
                      OC
                    </div>
                  )}
                  <h2 className="text-2xl font-serif mb-4">Om Choksi</h2>

                  <div className="space-y-3 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Surat, India
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> omchoksi108@gmail.com
                    </div>
                  </div>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-quick-connect'))}
                    className="mt-6 w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)]"
                  >
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Contact me
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
