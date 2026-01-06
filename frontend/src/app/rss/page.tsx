"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Rss } from "lucide-react";

export default function RSSPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6">
                <div className="text-center space-y-6 max-w-lg">
                    <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Rss className="w-10 h-10 text-[var(--foreground)] opacity-50" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[var(--foreground)]">
                        RSS Feed
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                        The RSS feed for the blog is being configured.
                        Once active, you'll be able to subscribe to updates here.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
