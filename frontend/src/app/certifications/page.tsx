"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Calendar, ExternalLink, FileText } from "lucide-react";
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
  pdf?: string;
  link?: string;
  active: boolean;
  featured: boolean;
}

// Helper to try and get a JPG thumbnail from a PDF URL (Cloudinary specific)
const getPdfThumbnail = (url: string) => {
  if (!url) return null;
  // If it's a Cloudinary URL and ends with .pdf, replace with .jpg to get a thumbnail
  if (url.includes('cloudinary.com') && url.toLowerCase().endsWith('.pdf')) {
    return url.replace(/\.pdf$/i, '.jpg');
  }
  return null;
};

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-admin-panel-sigma.vercel.app";
        const res = await fetch(`${baseUrl}/api/certifications?page=1&limit=50`);
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
            My <span className="font-serif-italic text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>Certifications</span>
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise and commitment to continuous learning.
          </p>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const isPdfImage = cert.image?.toLowerCase().endsWith('.pdf');
            // Try to get a real thumbnail if possible
            const pdfThumbnail = isPdfImage ? getPdfThumbnail(cert.image!) : (cert.pdf ? getPdfThumbnail(cert.pdf) : null);

            // If we have a valid image (not PDF) use it. OR if we found a pdfThumbnail, use that.
            const displayImage = (cert.image && !isPdfImage) ? cert.image : pdfThumbnail;

            const hasPdf = !!cert.pdf || isPdfImage;

            return (
              <Link key={cert._id} href={`/certifications/${cert.slug}`} className="block group h-full">
                <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col relative">

                  {hasPdf && (
                    <div className="absolute top-4 right-4 z-20 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      <FileText size={12} />
                      PDF
                    </div>
                  )}

                  {displayImage ? (
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <Image
                        src={displayImage}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ) : hasPdf ? (
                    <div className="relative h-48 overflow-hidden shrink-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 flex flex-col items-center justify-center p-6 text-center border-b border-[var(--border)]">
                      <div className="bg-red-500 text-white p-3 rounded-full mb-2 shadow-lg group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                      </div>
                      <span className="text-red-600 dark:text-red-400 font-medium text-sm">Certificate Document</span>
                    </div>
                  ) : null}

                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[var(--muted)] rounded-full border border-[var(--border)]">
                        <Award className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[var(--foreground)] group-hover:text-purple-400 transition-colors duration-300">
                          {cert.title}
                        </h2>
                        <p className="text-[var(--muted-foreground)] text-sm">{cert.issuer}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 grow">
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
                      <p className="text-sm text-[var(--muted-foreground)] font-mono bg-[var(--muted)] px-3 py-1.5 rounded-lg border border-[var(--border)] inline-block">
                        ID: {cert.credentialId}
                      </p>
                    </div>

                    {cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {cert.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] rounded-full text-xs font-medium"
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
            );
          })}
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