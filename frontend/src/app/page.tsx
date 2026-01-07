"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import MagicProfile from "@/components/magic-profile";
import BentoGridRow from "@/components/bento-grid-row";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import SecretSauce from "@/components/SecretSauce";
import Marquee from "@/components/marquee";
import Testimonials from "@/components/testimonials";
import Blog from "@/components/blog";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";
import FloatingThemeToggle from "@/components/floating-theme-toggle";
import Certifications from "@/components/certifications";
import AboutMe from "@/components/about-me";

export default function Home() {
  const [showQuickConnect, setShowQuickConnect] = useState(false);

  useEffect(() => {
    const handleOpenQuickConnect = () => setShowQuickConnect(true);
    window.addEventListener('open-quick-connect', handleOpenQuickConnect);
    return () => window.removeEventListener('open-quick-connect', handleOpenQuickConnect);
  }, []);

  return (
    <main className="min-h-screen relative bg-[var(--background)]">
      <FloatingElements />
      <Navbar onContactClick={() => setShowQuickConnect(true)} />
      <Hero />
      <BentoGridRow
        showQuickConnect={showQuickConnect}
        onCloseQuickConnect={() => setShowQuickConnect(false)}
        onOpenQuickConnect={() => setShowQuickConnect(true)}
      />
      <AboutMe />
      <Projects />
      <Certifications />
      <SecretSauce />
      <Marquee />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
