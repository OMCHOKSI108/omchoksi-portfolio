"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FileText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6">
                <div className="text-center space-y-6 max-w-2xl">
                    <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-[var(--foreground)] opacity-50" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[var(--foreground)]">
                        Terms of Use
                    </h1>
                    <div className="text-[var(--muted-foreground)] text-left space-y-4 max-w-xl mx-auto mt-8">
                        <p className="text-lg">
                            Welcome to my portfolio. By using this website, you agree to the standard terms of use.
                        </p>
                        <p>
                            All content on this site is my own unless otherwise stated. Please do not reproduce without permission.
                        </p>
                        <p className="text-sm italic opacity-70">
                            Last updated: January 2025
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
