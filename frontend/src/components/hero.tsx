"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export default function Hero() {
  const { theme } = useTheme();
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate fewer, more subtle stars
    const newStars = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 70, // Only in top 70% of screen
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setStars(newStars);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("omchoksi108@gmail.com");
    // Could add toast notification
  };

  const isDark = theme === 'dark';

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Theme-Aware Background with Gradient */}
      {/* Theme-Aware Background with Gradient */}
      {/* Theme-Aware Background with Gradient */}
      {/* Theme-Aware Background with Gradient */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[#030014]' : 'bg-gradient-to-b from-[#f8f9ff] via-[#eef2ff] to-[#e0e7ff]'}`}>

        {/* ATMOSPHERIC GLOW (The "Reference" Look) */}
        {/* This is the massive nebula glow behind the text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isDark ? (
            <>
              {/* 1. Central Purple/Blue Atmospheric Glow */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0f0c29]/0 to-transparent blur-[80px] opacity-100 mix-blend-screen pointer-events-none" />

              {/* 2. Secondary "Sunrise" Glow at Horizon */}
              <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />

              {/* Stars */}
              {stars.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: star.opacity }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                  }}
                />
              ))}
            </>
          ) : (
            <>
              {/* Light Mode Glows */}
              <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-white via-transparent to-transparent z-10" />
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-200/30 blur-[100px] rounded-full mix-blend-multiply" />
              <div className="absolute bottom-[0%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 blur-[120px] rounded-full mix-blend-multiply" />
            </>
          )}
        </div>

        {/* The Planet Horizon Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] z-0 pointer-events-none flex items-end justify-center overflow-visible">

          {/* The SVG Curve Surface */}
          <div className="relative w-full h-full translate-y-[20%] scale-[1.02]">
            <svg
              viewBox="0 0 1440 320"
              className="w-full h-full block"
              preserveAspectRatio="none"
              style={{ filter: isDark ? 'drop-shadow(0 -4px 20px rgba(255, 255, 255, 0.1))' : 'drop-shadow(0 -10px 20px rgba(147, 197, 253, 0.4))' }}
            >
              <defs>
                <linearGradient id={isDark ? "planetFillDark" : "planetFillLight"} x1="0.5" y1="0" x2="0.5" y2="1">
                  {isDark ? (
                    <>
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="100%" stopColor="#000000" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f0f4ff" />
                    </>
                  )}
                </linearGradient>

                <linearGradient id={isDark ? "rimStrokeDark" : "rimStrokeLight"} x1="0.5" y1="0" x2="0.5" y2="1">
                  {isDark ? (
                    <>
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                      <stop offset="15%" stopColor="rgba(255, 255, 255, 0.5)" />
                      <stop offset="40%" stopColor="rgba(255, 255, 255, 0)" />
                      <stop offset="100%" stopColor="transparent" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                      <stop offset="30%" stopColor="rgba(147, 197, 253, 0.1)" />
                      <stop offset="100%" stopColor="transparent" />
                    </>
                  )}
                </linearGradient>
              </defs>

              {/* Main Planet Body - Pitch Black to block the glow behind */}
              <path
                d="M0,320 L0,120 Q720,20 1440,120 L1440,320 Z"
                fill={`url(#${isDark ? "planetFillDark" : "planetFillLight"})`}
              />

              {/* Glowing Rim Stroke - Crisp White */}
              <path
                d="M0,320 L0,120 Q720,20 1440,120 L1440,320 Z"
                fill="none"
                stroke={`url(#${isDark ? "rimStrokeDark" : "rimStrokeLight"})`}
                strokeWidth="1.5"
                className="opacity-100 mix-blend-screen"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className={`text-6xl sm:text-7xl md:text-8xl font-serif leading-[0.95] tracking-tight ${isDark ? 'text-white' : 'text-gray-950'}`}>
            I help founders turn ideas into <br className="hidden md:block" />
            seamless <span className="italic font-light">digital experiences</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className={`flex flex-col md:flex-row items-center justify-center gap-3 text-lg md:text-xl font-light tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Hello, I'm <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Om Choksi</span></span>
            <div className="relative w-12 h-8 mx-1 hidden md:block">
              {/* Stacked Avatars Mockup */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] ${isDark ? 'border-[#0a0a0f]' : 'border-white'} bg-gray-200 z-10 overflow-hidden shadow-sm`}>
                <img src="https://ui-avatars.com/api/?name=Om+Choksi&background=random" alt="Om" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] ${isDark ? 'border-[#0a0a0f]' : 'border-white'} bg-blue-100 z-0 flex items-center justify-center text-[10px] shadow-sm`}>
                💻
              </div>
            </div>
            <span>a Full Stack Developer</span>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-quick-connect'))}
            className={`group relative inline-flex items-center gap-3 pl-8 pr-2 py-2 rounded-full transition-all duration-300 backdrop-blur-md border ${isDark
              ? 'bg-white/10 border-white/10 hover:bg-white/15 text-white'
              : 'bg-gray-900/5 border-gray-900/5 hover:bg-gray-900/10 text-gray-900'
              }`}
          >
            <span className="text-base font-medium tracking-wide">Let's Connect</span>
            <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg] scale-90 group-hover:scale-100 ${isDark ? 'bg-white text-black' : 'bg-black text-white'
              }`}>
              <ArrowRight size={16} />
            </span>
          </button>

          <button
            onClick={copyEmail}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-colors text-sm font-medium tracking-wide ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
          >
            <Mail size={16} />
            omchoksi108@gmail.com
          </button>
        </motion.div>
      </div>
    </section>
  );
}
