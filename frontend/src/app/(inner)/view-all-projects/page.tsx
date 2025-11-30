"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Users, Award } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    category: "Full Stack",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "3 months",
    team: "Solo",
    highlights: ["Processed 10k+ transactions", "99.9% uptime", "Mobile responsive"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
    category: "Web App",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "2 months",
    team: "2 developers",
    highlights: ["Real-time collaboration", "Intuitive drag-drop UI", "Cross-platform sync"]
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    description: "An intelligent analytics dashboard that uses machine learning to provide insights and predictions for business metrics.",
    image: "/api/placeholder/600/400",
    technologies: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
    category: "AI/ML",
    status: "In Progress",
    github: "https://github.com",
    live: null,
    duration: "4 months",
    team: "3 developers",
    highlights: ["Predictive analytics", "Interactive visualizations", "Real-time data processing"]
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "A secure mobile banking application with biometric authentication, transaction history, and financial management tools.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Stripe"],
    category: "Mobile",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "5 months",
    team: "4 developers",
    highlights: ["Bank-grade security", "Biometric auth", "Offline functionality"]
  },
  {
    id: 5,
    title: "Social Media Management Tool",
    description: "A comprehensive social media management platform for scheduling posts, analyzing performance, and managing multiple accounts.",
    image: "/api/placeholder/600/400",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "AWS"],
    category: "SaaS",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "6 months",
    team: "5 developers",
    highlights: ["Multi-platform support", "Advanced analytics", "Automated scheduling"]
  },
  {
    id: 6,
    title: "IoT Smart Home System",
    description: "An IoT platform for smart home automation with device management, energy monitoring, and voice control integration.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Python", "MQTT", "InfluxDB", "Raspberry Pi"],
    category: "IoT",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "4 months",
    team: "3 developers",
    highlights: ["Energy savings 30%", "Voice integration", "Real-time monitoring"]
  },
  {
    id: 7,
    title: "Finote App",
    description: "An intuitive mobile companion for organizing digital wallets and analyzing financial health with interactive charts and insights.",
    image: "/api/placeholder/600/400",
    technologies: ["Expo", "React Native", "TypeScript", "Firebase"],
    category: "Mobile",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "3 months",
    team: "2 developers",
    highlights: ["Interactive charts", "Secure sync", "Smooth animations"]
  },
  {
    id: 8,
    title: "Portfolio Revamp",
    description: "A modern portfolio website built with Next.js, Tailwind CSS and Framer Motion to showcase projects and design work.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "Tailwind", "Framer Motion"],
    category: "Web",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "1 month",
    team: "Solo",
    highlights: ["Responsive design", "Smooth animations", "SEO optimized"]
  },
  {
    id: 9,
    title: "Real Estate Platform",
    description: "A comprehensive real estate marketplace with advanced search filters, virtual tours, and property management tools.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Mapbox", "Stripe"],
    category: "Web App",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "4 months",
    team: "3 developers",
    highlights: ["Advanced search", "Virtual tours", "Property analytics"]
  },
  {
    id: 10,
    title: "Fitness Tracking App",
    description: "A comprehensive fitness application with workout planning, progress tracking, and social features for fitness enthusiasts.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Node.js", "MongoDB", "HealthKit", "Firebase"],
    category: "Mobile",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "5 months",
    team: "4 developers",
    highlights: ["Health integration", "Social features", "Progress tracking"]
  },
  {
    id: 11,
    title: "Video Streaming Platform",
    description: "A scalable video streaming service with content management, user subscriptions, and adaptive bitrate streaming.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "AWS", "FFmpeg", "Redis"],
    category: "Full Stack",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "6 months",
    team: "5 developers",
    highlights: ["4K streaming", "Global CDN", "Content protection"]
  },
  {
    id: 12,
    title: "Cryptocurrency Exchange",
    description: "A secure cryptocurrency trading platform with real-time charts, wallet management, and advanced trading features.",
    image: "/api/placeholder/600/400",
    technologies: ["Vue.js", "Python", "PostgreSQL", "WebSocket", "Docker"],
    category: "FinTech",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "7 months",
    team: "6 developers",
    highlights: ["Real-time trading", "Bank-grade security", "Multi-currency support"]
  },
  {
    id: 13,
    title: "Educational LMS",
    description: "A comprehensive learning management system with course creation, student progress tracking, and interactive assessments.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "Prisma", "AWS S3", "Stripe"],
    category: "EdTech",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "5 months",
    team: "4 developers",
    highlights: ["Interactive courses", "Progress analytics", "Mobile learning"]
  },
  {
    id: 14,
    title: "Weather Forecasting App",
    description: "An advanced weather application with hyper-local forecasts, severe weather alerts, and historical weather data.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Python", "OpenWeather API", "SQLite", "Firebase"],
    category: "Mobile",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "3 months",
    team: "2 developers",
    highlights: ["Hyper-local forecasts", "Severe weather alerts", "Offline mode"]
  },
  {
    id: 15,
    title: "Supply Chain Management",
    description: "An enterprise supply chain management system with inventory tracking, demand forecasting, and logistics optimization.",
    image: "/api/placeholder/600/400",
    technologies: ["Angular", "Java", "Spring Boot", "Oracle", "Kubernetes"],
    category: "Enterprise",
    status: "In Progress",
    github: "https://github.com",
    live: null,
    duration: "8 months",
    team: "8 developers",
    highlights: ["Demand forecasting", "Logistics optimization", "Real-time tracking"]
  },
  {
    id: 16,
    title: "Music Streaming Service",
    description: "A music streaming platform with personalized recommendations, playlist management, and social sharing features.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Python", "Spotify API", "PostgreSQL", "Redis"],
    category: "Entertainment",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "6 months",
    team: "5 developers",
    highlights: ["AI recommendations", "High-quality audio", "Social features"]
  },
  {
    id: 17,
    title: "Remote Team Collaboration",
    description: "A comprehensive remote work platform with video conferencing, screen sharing, and project management tools.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "WebRTC", "Socket.io", "MongoDB", "AWS"],
    category: "Collaboration",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "5 months",
    team: "4 developers",
    highlights: ["HD video calls", "Screen sharing", "Project tracking"]
  },
  {
    id: 18,
    title: "Healthcare Management System",
    description: "A comprehensive healthcare platform with patient management, appointment scheduling, and medical record keeping.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "MongoDB", "HIPAA", "Twilio"],
    category: "Healthcare",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "7 months",
    team: "6 developers",
    highlights: ["HIPAA compliant", "Appointment scheduling", "Telemedicine integration"]
  },
  {
    id: 19,
    title: "Smart City IoT Platform",
    description: "An IoT platform for smart city management including traffic monitoring, waste management, and environmental sensors.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "Python", "MQTT", "InfluxDB", "Grafana"],
    category: "IoT",
    status: "In Progress",
    github: "https://github.com",
    live: null,
    duration: "9 months",
    team: "7 developers",
    highlights: ["Traffic optimization", "Waste management", "Environmental monitoring"]
  },
  {
    id: 20,
    title: "AR Shopping Experience",
    description: "An augmented reality shopping application that allows users to virtually try products and visualize them in their space.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "ARCore", "ARKit", "Node.js", "MongoDB"],
    category: "AR/VR",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    duration: "4 months",
    team: "3 developers",
    highlights: ["AR product visualization", "Virtual try-on", "Spatial mapping"]
  }
];

