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
      {/* Theme-Aware Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
        {/* Subtle Stars (only in dark mode) */}
        {isDark && stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}

        {/* Perfect Glowing Horizon - Planet Edge Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-0 pointer-events-none">

          {/* Ambient Glows - BEHIND the planet */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex flex-col justify-end overflow-hidden z-0">
            {isDark ? (
              <>
                {/* Deep neutral/blue core glow */}
                <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[140%] h-[500px] bg-blue-900/10 blur-[120px] rounded-[100%]" />
                {/* Blueish rim glow - very subtle */}
                <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-sky-900/10 blur-[90px] rounded-[100%]" />
              </>
            ) : (
              <>
                <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[140%] h-[500px] bg-gray-100/40 blur-[120px] rounded-[100%]" />
                <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-blue-50/20 blur-[90px] rounded-[100%]" />
              </>
            )}
          </div>

          {/* SVG Shape - The Planet Surface (Body + Rim) */}
          <div className="absolute bottom-0 left-0 right-0 h-[100%] z-10 w-full translate-y-[20%]"> {/* Pushed down by 20% to lower horizon */}
            <svg
              viewBox="0 0 1440 320"
              className="w-full h-full block"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Body Gradient - The solid mass of the planet */}
                <linearGradient id={isDark ? "planetBodyDark" : "planetBodyLight"} x1="0%" y1="0%" x2="0%" y2="100%">
                  {isDark ? (
                    <>
                      <stop offset="0%" stopColor="#0a0a0f" />
                      <stop offset="100%" stopColor="#0a0a0f" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </>
                  )}
                </linearGradient>

                {/* Rim Light Gradient - The glowing edge */}
                {/* Using a gradient that fades to transparent at the ends would be tricky with stroke, 
                    so we simulate it by using a linear gradient from top to bottom but we want left-right fade too.
                    Better to use a mask or just a clean top-down gradient that is sharp. 
                    Actually, let's keep it simple: Bright top, transparent bottom. */}
                <linearGradient id={isDark ? "rimLightDark" : "rimLightLight"} x1="0%" y1="0%" x2="0%" y2="100%">
                  {isDark ? (
                    <>
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                      <stop offset="5%" stopColor="rgba(200, 220, 255, 0.4)" />
                      <stop offset="100%" stopColor="transparent" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </>
                  )}
                </linearGradient>
              </defs>

              {/* The Planet Body - Solid fill to block background */}
              {/* Lowered the top point from 160 to 200 to be flatter */}
              <path
                d="M0,320 L0,220 Q720,120 1440,220 L1440,320 Z"
                fill={`url(#${isDark ? "planetBodyDark" : "planetBodyLight"})`}
              />

              {/* The Rim Light - Overlay stroke/fill at the top edge */}
              <path
                d="M0,320 L0,220 Q720,120 1440,220 L1440,320 Z"
                fill="none"
                stroke={`url(#${isDark ? "rimLightDark" : "rimLightLight"})`}
                strokeWidth={isDark ? "1.5" : "1"}
              />

              {/* Optional: Add a second fainter rim for the 'halo' effect */}
              {isDark && (
                <path
                  d="M0,320 L0,220 Q720,120 1440,220 L1440,320 Z"
                  fill="none"
                  stroke="rgba(100, 150, 255, 0.3)"
                  strokeWidth="8" // Wider, fainter outer glow
                  style={{ filter: 'blur(4px)' }}
                />
              )}
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
