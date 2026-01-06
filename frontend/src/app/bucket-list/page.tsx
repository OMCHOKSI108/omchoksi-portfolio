"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Sparkles } from "lucide-react";

export default function BucketListPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6">
                <div className="text-center space-y-6 max-w-lg">
                    <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-[var(--foreground)] opacity-50" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[var(--foreground)]">
                        Bucket List
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-lg leading-relaxed">
                        A list of dreams, goals, and adventures I'm working towards.
                        Updating this section soon!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