export default function ViewAllProjects() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background)] to-gray-950 relative">
      
      {/* Background Texture */}
      <div className="absolute top-0 left-0 right-0 h-[8%] z-0 pointer-events-none opacity-[0.005]">
        <img 
          src="/assets/cta.avif" 
          alt="Background Texture" 
          className="w-full h-full object-cover" 
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/10 to-[var(--background)]/30" />
      </div>

      <Navbar />

      <main className="pt-24 px-6 relative z-10 bg-gradient-to-b from-transparent to-[var(--muted)]">
        <div className="max-w-7xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col justify-between">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--foreground)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              All Projects
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              A comprehensive showcase of all projects I've built throughout my career, from web applications to mobile apps, AI solutions, and enterprise systems.
              Each project represents a unique challenge and valuable learning experience.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: index * 0.01 }}
                className="group bg-[var(--card)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[var(--border)]"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed'
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{project.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[var(--card)] text-[var(--text-secondary)] text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-[var(--card)] text-[var(--text-secondary)] text-xs rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Award className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pb-32"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">20+</div>
              <div className="text-[var(--text-secondary)]">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">4+</div>
              <div className="text-[var(--text-secondary)]">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">15+</div>
              <div className="text-[var(--text-secondary)]">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">99%</div>
              <div className="text-[var(--text-secondary)]">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}