"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

// Card Data
const CARDS = [
  {
    id: 1,
    title: "Machine Learning & Applied AI",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    rotation: -5
  },
  {
    id: 2,
    title: "Cybersecurity & Intelligent Threat Detection",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    rotation: 0
  },
  {
    id: 3,
    title: "Autonomous Systems & Reinforcement Learning",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop",
    rotation: 5
  }
];

export default function AboutMe() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const getCardStyle = (index: number) => {
    const total = CARDS.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) {
      return { zIndex: 10, x: 0, rotate: 0, scale: 1, opacity: 1, filter: "brightness(1)" };
    } else if (diff === 1) {
      return { zIndex: 5, x: 120, rotate: 10, scale: 0.85, opacity: 0.6, filter: "brightness(0.7)" };
    } else {
      return { zIndex: 5, x: -120, rotate: -10, scale: 0.85, opacity: 0.6, filter: "brightness(0.7)" };
    }
  };

  return (
    <section className="relative w-full py-20 bg-[var(--background)] overflow-hidden">
      
      {/* Inject Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* BACKGROUND TEXTURE */}
        {/* Background texture removed to eliminate foggy overlay */}

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- Left Column: Text Content --- */}
        <div className="space-y-8">
          
          <div className="space-y-4">
            {/* SUBHEADER */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase"
            >
              More About Me
            </motion.span>
            
            {/* HEADLINE */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif-display text-[var(--foreground)] leading-[1.05]"
            >
              <span className="block">I'm Om, an</span>
              <span className="block mt-2 font-semibold text-[var(--foreground)]">AI & Machine Learning Engineer</span>
            </motion.h2>
          </div>

          {/* PARAGRAPHS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-[var(--muted-foreground)] text-lg leading-relaxed font-sans"
          >
            <p>
              I'm Om Choksi — an AI & Machine Learning engineer focused on building deployable, production-ready intelligence systems. I specialize in transforming raw datasets into scalable ML products through end-to-end engineering, including data pipelines, model architecture, evaluation, and deployment.
            </p>
            <p>
              My work spans ML model development, deep learning, computer vision, NLP, LLM-powered automation, full-stack ML application deployment, and data storytelling for business decisions. I believe AI is only successful when people — not just models — can use it.
            </p>

            <p className="text-[var(--foreground)] font-medium">
              I work with curiosity, speed, and product-thinking: every project I build must solve a real problem and make someone's workflow better.
            </p>
          </motion.div>

          {/* SOCIAL ICONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-6 pt-4"
          >
            <a href="https://linkedin.com/in/omchoksi" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors transform hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/omchoksi108" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors transform hover:scale-110">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://kaggle.com/omchoksi04" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors transform hover:scale-110">
              <span className="text-sm font-bold">K</span>
            </a>
            <a href="https://x.com/ChoksiOm" target="_blank" rel="noopener noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* --- Right Column: Image Stack --- */}
        <div className="relative h-[500px] flex flex-col items-center justify-center">
            
            <div className="relative w-[300px] h-[400px] flex items-center justify-center cursor-pointer" onClick={nextCard}>
              <AnimatePresence mode="popLayout">
                {CARDS.map((card, index) => {
                  const style = getCardStyle(index);
                  
                  return (
                    <motion.div
                      key={card.id}
                      layoutId={`card-${card.id}`}
                      animate={style}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute top-0 w-full h-full rounded-[30px] overflow-hidden shadow-2xl bg-black"
                      style={{
                        transformOrigin: "bottom center"
                      }}
                    >
                        <img 
                            src={card.src} 
                            alt={card.title} 
                            className="w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* CAPTION */}
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-12 text-center"
            >
                <span className="text-xl font-medium text-[var(--foreground)] font-serif-display">
                    {CARDS[activeIndex].title}
                </span>
            </motion.div>

        </div>

      </div>
    </section>
  );
}