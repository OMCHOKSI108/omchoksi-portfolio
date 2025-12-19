"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Target } from "lucide-react";
import { useState, useEffect } from "react";

interface Certification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  tags: string[];
  image?: string;
  active: boolean;
  featured: boolean;
}

const recognitions = [
  {
    title: "Finalist – IMMunoQuest Kaggle Contest",
    description: "Competed in a prestigious machine learning competition focused on immunological research and predictive modeling.",
    icon: Trophy,
    category: "Competition"
  },
  {
    title: "Winner – Data Science Treasure Hunt",
    description: "Secured first place in a challenging data science competition involving complex analytical puzzles and insights.",
    icon: Award,
    category: "Competition"
  },
  {
    title: "Competitor – HPC Event (AIML Club)",
    description: "Participated in high-performance computing challenges organized by the AI/ML club, showcasing computational skills.",
    icon: Target,
    category: "Event"
  }
];

export default function Testimonials() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch("https://portfolio-admin-panel-sigma.vercel.app/api/certifications?page=1&limit=6");
        const data = await res.json();
        if (data.success) {
          setCertifications(data.data.items.filter((c: Certification) => c.active).slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 text-[var(--foreground)]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">Loading mentions...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Mentions & <span className="font-serif-italic text-[var(--primary)]">Recognition</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.length > 0 ? certifications.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[var(--card)] backdrop-blur-lg border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--primary)] rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[var(--primary-foreground)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{cert.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-3">Issued by {cert.issuer} on {new Date(cert.issueDate).toLocaleDateString()}</p>
                <span className="inline-block px-3 py-1 bg-[var(--muted)]/20 text-[var(--muted-foreground)] text-sm rounded-full">
                  Certification
                </span>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--muted-foreground)]">No certifications available at the moment.</p>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-8 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>100% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
              <span>50+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
             
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}