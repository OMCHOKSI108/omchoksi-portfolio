"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FileText, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
            {/* Background Texture with TERMS Text */}
            <div className="fixed inset-0 z-0">
                {/* Large TERMS Text Background */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="font-serif-display font-bold text-[var(--foreground)] opacity-[0.08] dark:opacity-[0.12] select-none"
                         style={{
                             fontSize: '15vw',
                             WebkitTextStroke: '2px var(--foreground)',
                             WebkitTextFillColor: 'transparent',
                             letterSpacing: '0.15em'
                         }}>
                        TERMS
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
                    {/* LEFT DECORATIVE PILLAR - Closer to center */}
                    <div className="absolute left-[15%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
                        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="leftDotPattern" patternUnits="userSpaceOnUse" width="8" height="8">
                                        <circle cx="4" cy="4" r="1" fill="var(--foreground)" className="opacity-20 dark:opacity-30" />
                                    </pattern>
                                    <pattern id="leftVerticalLines" patternUnits="userSpaceOnUse" width="6" height="20">
                                        <line x1="3" y1="0" x2="3" y2="20" stroke="var(--foreground)" strokeWidth="2" className="opacity-15 dark:opacity-25" />
                                    </pattern>
                                </defs>
                                <rect x="0" y="0" width="32" height="1000" fill="url(#leftDotPattern)" />
                                <rect x="32" y="0" width="32" height="1000" fill="url(#leftVerticalLines)" />
                                <path d="M 0,100 Q 32,150 0,200 T 0,400 T 0,600 T 0,800" stroke="var(--foreground)" strokeWidth="1" fill="none" className="opacity-10 dark:opacity-20" />
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT DECORATIVE PILLAR - Closer to center */}
                    <div className="absolute right-[15%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
                        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="rightCrossPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                                        <line x1="5" y1="0" x2="5" y2="10" stroke="var(--foreground)" strokeWidth="1" className="opacity-15 dark:opacity-25" />
                                        <line x1="0" y1="5" x2="10" y2="5" stroke="var(--foreground)" strokeWidth="1" className="opacity-15 dark:opacity-25" />
                                    </pattern>
                                    <pattern id="rightDiagonalGrid" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(30)">
                                        <line x1="0" y1="0" x2="0" y2="12" stroke="var(--foreground)" strokeWidth="1.5" className="opacity-20 dark:opacity-30" />
                                    </pattern>
                                </defs>
                                <rect x="0" y="0" width="32" height="1000" fill="url(#rightCrossPattern)" />
                                <rect x="32" y="0" width="32" height="1000" fill="url(#rightDiagonalGrid)" />
                                <path d="M 64,150 Q 32,200 64,250 T 64,450 T 64,650 T 64,850" stroke="var(--foreground)" strokeWidth="1" fill="none" className="opacity-10 dark:opacity-20" />
                            </svg>
                        </div>
                    </div>

                    {/* Decorative corner elements - unique to terms page */}
                    <div className="absolute top-32 left-[12%] w-3 h-3 border-l-2 border-t-2 border-[var(--foreground)]/20 hidden lg:block" />
                    <div className="absolute top-32 right-[12%] w-3 h-3 border-r-2 border-t-2 border-[var(--foreground)]/20 hidden lg:block" />
                    <div className="absolute bottom-32 left-[12%] w-3 h-3 border-l-2 border-b-2 border-[var(--foreground)]/20 hidden lg:block" />
                    <div className="absolute bottom-32 right-[12%] w-3 h-3 border-r-2 border-b-2 border-[var(--foreground)]/20 hidden lg:block" />

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
                                LEGAL AGREEMENT
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif-display text-[var(--foreground)] leading-tight">
                                Terms of Use
                            </h1>
                        </motion.div>

                        {/* Content Sections */}
                        <div className="space-y-16">
                            {/* Section 1: General Provisions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">01</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">General Provisions</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                                        These Terms of Use explain how you may access and use this personal website, its content, and any related services. By browsing or using the site, you agree to follow these Terms. If you do not agree, you should stop using the site immediately.
                                    </p>
                                    <div className="bg-[var(--muted)]/30 border border-[var(--border)] rounded-xl p-4 flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-sm mb-1">Effective Date</h3>
                                            <p className="text-sm text-[var(--muted-foreground)]">These Terms were last updated on JAN 01, 2025 and may be revised from time to time.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 2: Proprietary Rights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">02</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Proprietary Rights</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                                        Unless otherwise noted, the content on this website (including text, visuals, and code shown on the frontend) is created by Om Choksi. You may not claim authorship of this work or present it as your own.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                                    <span className="text-red-500 text-lg">⊗</span>
                                                </div>
                                                <h3 className="font-bold text-sm uppercase tracking-wider">Restrictions on Use</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                You may not reuse the design or code of this site for commercial projects without prior written permission. Small snippets for learning or inspiration are fine, but direct copying of entire pages or flows is not allowed.
                                            </p>
                                        </div>
                                        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                                    <span className="text-green-500 text-lg">💡</span>
                                                </div>
                                                <h3 className="font-bold text-sm uppercase tracking-wider">Limited Use</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                You are welcome to look at how this site is structured and learn from it for your own projects. If you build something heavily inspired by this work, a credit link to this portfolio is appreciated but not required.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Section 3: Disclaimers */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <span className="text-sm font-bold text-[var(--muted-foreground)] mt-1">03</span>
                                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Disclaimers</h2>
                                </div>
                                <div className="ml-12 space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="border border-[var(--border)] rounded-xl p-6">
                                            <div className="flex items-start gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                                <h3 className="font-semibold text-sm">User Generated Content</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                Certain areas of the Site (e.g., Guestbook) may allow users to post content. You agree not to post material that is unlawful, defamatory, or abusive. We reserve the right to remove any content at our sole discretion and without liability.
                                            </p>
                                        </div>
                                        <div className="border border-[var(--border)] rounded-xl p-6">
                                            <div className="flex items-start gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                                <h3 className="font-semibold text-sm">No Warranty</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                This Site is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of the Site or the information, content or materials included therein.
                                            </p>
                                        </div>
                                        <div className="border border-[var(--border)] rounded-xl p-6">
                                            <div className="flex items-start gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                                <h3 className="font-semibold text-sm">Limitation of Liability</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                In no event shall Om Choksi be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
                                            </p>
                                        </div>
                                        <div className="border border-[var(--border)] rounded-xl p-6">
                                            <div className="flex items-start gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                                                <h3 className="font-semibold text-sm">External Links</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                                This Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Footer Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="border-t border-[var(--border)] pt-8 mt-16"
                            >
                                <div className="bg-[var(--muted)]/30 rounded-xl p-6 text-center">
                                    <p className="text-sm font-bold tracking-wider uppercase text-[var(--muted-foreground)] mb-2">Legal Inquiries</p>
                                    <a href="mailto:omchoksi108@gmail.com" className="text-blue-500 hover:text-blue-600 font-medium">
                                        omchoksi108@gmail.com
                                    </a>
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
