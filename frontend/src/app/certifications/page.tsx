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

// Helper to get a high-quality JPG thumbnail from a PDF URL (Cloudinary specific)
const getPdfThumbnail = (url: string) => {
  if (!url) return null;
  // If it's a Cloudinary URL and ends with .pdf, convert to high-quality JPG thumbnail
  if (url.includes('cloudinary.com') && url.toLowerCase().endsWith('.pdf')) {
    // Replace .pdf with .jpg and add quality/transformation parameters
    // Format: /upload/q_auto:best,f_jpg,pg_1,w_800,dpr_2.0/...
    const baseUrl = url.replace(/\.pdf$/i, '.jpg');

    // Insert transformation parameters before the version or filename
    // Cloudinary URL structure: .../upload/v123456/folder/file.pdf
    const parts = baseUrl.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/q_auto:best,f_jpg,pg_1,w_800,dpr_2.0,e_sharpen:100,e_vibrance:30,e_contrast:20/${parts[1]}`;
    }

    return baseUrl;
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

      {/* TECHNICAL BLUEPRINT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center">
        {/* 1. Large "certifications" Text layer - FITTED */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] dark:opacity-[0.08]">
          <span
            className="font-serif font-black tracking-tighter text-transparent lowercase leading-none"
            style={{
              fontSize: '12vw', // Adjusted for longer word
              WebkitTextStroke: '1px var(--foreground)',
              backgroundImage: 'repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 0, transparent 50%)',
              backgroundSize: '8px 8px',
              WebkitBackgroundClip: 'text',
              width: '100%',
              textAlign: 'center',
            }}
          >
            certifications
          </span>
        </div>

        {/* 2. Engineering/Technical Lines Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.1] dark:opacity-[0.15]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Grid Pattern */}
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />

          {/* Central Crosshair */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="10 10" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="10 10" />

          {/* Concentric Circles (Technical Measures) */}
          <circle cx="50%" cy="50%" r="15%" fill="none" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="30%" fill="none" stroke="var(--foreground)" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="var(--foreground)" strokeWidth="0.5" strokeDasharray="20 10" />

          {/* Degree Markers */}
          <text x="50%" y="20%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">90°</text>
          <text x="80%" y="50%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">0°</text>
          <text x="50%" y="80%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">270°</text>
          <text x="20%" y="50%" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontFamily="monospace">180°</text>

          {/* Decorative Lines */}
          <line x1="10%" y1="10%" x2="20%" y2="10%" stroke="var(--foreground)" strokeWidth="2" />
          <text x="10%" y="9%" fill="var(--foreground)" fontSize="10" fontFamily="monospace">REF-01</text>

          <line x1="80%" y1="90%" x2="90%" y2="90%" stroke="var(--foreground)" strokeWidth="2" />
          <text x="80%" y="89%" fill="var(--foreground)" fontSize="10" fontFamily="monospace">SCALE 1:1</text>
        </svg>
      </div>

      <div className="pt-24 px-6 max-w-7xl mx-auto pb-12 relative z-10">
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