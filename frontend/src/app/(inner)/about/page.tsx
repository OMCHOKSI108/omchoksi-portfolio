"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Experience from "@/components/experience";
import AboutMe from "@/components/about-me";
import FloatingThemeToggle from "@/components/floating-theme-toggle";

export default function About() {
  return (
    <div className="w-full">

      <Navbar />

      <main className="pt-24">
        <AboutMe />
        <Experience />
      </main>

      <Footer />
      <FloatingThemeToggle />
    </div>
  );
}