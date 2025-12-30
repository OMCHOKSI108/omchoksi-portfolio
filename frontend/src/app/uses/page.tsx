"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UsesPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--background)] relative overflow-hidden text-[var(--foreground)]">

            {/* Background decoration - subtle circular lines similar to image */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.08]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-current rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-current rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-current rounded-full" />
                {/* Cross lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-current" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-current" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">

                {/* Tag */}
                <div className="mb-8 px-4 py-1.5 rounded-full border border-[var(--border)] text-[10px] tracking-[0.2em] font-medium text-[var(--muted-foreground)] bg-[var(--card)]/50 backdrop-blur-sm uppercase">
                    System // Uses
                </div>

                {/* Main Headline with Calligraphy Effect */}
                <h1 className="text-4xl md:text-7xl font-sans font-bold tracking-tight leading-[1.1] mb-6">
                    Tools I use to <br />
                    <span className="font-serif italic font-light text-5xl md:text-8xl block mt-2">create & build</span>
                </h1>

                <p className="text-[var(--muted-foreground)] text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
                    A curated list of the software, hardware, and technologies that power my workflow and digital life.
                </p>

                {/* Go Home Button */}
                <Link
                    href="/"
                    className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium transition-transform hover:scale-105"
                >
                    <span>Go Home</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
