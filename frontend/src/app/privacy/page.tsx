"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Shield, User, BarChart3, Lock, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
            {/* Background Texture with PRIVACY Text */}
            <div className="fixed inset-0 z-0">
                {/* Large PRIVACY Text Background */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="font-serif-display font-bold text-[var(--foreground)] opacity-[0.06] dark:opacity-[0.10] select-none"
                         style={{
                             fontSize: '12vw',
                             WebkitTextStroke: '2px var(--foreground)',
                             WebkitTextFillColor: 'transparent',
                             letterSpacing: '0.15em'
                         }}>
                        PRIVACY
                    </div>
                </div>
                
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
                    <img
                        src="/assets/cta.avif"
                        alt="Background Texture"
                        className="w-full h-full object-cover dark:brightness-25 dark:contrast-150"
                    />
                    <div className="absolute inset-0 bg-transparent dark:bg-black/30" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                {/* MAIN CONTAINER */}
                <section className="relative w-full min-h-screen py-32 bg-[var(--background)] font-sans text-[var(--foreground)]">
                    {/* LEFT DECORATIVE PILLAR - Unique patterns for privacy page */}
                    <div className="absolute left-[15%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
                        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="privacyHexPattern" patternUnits="userSpaceOnUse" width="12" height="10.4">
                                        <path d="M6 0 L12 3 L12 7.4 L6 10.4 L0 7.4 L0 3 Z" fill="none" stroke="var(--foreground)" strokeWidth="0.5" className="opacity-20 dark:opacity-30" />
                                    </pattern>
                                    <pattern id="privacyWavePattern" patternUnits="userSpaceOnUse" width="20" height="10">
                                        <path d="M0 5 Q 5 0, 10 5 T 20 5" stroke="var(--foreground)" strokeWidth="1" fill="none" className="opacity-15 dark:opacity-25" />
                                    </pattern>
                                </defs>
                                <rect x="0" y="0" width="32" height="1000" fill="url(#privacyHexPattern)" />
                                <rect x="32" y="0" width="32" height="1000" fill="url(#privacyWavePattern)" />
                                <circle cx="32" cy="200" r="3" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                                <circle cx="32" cy="400" r="3" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                                <circle cx="32" cy="600" r="3" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT DECORATIVE PILLAR - Mirror with variations */}
                    <div className="absolute right-[15%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
                        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="privacySquarePattern" patternUnits="userSpaceOnUse" width="8" height="8">
                                        <rect x="0" y="0" width="7" height="7" fill="none" stroke="var(--foreground)" strokeWidth="0.5" className="opacity-20 dark:opacity-30" />
                                    </pattern>
                                    <pattern id="privacyZigzag" patternUnits="userSpaceOnUse" width="10" height="20">
                                        <path d="M0 0 L5 10 L0 20" stroke="var(--foreground)" strokeWidth="1" fill="none" className="opacity-15 dark:opacity-25" />
                                    </pattern>
                                </defs>
                                <rect x="0" y="0" width="32" height="1000" fill="url(#privacySquarePattern)" />
                                <rect x="32" y="0" width="32" height="1000" fill="url(#privacyZigzag)" />
                                <rect x="30" y="250" width="4" height="30" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                                <rect x="30" y="450" width="4" height="30" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                                <rect x="30" y="650" width="4" height="30" fill="var(--foreground)" className="opacity-10 dark:opacity-15" />
                            </svg>
                        </div>
                    </div>

                    {/* Decorative corner shields - unique to privacy page */}
                    <div className="absolute top-32 left-[12%] hidden lg:block">
                        <Shield className="w-4 h-4 text-[var(--foreground)] opacity-20" />
                    </div>
                    <div className="absolute top-32 right-[12%] hidden lg:block">
                        <Shield className="w-4 h-4 text-[var(--foreground)] opacity-20" />
                    </div>

                    {/* Inject Fonts */}
                    <style dangerouslySetInnerHTML={{ __html: `
                        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
                        .font-serif-display { font-family: 'Playfair Display', serif; }
                    `}} />

                    {/* Background Noise */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    <div className="max-w-4xl mx-auto px-6 relative z-10">

                        {/* Header Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center text-center mb-16 space-y-4"
                        >
                            <span className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
                                Privacy & Data
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif-display text-[var(--foreground)] leading-tight">
                                Privacy Policy
                            </h1>
                            <p className="text-[var(--muted-foreground)] max-w-2xl text-lg leading-relaxed">
                                This page explains what limited information is collected when you use this site, how it is used, and what choices you have. The goal is to keep things simple and respectful of your privacy.
                            </p>
                        </motion.div>

                        {/* Content Sections */}
                        <div className="space-y-16">
                            {/* Section 1: Data Collection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">01</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Data Collection</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <h3 className="font-bold text-sm uppercase tracking-wider">Authentication</h3>
                                            </div>
                                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                If this site offers sign-in in the future, basic profile details such as your <span className="font-semibold text-[var(--foreground)]">name, email, and avatar</span> may be used to show your identity on interactive features.
                                            </p>
                                        </div>
                                        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                                    <Lock className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <h3 className="font-bold text-sm uppercase tracking-wider">Security Logs</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                For security and reliability, infrastructure providers may temporarily log technical details like your <span className="font-semibold text-[var(--foreground)]">IP address and browser type</span>. This information is used to keep the site running smoothly and to prevent abuse.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 2: Analytics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">02</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Analytics</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                                        Basic, aggregated analytics may be used to understand which pages are popular and to detect issues. This does not aim to build an individual profile of you.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="border border-[var(--border)] rounded-xl p-4 flex items-start gap-3">
                                            <BarChart3 className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold text-sm mb-1">Vercel Analytics</h3>
                                                <p className="text-sm text-[var(--muted-foreground)]">Measures general performance and reliability metrics so that the site stays fast and available.</p>
                                            </div>
                                        </div>
                                        <div className="border border-[var(--border)] rounded-xl p-4 flex items-start gap-3">
                                            <BarChart3 className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold text-sm mb-1">Google Analytics</h3>
                                                <p className="text-sm text-[var(--muted-foreground)]">May record things like page views and approximate location. Where possible, IP anonymization or similar safeguards are used.</p>
                                            </div>
                                        </div>
                                        <div className="border border-[var(--border)] rounded-xl p-4 flex items-start gap-3">
                                            <BarChart3 className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-semibold text-sm mb-1">PostHog</h3>
                                                <p className="text-sm text-[var(--muted-foreground)]">Helps understand which features are used so I can decide what to keep improving.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 3: Your Rights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">03</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Your Rights</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-2">Ownership & Deletion</h3>
                                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                    If you ever share personal information with me through this site and later want it removed, you can reach out and request deletion. I will make reasonable efforts to erase that data from active systems.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Effective Date */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="border-t border-[var(--border)] pt-8 mt-16"
                            >
                                <div className="bg-[var(--muted)]/30 border border-[var(--border)] rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-[var(--primary)]" />
                                        <span className="text-sm font-medium">Last updated NOV 30, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                                        <span className="uppercase tracking-wider font-bold text-xs">General Inquiries</span>
                                        <Mail className="w-4 h-4" />
                                        <a href="mailto:omchoksi108@gmail.com" className="text-blue-500 hover:text-blue-600 font-medium">
                                            omchoksi108@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
