"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, ArrowRight, Eye } from "lucide-react";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiPython, SiMongodb, SiOpenai, SiNodedotjs, SiPostgresql } from "react-icons/si";
import { SiExpo, SiFirebase, SiCloudinary, SiZod, SiDocker, SiFastapi, SiPytorch, SiTerraform, SiGraphql, SiMysql, SiRedis } from "react-icons/si";

type TagConfig = {
    icon?: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
    label: string;
    color?: string; // brand color for icon (optional for generic tags)
};

// Helper to get icon, label and brand color for a tag
const getTagConfig = (tag: string): TagConfig => {
    const lower = tag.toLowerCase();

    if (lower.includes("expo")) return { icon: SiExpo, label: "Expo", color: "#000000" };
    if (lower.includes("firebase")) return { icon: SiFirebase, label: "Firebase", color: "#FFCA28" };
    if (lower.includes("zustand")) return { label: "Zustand", color: "#000000" };
    if (lower.includes("cloudinary")) return { icon: SiCloudinary, label: "Cloudinary", color: "#3448C5" };
    if (lower.includes("reanimated")) return { label: "Reanimated", color: "#FFD600" };
    if (lower.includes("zod")) return { icon: SiZod, label: "Zod", color: "#0B1622" };
    if (lower.includes("next")) return { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" };
    if (lower.includes("react")) return { icon: SiReact, label: "React", color: "#61DAFB" };
    if (lower.includes("typescript") || lower === "ts") return { icon: SiTypescript, label: "TypeScript", color: "#3178C6" };
    if (lower.includes("tailwind")) return { icon: SiTailwindcss, label: "Tailwind CSS", color: "#38BDF8" };
    if (lower.includes("python")) return { icon: SiPython, label: "Python", color: "#FFD43B" };
    if (lower.includes("mongo")) return { icon: SiMongodb, label: "MongoDB", color: "#10A64A" };
    if (lower.includes("openai") || lower.includes("gpt") || lower.includes("llm") || lower.includes("ai")) return { icon: SiOpenai, label: "AI", color: "#10A37F" };
    if (lower.includes("node")) return { icon: SiNodedotjs, label: "Node.js", color: "#3C873A" };
    if (lower.includes("postgres") || lower.includes("postgresql")) return { icon: SiPostgresql, label: "Postgres", color: "#4169E1" };

    // New additions
    if (lower.includes("docker")) return { icon: SiDocker, label: "Docker", color: "#2496ED" };
    if (lower.includes("fastapi")) return { icon: SiFastapi, label: "FastAPI", color: "#009688" };
    if (lower.includes("pytorch")) return { icon: SiPytorch, label: "PyTorch", color: "#EE4C2C" };
    if (lower.includes("terraform")) return { icon: SiTerraform, label: "Terraform", color: "#7B42BC" };
    if (lower.includes("graphql")) return { icon: SiGraphql, label: "GraphQL", color: "#E10098" };
    if (lower.includes("mysql")) return { icon: SiMysql, label: "MySQL", color: "#4479A1" };
    if (lower.includes("redis")) return { icon: SiRedis, label: "Redis", color: "#DC382D" };

    // Generic tech/keyword with no specific brand icon – use a neutral label only
    return {
        label: tag,
        color: "#A1A1AA",
    };
};

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    githubUrl?: string; // Optional
    liveUrl?: string; // Optional
    tags: string[];
    category: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
    accentColor?: string;
}

export default function ProjectCard({ project, index, accentColor }: ProjectCardProps) {
    // Mouse following state
    const [isHovering, setIsHovering] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the cursor follower
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Stagger the second column (odd indices)
    const isStaggered = index % 2 !== 0;

    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col gap-6 group ${isStaggered ? 'lg:mt-48' : ''}`}
        >
            {/* Project Header (Index & Title) */}
            <div className="flex flex-col gap-4 px-2">
                {/* Pillar Index Indicator */}
                <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[var(--muted-foreground)] uppercase opacity-60">
                    <span>{`0${index + 1}`}</span>
                    <div className="h-[1px] w-12 bg-current" />
                    <span>{project.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300 font-serif">
                    {project.title}
                </h2>
            </div>

            {/* Project Card Image Area */}
            <Link href={`/projects/${project.id}`} className="block w-full cursor-none">
                <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-black/5 bg-[var(--card)] shadow-2xl transition-all duration-500 hover:shadow-[var(--primary)/20] group/image"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Inner Content */}
                    <div
                        className="absolute inset-2 overflow-hidden rounded-[1.5rem] transition-colors duration-500"
                        style={{ backgroundColor: accentColor || 'hsl(var(--muted))' }}
                    >
                        {/* Background Pattern/Texture (Optional, keeps it clean) */}
                        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]" />

                        {/* Image */}
                        <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-10">
                            <div className="relative w-full h-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-[1.25rem] overflow-hidden transform transition-transform duration-700 group-hover/image:scale-[1.02] bg-black">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-contain border border-white/10 rounded-[1.25rem]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index < 2}
                                />
                            </div>
                        </div>

                        {/* Navigation Arrow */}
                        <div className="absolute bottom-6 right-6 z-40 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/image:scale-110">
                            <ArrowRight className="w-6 h-6" />
                        </div>

                        {/* Hover Interaction: Follow Cursor Badge */}
                        {isHovering && (
                            <motion.div
                                style={{
                                    left: cursorX,
                                    top: cursorY,
                                    translateX: "-50%",
                                    translateY: "-50%"
                                }}
                                className="absolute z-50 pointer-events-none"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative w-32 h-32 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                                    {/* Rotating Text Circle */}
                                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite] w-full h-full flex items-center justify-center">
                                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                            <defs>
                                                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                                            </defs>
                                            <text fontSize="10" fill="white" fontWeight="bold" letterSpacing="1.5">
                                                <textPath href="#circlePath">
                                                    VIEW DETAILS • VIEW DETAILS •
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>
                                    {/* Central Eye Icon */}
                                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl">
                                        <Eye size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </Link>

            {/* Bottom Details (Tags & Actions) - Below card as per new design? Or keep in card? 
               User Reference: "His Tags" were distinct overlapping or below.
               My previous layout had them stacked BELOW the title? No, title was below?
               Wait, "Pillar Index and Title STACKED ABOVE card".
               So Tags go BELOW card.
            */}
            <div className="flex flex-col gap-4 px-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                        {project.tags.map((tag) => {
                            const { icon: TagIcon, label, color } = getTagConfig(tag);
                            return (
                                <div
                                    key={tag}
                                    className="inline-flex items-center gap-2 rounded-md border border-[var(--foreground)] bg-transparent px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.13em] transition-colors text-[var(--foreground)] min-h-[36px]"
                                >
                                    {TagIcon && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-[0.2rem] border border-[var(--foreground)] bg-transparent min-w-[20px]">
                                            <TagIcon size={13} style={{ color: color }} />
                                        </span>
                                    )}
                                    <span className="pt-[1px]">{label}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* GitHub Badge */}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] border border-transparent rounded-lg shadow-sm hover:opacity-90 transition-opacity ml-auto"
                        >
                            <Github size={14} />
                            <span className="text-[11px] font-semibold uppercase tracking-wide">GITHUB</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
