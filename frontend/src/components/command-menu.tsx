"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Moon, Sun, Home, User, Folder, FileText,
    BookHeart, ListTodo, Calendar, Laptop, Award, Link as LinkIcon,
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
    group: "PAGES" | "CONNECT";
    external?: boolean;
}

const ITEMS: CommandItem[] = [
    // PAGES
    { icon: Home, title: "Home", href: "/", group: "PAGES" },
    { icon: User, title: "About", href: "/about", group: "PAGES" },
    { icon: Folder, title: "Projects", href: "/work", group: "PAGES" },
    { icon: FileText, title: "Blog", href: "/blog", group: "PAGES" },
    { icon: Laptop, title: "Tech Stack", href: "/stack", group: "PAGES" },
    { icon: Award, title: "Certifications", href: "/certifications", group: "PAGES" },
    { icon: Calendar, title: "Book a call", href: "/contact", group: "PAGES" },
    { icon: Server, title: "Stats", href: "/stats", group: "PAGES" },
    { icon: Award, title: "Attribution", href: "/attribution", group: "PAGES" },
    { icon: LinkIcon, title: "Links", href: "/links", group: "PAGES" },

    // CONNECT
    { icon: Github, title: "GitHub", href: "https://github.com/OMCHOKSI108", group: "CONNECT", external: true },
];

export default function CommandMenu({ isOpen, setIsOpen }: CommandMenuProps) {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter items based on query
    const filteredItems = ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    // Reset selection when query changes or menu opens
    useEffect(() => {
        setSelectedIndex(0);
    }, [query, isOpen]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredItems.length - 1 ? prev + 1 : prev
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const item = filteredItems[selectedIndex];
                if (item) {
                    handleSelect(item);
                }
            } else if (e.key === "Escape") {
                e.preventDefault();
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, selectedIndex, filteredItems, setIsOpen]);

    // Scroll active item into view
    useEffect(() => {
        if (listRef.current) {
            const activeElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ block: "nearest" });
            }
        }
    }, [selectedIndex]);

    const handleSelect = (item: CommandItem) => {
        setIsOpen(false);
        if (item.external) {
            window.open(item.href, "_blank");
        } else {
            router.push(item.href);
        }
    };

    // Group items
    const pages = filteredItems.filter(i => i.group === "PAGES");
    const connect = filteredItems.filter(i => i.group === "CONNECT");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-[600px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Header */}
                        <div className="flex items-center px-4 py-4 border-b border-white/10 shrink-0">
                            <Search className="w-5 h-5 text-zinc-500 mr-3" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search"
                                className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-500 text-[15px]"
                                autoFocus
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTheme();
                                    }}
                                    className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                                </button>
                                <div className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-medium text-zinc-500">
                                    ESC
                                </div>
                            </div>
                        </div>

                        {/* Results List */}
                        <div
                            ref={listRef}
                            className="flex-1 overflow-y-auto p-2 custom-scrollbar py-2"
                        >
                            {filteredItems.length === 0 ? (
                                <div className="p-8 text-center text-zinc-500 text-sm">
                                    No results found.
                                </div>
                            ) : (
                                <>
                                    {pages.length > 0 && (
                                        <div className="mb-2">
                                            <div className="px-3 py-2 text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
                                                Pages
                                            </div>
                                            <div className="space-y-0.5">
                                                {pages.map((item) => {
                                                    const globalIndex = filteredItems.indexOf(item);
                                                    const isSelected = globalIndex === selectedIndex;
                                                    const Icon = item.icon;

                                                    return (
                                                        <div
                                                            key={item.href}
                                                            data-index={globalIndex}
                                                            onClick={() => handleSelect(item)}
                                                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                            className={`
                                flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                                ${isSelected ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200'}
                              `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                                                                <span className="text-[14px] font-medium">{item.title}</span>
                                                            </div>
                                                            {isSelected && (
                                                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {connect.length > 0 && (
                                        <div className="mb-2">
                                            <div className="px-3 py-2 text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
                                                Connect
                                            </div>
                                            <div className="space-y-0.5">
                                                {connect.map((item) => {
                                                    const globalIndex = filteredItems.indexOf(item);
                                                    const isSelected = globalIndex === selectedIndex;
                                                    const Icon = item.icon;

                                                    return (
                                                        <div
                                                            key={item.href}
                                                            data-index={globalIndex}
                                                            onClick={() => handleSelect(item)}
                                                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                            className={`
                                flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                                ${isSelected ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-zinc-200'}
                              `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                                                                <span className="text-[14px] font-medium">{item.title}</span>
                                                            </div>
                                                            {isSelected && (
                                                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                                                            )}
                                                            {item.external && !isSelected && (
                                                                <span className="text-[10px] text-zinc-600">↗</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Optional Footer/Scroll hint if needed, handled by scrollbar */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
