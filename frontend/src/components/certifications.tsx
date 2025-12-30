"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Certification {
  _id: string;
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  tags: string[];
  image?: string;
  pdf?: string;
  link?: string;
  active: boolean;
  featured: boolean;
}

export default function Certifications() {
  const router = useRouter();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-admin-panel-sigma.vercel.app";
        const res = await fetch(`${baseUrl}/api/certifications?page=1&limit=6`);
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">Loading certifications...</div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null; // Don't show section if no certifications
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          My <span className="font-serif-italic text-[var(--primary)]">Certifications</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/certifications/${cert.slug}`)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[var(--primary)]/10 rounded-full">
                  <Award className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{cert.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">{cert.issuer}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <Calendar size={14} />
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                {cert.expiryDate && (
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Calendar size={14} />
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
                <p className="text-sm text-[var(--muted-foreground)]">ID: {cert.credentialId}</p>
              </div>

              {cert.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button className="w-full flex items-center justify-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors font-medium">
                View Details
                <ExternalLink size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/certifications')}
            className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-medium hover:bg-[var(--primary)]/80 transition-colors"
          >
            View All Certifications
          </button>
        </motion.div>
      </div>
    </section>
  );
}