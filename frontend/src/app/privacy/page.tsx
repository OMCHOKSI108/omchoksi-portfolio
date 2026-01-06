"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6">
                <div className="text-center space-y-6 max-w-2xl">
                    <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-[var(--foreground)] opacity-50" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[var(--foreground)]">
                        Privacy Policy
                    </h1>
                    <div className="text-[var(--muted-foreground)] text-left space-y-4 max-w-xl mx-auto mt-8">
                        <p className="text-lg">
                            Your privacy is important to us. This page will outline how we handle any personal information you share with us.
                        </p>
                        <p>
                            Currently, this website does not collect personal data beyond what is voluntarily provided through contact forms. We use standard analytics tools to understand site usage.
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
