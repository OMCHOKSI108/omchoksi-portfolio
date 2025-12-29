"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { main } from "framer-motion/client";

export default function AttributionPage() {
    const inspirations = [
        {
            id: "01",
            name: "Lee Rob",
            role: "Architecture & DX",
            url: "https://leerob.io"
        },
        {
            id: "02",
            name: "Rauno Freiberg",
            role: "Interaction & Motion",
            url: "https://rauno.me"
        },
        {
            id: "03",
            name: "Paco Coursey",
            role: "Interface Craft",
            url: "https://paco.me"
        },
        {
            id: "04",
            name: "Shu Ding",
            role: "Visual Engineering",
            url: "https://shud.in"
        },
        {
            id: "05",
            name: "Brian Lovin",
            role: "Product Details",
            url: "https://brianlovin.com"
        },
        {
            id: "06",
            name: "Pedro Duarte",
            role: "Motion Primitives",
            url: "https://ped.ro"
        }
    ];

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--primary)]/20 selection:text-[var(--foreground)] relative overflow-hidden transition-colors duration-300">

            {/* Grid Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none h-full w-full">
                <div className="absolute h-full w-full bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1 flex justify-center w-full max-w-[1400px] mx-auto">

                    {/* Left Stripe Border */}
                    <div className="hidden md:block w-12 border-r border-[var(--border)] bg-[linear-gradient(45deg,transparent_25%,var(--border)_25%,var(--border)_50%,transparent_50%,transparent_75%,var(--border)_75%,var(--border)_100%)] bg-[size:8px_8px] opacity-20"></div>

                    <div className="flex-1 max-w-[1200px] px-6 pt-32 pb-20">

                        {/* Main Header */}
                        <div className="text-center py-20 mb-20 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest mb-6 block">Attribution</span>
                                <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 text-[var(--foreground)] leading-[1.1]">
                                    Journey to create this <br />
                                    <span className="italic bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent px-2">
                                        website
                                    </span>
                                </h1>
                            </motion.div>
                        </div>

                        <div className="space-y-32 border-t border-[var(--border)] pt-20">

                            {/* 01 The Journey */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                                <div className="md:col-span-3">
                                    <span className="text-xs font-mono text-[var(--muted-foreground)] block mb-2">01</span>
                                    <h2 className="text-2xl font-serif text-[var(--foreground)]">The Journey</h2>
                                </div>
                                <div className="md:col-span-9 space-y-8 text-lg text-[var(--muted-foreground)] leading-relaxed font-light">
                                    <p>
                                        It started in 2023 as a <strong className="text-[var(--foreground)] font-medium">simple Next.js experiment</strong>. The code was messy, the design was derivative, but it was mine.
                                    </p>
                                    <p>
                                        Fast forward to 2025. The web had evolved, and so had I. I wanted a digital home that felt 'alive'. I tore it down to the studs and rebuilt it with a <strong className="text-[var(--foreground)] font-medium">focus on craftsmanship</strong>.
                                    </p>
                                    <p>
                                        This new iteration is a statement on how I believe the web should be: <strong className="text-[var(--foreground)] font-medium">performant, accessible, and aesthetically refined</strong>.
                                    </p>
                                </div>
                            </div>

                            {/* 02 Inspirations */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[var(--border)] pt-20">
                                <div className="md:col-span-3">
                                    <span className="text-xs font-mono text-[var(--muted-foreground)] block mb-2">02</span>
                                    <h2 className="text-2xl font-serif text-[var(--foreground)]">Inspirations</h2>
                                </div>
                                <div className="md:col-span-9">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {inspirations.map((item) => (
                                            <a
                                                key={item.id}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group block p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--foreground)]/50 transition-all hover:bg-[var(--muted)]/50"
                                            >
                                                <div className="flex justify-between items-start mb-8">
                                                    <span className="text-xs font-mono text-[var(--muted-foreground)]">{item.id}</span>
                                                    <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium text-[var(--foreground)] transition-colors mb-1">{item.name}</h3>
                                                    <p className="text-sm text-[var(--muted-foreground)]">{item.role}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 03 Colophon */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[var(--border)] pt-20">
                                <div className="md:col-span-3">
                                    <span className="text-xs font-mono text-[var(--muted-foreground)] block mb-2">03</span>
                                    <h2 className="text-2xl font-serif text-[var(--foreground)]">Colophon</h2>
                                </div>
                                <div className="md:col-span-9">
                                    {/* Tech Stack Box */}
                                    <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] mb-8">
                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Frontend</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Backend</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {['PostgreSQL', 'Prisma ORM'].map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Infrastructure</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Vercel', 'Cloudflare'].map(tag => (
                                                        <span key={tag} className="px-3 py-1.5 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crafted By Footer */}
                                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-8 border-t border-[var(--border)] border-dashed mb-20">
                                        <div>
                                            <span className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-widest mb-2 block">Crafted by</span>
                                            <h3 className="text-3xl font-medium text-[var(--foreground)]">Om Choksi</h3>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-[var(--muted-foreground)] block mb-1">Available for freelance</span>
                                            <a href="mailto:omchoksi108@gmail.com" className="text-sm font-medium text-[var(--foreground)] hover:underline decoration-[var(--muted-foreground)] underline-offset-4">
                                                omchoksi108@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
