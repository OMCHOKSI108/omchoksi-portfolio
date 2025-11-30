"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Code,
  Palette,
  Zap,
  Figma,
  FileText,
  Coffee,
  Globe,
  Layers,
  Wrench,
  Star,
  Heart,
  Atom,
  Code2,
  Braces,
  Hash,
  Type,
  Paintbrush,
  Workflow,
  Box,
  Container,
  Network,
  HardDrive,
  MemoryStick,
  CircuitBoard,
  Cpu,
  Eye,
  Calculator,
  BookOpen,
  MessageSquare,
  Link,
  Bot,
  Search,
  Edit,
  Shuffle,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Monitor as DesktopIcon,
  Smartphone as MobileIcon,
  Shield as SecurityIcon,
  Settings as ConfigIcon,
  GitBranch as BranchIcon,
  Github as GitHubIcon,
  Cloud as CloudIcon,
  Terminal as TerminalIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";
import RotatingFlower from "./rotating-flower";

// Import Sass styles
import "../styles/skills-showcase-theme.scss";

const skillsData = {
  ml_ai: [
    { name: "tensorflow", label: "TensorFlow", icon: Cpu },
    { name: "scikit", label: "Scikit-learn", icon: Cpu },
    { name: "opencv", label: "OpenCV", icon: Eye },
    { name: "pytorch", label: "PyTorch", icon: Zap },
    { name: "pandas", label: "Pandas", icon: DatabaseIcon },
    { name: "numpy", label: "NumPy", icon: Calculator },
    { name: "jupyter", label: "Jupyter", icon: BookOpen },
  ],
  nlp_llm: [
    { name: "transformers", label: "Transformers", icon: MessageSquare },
    { name: "langchain", label: "LangChain", icon: Link },
    { name: "cohere", label: "Cohere API", icon: Bot },
    { name: "embeddings", label: "Embeddings", icon: Layers },
    { name: "semantic", label: "Semantic Search", icon: Search },
    { name: "prompteng", label: "Prompt Engineering", icon: Edit },
    { name: "tone", label: "Tone Transformation", icon: Shuffle },
  ],
  deployment: [
    { name: "fastapi", label: "FastAPI", icon: ServerIcon },
    { name: "flask", label: "Flask", icon: ServerIcon },
    { name: "streamlit", label: "Streamlit", icon: DesktopIcon },
    { name: "postgresql", label: "PostgreSQL", icon: DatabaseIcon },
    { name: "docker", label: "Docker", icon: Container },
    { name: "aws", label: "AWS", icon: CloudIcon },
    { name: "git", label: "Git", icon: BranchIcon },
  ]
};

const skillsRow1 = [
  "tensorflow", "scikit", "opencv", "pytorch", "pandas", "numpy", "jupyter",
  "transformers", "langchain", "cohere", "embeddings", "semantic", "prompteng"
];

const skillsRow2 = [
  "tone", "fastapi", "flask", "streamlit", "postgresql", "docker",
  "aws", "git"
];

const skillIcons: Record<string, React.ComponentType<any>> = {};
// Build the icon mapping from the structured data
Object.values(skillsData).forEach(category => {
  category.forEach(skill => {
    skillIcons[skill.name] = skill.icon;
  });
});

const SkillsShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [progress, setProgress] = useState(0); // 0–1 based on scroll
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingOffset, setFloatingOffset] = useState(0);
  const { theme } = useTheme();

  // Optimized animation loop
  const animate = useCallback(() => {
    setFloatingOffset(prev => prev + 0.01);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // when top hits bottom of screen => 0
      // when center of section hits center of screen => ~0.5
      // when bottom passes top => ~1
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;

      const raw = (start - current) / (start - end);
      const clamped = Math.min(1, Math.max(0, raw));

      setProgress(clamped);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    handleScroll(); // run once

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Map progress (0–1) → opacity & translateY
  // visible and strongest around progress ≈ 0.5
  const distanceFromCenter = Math.abs(progress - 0.5);
  const opacity = Math.max(0, 1 - distanceFromCenter * 3); // fade at edges
  const translateY = (0.5 - progress) * 80; // slight up / down motion

  // Mouse-based floating
  const mouseTranslateX = (mousePosition.x - 0.5) * 20;
  const mouseTranslateY = (mousePosition.y - 0.5) * 20;

  return (
    <section
      ref={sectionRef}
      className="skills-showcase"
    >
      {/* Floating background elements */}
      <div className="skills-showcase__background">
        {/* Large floating orbs */}
        <div
          className="floating-orb floating-orb--large"
          style={{
            transform: `translateY(${translateY * 0.3}px)`,
          }}
        />
        <div
          className="floating-orb floating-orb--medium"
          style={{
            transform: `translateY(${translateY * 0.2}px)`,
          }}
        />
        <div
          className="floating-orb floating-orb--small"
          style={{
            transform: `translateY(${translateY * 0.4}px)`,
          }}
        />

        {/* Small floating particles */}
        <div
          className="floating-particle floating-particle--1"
          style={{
            transform: `translateY(${translateY * 0.1}px)`,
          }}
        />
        <div
          className="floating-particle floating-particle--2"
          style={{
            transform: `translateY(${translateY * 0.15}px)`,
          }}
        />
        <div
          className="floating-particle floating-particle--3"
          style={{
            transform: `translateY(${translateY * 0.25}px)`,
          }}
        />

        {/* Geometric floating shapes */}
        <div
          className="floating-shape floating-shape--square"
          style={{
            transform: `translateY(${translateY * 0.35}px)`,
          }}
        />
        <div
          className="floating-shape floating-shape--circle"
          style={{
            transform: `translateY(${translateY * 0.2}px)`,
          }}
        />
      </div>

      <div className="skills-showcase__content">
        {/* Flower + title block */}
        <div
          className="skills-showcase__title-section"
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
          }}
        >
          {/* Flower image */}
          <div
            className="flower-container flex justify-center"
            style={{
              // subtle parallax for the flower (moves opposite to skills rows)
              transform: `translateY(${translateY * 0.6}px)`,
            }}
          >
            <RotatingFlower
              className="w-48 h-48 md:w-64 md:h-64"
              speedMultiplier={0.8}
              src="/assets/steel-flower.webp"
              alt="3D chrome metallic flower logo"
            />
            {/* Floating particles around flower */}
            <div className="flower-particles">
              <div className="particle particle--1" style={{ animationDelay: '0s' }} />
              <div className="particle particle--2" style={{ animationDelay: '1s' }} />
              <div className="particle particle--3" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          <span className="title-label">
            My Skills
          </span>

          <h2 className="main-title">
            The Secret{" "}
            <span className="title-highlight">
              Sauce
            </span>
          </h2>

          <p className="title-description">
            A curated collection of technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills icons */}
        <div className="skills-showcase__skills-container">
          {/* row 1 */}
          <div className="skills-row">
            <IconRow
              icons={skillsRow1}
              curve="up"
              progress={progress}
              mousePosition={mousePosition}
              translateY={-translateY}
              floatingOffset={floatingOffset}
            />
          </div>
          {/* row 2 */}
          <div className="skills-row">
            <IconRow
              icons={skillsRow2}
              curve="down"
              progress={progress}
              mousePosition={mousePosition}
              translateY={-translateY}
              floatingOffset={floatingOffset}
            />
          </div>
        </div>

        {/* Skills Categories */}
        <div className="skills-categories">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">
                {category === 'frontend' && 'Frontend'}
                {category === 'backend' && 'Backend'}
                {category === 'tools' && 'Tools & Platforms'}
              </h3>
              <div className="category-skills">
                {skills.map((skill) => (
                  <div key={skill.name} className="category-skill">
                    <skill.icon className="category-skill-icon" />
                    <span className="category-skill-label">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

type IconRowProps = {
  icons: string[];
  curve: "up" | "down";
  progress: number;
  mousePosition: { x: number; y: number };
  translateY: number;
  floatingOffset: number;
};

const IconRow: React.FC<IconRowProps> = ({
  icons,
  curve,
  progress,
  mousePosition,
  translateY,
  floatingOffset
}) => {
  // small curve by translateY + rotateX
  const baseTranslateY = curve === "up" ? 6 : -2;
  const rotateX = curve === "up" ? 8 : 5;

  // Enhanced floating calculations
  const rowTranslateY = translateY * (curve === "up" ? 0.8 : 1.2);
  const mouseTranslateX = (mousePosition.x - 0.5) * (curve === "up" ? 15 : -10);
  const mouseTranslateY = (mousePosition.y - 0.5) * (curve === "up" ? 10 : -8);

  // Dynamic spacing based on scroll progress
  // When progress is low (0), icons are spread far apart
  // When progress is high (1), icons are close together
  const baseSpacing = 100; // Base spacing between icons
  const maxSpacing = 100; // Maximum spacing when fully scrolled up
  const minSpacing = -50; // Minimum spacing when fully scrolled down (negative for significant overlap)

  // Calculate spacing: high spacing when progress is low, low spacing when progress is high
  const spacing = maxSpacing - (progress * (maxSpacing - minSpacing));
  const scale = 0.9 + (progress * 0.2);

  return (
    <div
      className="icon-row"
      style={{
        transform: `
          translateY(${baseTranslateY + rowTranslateY}px)
          translate(${mouseTranslateX}px, ${mouseTranslateY}px)
          scale(${scale})
          perspective(800px)
          rotateX(${rotateX}deg)
        `,
        transformOrigin: "center center",
        transition: "transform 0.2s ease-out",
        display: 'grid',
        gridTemplateColumns: `repeat(${icons.length}, minmax(60px, 1fr))`,
        gridGap: `${spacing}px`,
        justifyItems: 'center',
        alignItems: 'center',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {icons.map((icon, idx) => {
        const IconComponent = skillIcons[icon] || Code;
        // Get skill label from structured data
        const skillData = Object.values(skillsData).flat().find(s => s.name === icon);
        const skillLabel = skillData?.label || icon;

        // Optimized floating calculations using floatingOffset
        const iconDelay = idx * 0.1;
        const iconTranslateY = Math.sin(floatingOffset + iconDelay) * 8;
        const iconRotate = Math.sin(floatingOffset * 0.5 + iconDelay) * 3;

        return (
          <div
            key={`${icon}-${idx}`}
            className="skill-icon"
            style={{
              transform: `translateY(${iconTranslateY}px) rotate(${iconRotate}deg)`,
              animation: `icon-float ${3 + idx * 0.5}s ease-in-out infinite`,
              animationDelay: `${iconDelay}s`,
              transition: 'all 0.3s ease-out',
            }}
            title={skillLabel}
          >
            <IconComponent className="icon" size={48} />
            {/* Floating particles around icons */}
            <div className="icon-particles">
              <div
                className="particle particle--1"
                style={{ animationDelay: '0s' }}
              />
              <div
                className="particle particle--2"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsShowcase;

// Add CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes gentle-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  @keyframes icon-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-3px) rotate(1deg); }
    50% { transform: translateY(-6px) rotate(0deg); }
    75% { transform: translateY(-3px) rotate(-1deg); }
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}