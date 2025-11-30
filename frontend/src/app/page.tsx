"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import MagicProfile from "@/components/magic-profile";
import BentoGridRow from "@/components/bento-grid-row";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import SkillsShowcase from "@/components/skills-showcase";
import Marquee from "@/components/marquee";
import Testimonials from "@/components/testimonials";
import Blog from "@/components/blog";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";
import FloatingThemeToggle from "@/components/floating-theme-toggle";

export default function Home() {
  const [showQuickConnect, setShowQuickConnect] = useState(false);

  return (
    <main className="min-h-screen relative bg-[var(--background)]">
      <FloatingElements />
      <Navbar onContactClick={() => setShowQuickConnect(true)} />
      <Hero />
      <MagicProfile />
      <BentoGridRow 
        showQuickConnect={showQuickConnect} 
        onCloseQuickConnect={() => setShowQuickConnect(false)}
        onOpenQuickConnect={() => setShowQuickConnect(true)}
      />
      <Projects />
    
      <SkillsShowcase />
      <Marquee />
      <Testimonials />
      <Blog />
      <Footer/>
      <FloatingThemeToggle />
    </main>
  );
}
