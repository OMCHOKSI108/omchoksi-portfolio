"use client";

import { useEffect, useState, useRef } from "react";
import type { WheelEvent as ReactWheelEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Moon, Sun, Home, User, Folder, FileText,
    Calendar, Laptop, Award, Link as LinkIcon,
    Github, ArrowRight, Server
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

interface CommandMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

interface CommandItem {
    icon: any;
    title: string;
    href: string;
    group: "PAGES" | "CONNECT" | "LEGAL";
    external?: boolean;
}

const ITEMS: CommandItem[] = [
    { icon: Home, title: "Home", href: "/", group: "PAGES" },
    { icon: User, title: "About", href: "/about", group: "PAGES" },
    { icon: Folder, title: "Projects", href: "/work", group: "PAGES" },
    { icon: FileText, title: "Blog", href: "/blog", group: "PAGES" },
    { icon: Laptop, title: "Tech Stack", href: "/stack", group: "PAGES" },
    { icon: Award, title: "Certifications", href: "/certifications", group: "PAGES" },
    { icon: Calendar, title: "Contact me", href: "/contact", group: "PAGES" },
    { icon: Server, title: "Stats", href: "/stats", group: "PAGES" },
    { icon: LinkIcon, title: "Links", href: "/links", group: "PAGES" },
    { icon: Award, title: "Attribution", href: "/attribution", group: "PAGES" },

    { icon: Github, title: "GitHub", href: "https://github.com/OMCHOKSI108", group: "CONNECT", external: true },
    { icon: LinkIcon, title: "LinkedIn", href: "https://linkedin.com/in/omchoksi", group: "CONNECT", external: true },
    { icon: LinkIcon, title: "X (Twitter)", href: "https://x.com/ChoksiOm", group: "CONNECT", external: true },
    { icon: FileText, title: "Resume", href: "https://drive.google.com/file/d/1vZFyvsRzv17dm6z1uKDXI07Z_gfTHQgC/view?usp=drive_link", group: "CONNECT", external: true },

    { icon: FileText, title: "Privacy Policy", href: "/privacy", group: "LEGAL" },
    { icon: FileText, title: "Terms of Use", href: "/terms", group: "LEGAL" },
];

export default function CommandMenu({ isOpen, setIsOpen }: CommandMenuProps) {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    const filteredItems = ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query, isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const html = document.documentElement;
        const body = document.body;

        const prevHtml = html.style.overflow;
        const prevBody = body.style.overflow;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            html.style.overflow = prevHtml;
            body.style.overflow = prevBody;
        };
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(i => Math.min(i + 1, filteredItems.length - 1));
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(i => Math.max(i - 1, 0));
            }

            if (e.key === "Enter") {
                e.preventDefault();
                const item = filteredItems[selectedIndex];
                if (item) select(item);
            }

            if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, selectedIndex, filteredItems]);

    useEffect(() => {
        if (!listRef.current) return;
        const el = listRef.current.querySelector(
            `[data-index="${selectedIndex}"]`
        );
        el?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    const select = (item: CommandItem) => {
        setIsOpen(false);
        item.external
            ? window.open(item.href, "_blank")
            : router.push(item.href);
    };

    const pages = filteredItems.filter(i => i.group === "PAGES");
    const connect = filteredItems.filter(i => i.group === "CONNECT");
    const legal = filteredItems.filter(i => i.group === "LEGAL");

    const onWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!listRef.current) return;
        listRef.current.scrollTop += e.deltaY;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex justify-center pt-[10vh] px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    onWheel={(e) => e.preventDefault()}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    <motion.div
                        className="relative w-full max-w-[600px] bg-[var(--card)]/80 backdrop-blur-xl rounded-xl border border-[var(--border)]/50 shadow-xl flex flex-col max-h-[70vh]"
                        initial={{ scale: 0.95, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -20, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        onWheel={onWheel}
                    >
                        <div className="flex items-center px-4 py-4 border-b border-[var(--border)]/30">
                            <Search className="w-5 h-5 mr-3 text-[var(--muted-foreground)]" />
                            <input
                                autoFocus
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search"
                                className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                            />
                            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-[var(--muted)]/50 transition-colors">
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>

                        <div ref={listRef} className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                            {filteredItems.length === 0 ? (
                                <div className="p-8 text-center text-sm text-[var(--muted-foreground)]">
                                    No results found.
                                </div>
                            ) : (
                                <>
                                    {[["Pages", pages], ["Connect", connect], ["Legal", legal]].map(
                                        ([label, list]: any) =>
                                            list.length > 0 && (
                                                <div key={label} className="mb-2">
                                                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                                                        {label}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        {list.map((item: CommandItem) => {
                                                            const i = filteredItems.indexOf(item);
                                                            const Icon = item.icon;
                                                            const active = i === selectedIndex;

                                                            return (
                                                                <div
                                                                    key={item.href}
                                                                    data-index={i}
                                                                    onClick={() => select(item)}
                                                                    onMouseEnter={() => setSelectedIndex(i)}
                                                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                                                                        active ? "bg-[var(--muted)]/60 text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/30"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <Icon className={`w-4 h-4 ${active ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`} />
                                                                        <span className="text-[14px] font-medium">{item.title}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        {item.external && (
                                                                            <span className="text-[10px] text-[var(--muted-foreground)]">↗</span>
                                                                        )}
                                                                        {active && <ArrowRight className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
