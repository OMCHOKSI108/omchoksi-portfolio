"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
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

export default function CertificationPage() {
  const { slug } = useParams();
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-admin-panel-sigma.vercel.app";
        const res = await fetch(`${baseUrl}/api/certifications?slug=${slug}`);
        const data = await res.json();
        if (data.success && data.data.items.length > 0) {
          setCertification(data.data.items[0]);
        } else {
          setError("Certification not found");
        }
      } catch (err) {
        setError("Error fetching certification");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchCertification();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="animate-pulse text-[var(--foreground)]">Loading certification...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-red-500 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
        <Link href="/certifications" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to Certifications
        </Link>
      </div>
    </div>
  );

  if (!certification) return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Certification Not Found</h1>
        <Link href="/certifications" className="text-blue-500 hover:underline">
          ← Back to Certifications
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative bg-[var(--background)]">
      {/* Background Calligraphy Text */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="font-serif-display font-bold text-[var(--foreground)] opacity-[0.14] dark:opacity-[0.16] select-none whitespace-nowrap"
            style={{
              fontSize: '10vw',
              WebkitTextStroke: '1.5px var(--foreground)',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.08em',
              transform: 'rotate(-2deg)'
            }}
          >
            CERTIFICATE
          </div>
        </div>
      </div>

      {/* LEFT DECORATIVE PILLAR */}
      <div className="fixed left-[8%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
            <defs>
              <pattern id="certLeftPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1.5" fill="var(--foreground)" className="opacity-15 dark:opacity-20" />
              </pattern>
              <pattern id="certLeftLines" patternUnits="userSpaceOnUse" width="8" height="16">
                <line x1="4" y1="0" x2="4" y2="16" stroke="var(--foreground)" strokeWidth="1" className="opacity-10 dark:opacity-15" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="32" height="1000" fill="url(#certLeftPattern)" />
            <rect x="32" y="0" width="32" height="1000" fill="url(#certLeftLines)" />
          </svg>
        </div>
      </div>

      {/* RIGHT DECORATIVE PILLAR */}
      <div className="fixed right-[8%] top-32 bottom-32 w-16 pointer-events-none select-none z-[5] hidden lg:block">
        <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 60%, transparent 90%)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
            <defs>
              <pattern id="certRightPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                <circle cx="5" cy="5" r="1.5" fill="var(--foreground)" className="opacity-15 dark:opacity-20" />
              </pattern>
              <pattern id="certRightDiagonal" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="var(--foreground)" strokeWidth="1" className="opacity-10 dark:opacity-15" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="32" height="1000" fill="url(#certRightPattern)" />
            <rect x="32" y="0" width="32" height="1000" fill="url(#certRightDiagonal)" />
          </svg>
        </div>
      </div>

      {/* Inject Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      <Navbar />

      <div className="relative z-10 pt-24 px-6 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-sm"
              >
                <ArrowLeft size={16} />
                Back to Certifications
              </Link>
            </div>

            {/* Hero Section with Image */}
            <div className="mb-12">
              {/* Image Preview */}
              {certification.image && !certification.image.toLowerCase().endsWith('.pdf') && (
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
                  <Image
                    src={certification.image}
                    alt={certification.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}

              {/* PDF Embed */}
              {(certification.pdf || certification.link) && (
                <div className="mb-8 w-full bg-[var(--card)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-lg">
                  <div className="p-4 bg-[var(--muted)]/50 border-b border-[var(--border)] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Award size={18} className="text-purple-500" />
                      </div>
                      <span className="font-semibold text-sm text-[var(--foreground)]">Certificate Document</span>
                    </div>
                    <a
                      href={(() => {
                        const pdfUrl = certification.link || certification.pdf || '';
                        return pdfUrl.includes('drive.google.com') 
                          ? pdfUrl.replace('/view', '/view?usp=sharing')
                          : pdfUrl;
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 font-medium shadow-sm"
                    >
                      <ExternalLink size={12} />
                      Open in New Tab
                    </a>
                  </div>
                  {(() => {
                    const pdfUrl = certification.link || certification.pdf || '';
                    return pdfUrl.includes('drive.google.com') ? (
                      // Google Drive PDF Embed
                      <iframe
                        src={pdfUrl.includes('/file/d/')
                          ? pdfUrl.replace('/view', '/preview').replace('?usp=sharing', '')
                          : pdfUrl}
                        className="w-full h-[600px] md:h-[800px]"
                        allow="autoplay"
                      />
                    ) : (
                      // Regular PDF Embed
                      <object
                        data={pdfUrl}
                        type="application/pdf"
                        className="w-full h-[600px] md:h-[800px]"
                      >
                        <div className="p-12 text-center bg-gradient-to-br from-[var(--muted)]/30 to-[var(--muted)]/10 min-h-[400px] flex flex-col items-center justify-center">
                          <p className="text-[var(--muted-foreground)] mb-6 text-sm">
                            Your browser doesn't support embedded PDFs.
                          </p>
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all hover:scale-105 active:scale-95 font-medium shadow-lg"
                          >
                            <ExternalLink size={16} />
                            View Certificate PDF
                          </a>
                        </div>
                      </object>
                    );
                  })()}
                </div>
              )}

              {/* Title and Meta */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-[var(--primary)]" size={32} />
                  <span className="text-sm font-medium text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                    Certification
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
                  {certification.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Issued by:</span>
                    <span className="text-[var(--foreground)] font-semibold">{certification.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(certification.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certification Details */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Issuer</h3>
                    <p className="text-[var(--foreground)] font-normal">{certification.issuer}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Issue Date</h3>
                    <p className="text-[var(--foreground)] font-normal">
                      {new Date(certification.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {certification.expiryDate && (
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Expiry Date</h3>
                      <p className="text-[var(--foreground)] font-normal">
                        {new Date(certification.expiryDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Credential ID</h3>
                    <p className="text-[var(--foreground)] font-normal font-mono bg-[var(--muted)] px-3 py-2 rounded-lg border border-[var(--border)]">
                      {certification.credentialId}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Status</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${certification.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-[var(--foreground)] font-normal">
                        {certification.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {certification.description && (
                <div className="border-t border-[var(--border)] pt-8">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Description</h3>
                  <p className="text-[var(--foreground)] leading-relaxed font-normal">
                    {certification.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Tags */}
              {certification.tags && certification.tags.length > 0 && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-purple-500/10 rounded-lg">
                      <Award size={16} className="text-purple-500" />
                    </div>
                    Skills & Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certification.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] rounded-full text-xs font-medium hover:bg-[var(--muted)]/70 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">
                  Certificate Details
                </h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--muted-foreground)]">Type:</span>
                    <span className="font-medium text-[var(--foreground)]">Professional Certification</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--muted-foreground)]">Status:</span>
                    <span className={`font-semibold ${certification.active ? 'text-green-500' : 'text-red-500'}`}>
                      {certification.active ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--muted-foreground)]">Featured:</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {certification.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resources / Verification */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-purple-500/10 rounded-lg">
                    <ExternalLink size={16} className="text-purple-500" />
                  </div>
                  Resources
                </h3>

                <div className="space-y-4">
                  {/* PDF Download/View */}
                  {(certification.pdf || certification.link) && (
                    <div>
                      <p className="text-[var(--muted-foreground)] text-xs mb-3">
                        View the official certificate document.
                      </p>
                      <a
                        href={(() => {
                          const pdfUrl = certification.link || certification.pdf || '';
                          return pdfUrl.includes('drive.google.com') 
                            ? pdfUrl.replace('/view', '/view?usp=sharing')
                            : pdfUrl;
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium text-sm shadow-md hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
                      >
                        <ExternalLink size={14} />
                        View Certificate PDF
                      </a>
                    </div>
                  )}

                  {/* External Verification Link */}
                  {certification.link && !certification.link.includes('drive.google.com') && (
                    <div className={certification.pdf ? "pt-4 border-t border-[var(--border)]" : ""}>
                      <p className="text-[var(--muted-foreground)] text-xs mb-3">
                        Verify directly on the issuer's website.
                      </p>
                      <a
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--border)] text-[var(--foreground)] rounded-full font-medium text-sm hover:bg-[var(--muted)] hover:scale-105 active:scale-95 transition-all"
                      >
                        Verify on {certification.issuer.includes('(') ? certification.issuer.split('(')[0].trim() : certification.issuer}
                      </a>
                    </div>
                  )}

                  {!certification.pdf && !certification.link && (
                    <p className="text-[var(--muted-foreground)] text-xs italic">
                      No external resources available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}