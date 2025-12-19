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
        const res = await fetch(`https://portfolio-admin-panel-sigma.vercel.app/api/certifications?slug=${slug}`);
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
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Certifications
              </Link>
            </div>

            {/* Hero Section with Image */}
            <div className="mb-12">
              {certification.image && (
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
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 md:p-12 shadow-sm">
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
                    <p className="text-[var(--foreground)] font-normal font-mono bg-[var(--muted)] px-3 py-2 rounded border">
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
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Award size={18} />
                    Skills & Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certification.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Certificate Details
                </h3>
                <div className="space-y-3 text-[var(--foreground)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Type:</span>
                    <span className="font-medium">Professional Certification</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Status:</span>
                    <span className={`font-medium ${certification.active ? 'text-green-500' : 'text-red-500'}`}>
                      {certification.active ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">Featured:</span>
                    <span className="font-medium">
                      {certification.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Link */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <ExternalLink size={18} />
                  Verification
                </h3>
                <p className="text-[var(--muted-foreground)] text-sm mb-4">
                  Verify this certification on the issuer's platform using the credential ID.
                </p>
                <button className="w-full px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-medium hover:bg-[var(--primary)]/90 transition-colors">
                  Verify Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}