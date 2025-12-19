"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Calendar, ExternalLink } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Certification {
  _id: string;
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  description?: string;
  tags: string[];
  image?: string;
  active: boolean;
  featured: boolean;
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch("https://portfolio-admin-panel-sigma.vercel.app/api/certifications?page=1&limit=50");
        const data = await res.json();
        if (data.success) {
          setCertifications(data.data.items.filter((c: Certification) => c.active));
        } else {
          setError("Failed to fetch certifications");
        }
      } catch (err) {
        setError("Error fetching certifications");
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="animate-pulse text-[var(--foreground)]">Loading certifications...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-red-500 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative bg-[var(--background)]">
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            My <span className="font-serif-italic text-[var(--primary)]">Certifications</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise and commitment to continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Link key={cert._id} href={`/certifications/${cert.slug}`} className="block group">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                {cert.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[var(--primary)]/10 rounded-full">
                      <Award className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {cert.title}
                      </h2>
                      <p className="text-[var(--muted-foreground)] text-sm">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                      <Calendar size={14} />
                      <span>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <Calendar size={14} />
                        <span>Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                    )}
                    <p className="text-sm text-[var(--muted-foreground)] font-mono bg-[var(--muted)] px-2 py-1 rounded">
                      ID: {cert.credentialId}
                    </p>
                  </div>

                  {cert.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {cert.tags.length > 3 && (
                        <span className="text-xs text-[var(--muted-foreground)]">
                          +{cert.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cert.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {cert.active ? 'Active' : 'Expired'}
                      </span>
                    </div>
                    <ExternalLink size={16} className="text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {certifications.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No Certifications Yet</h3>
            <p className="text-[var(--muted-foreground)]">Certifications will appear here once added to the portfolio.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}