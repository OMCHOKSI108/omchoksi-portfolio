"use client";

import Navbar from "@/components/navbar";
import StatsDashboard from "@/components/stats-dashboard";
import Footer from "@/components/footer";
import FloatingThemeToggle from "@/components/floating-theme-toggle";

export default function StatsPage() {
    return (
        <div className="w-full min-h-screen bg-[var(--background)]">
            <Navbar />
            <main className="pt-20 pb-20">
                <StatsDashboard />
            </main>
            <Footer />
            <FloatingThemeToggle />
        </div>
    );
}
