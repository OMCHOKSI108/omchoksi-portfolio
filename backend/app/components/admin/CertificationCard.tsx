"use client";
import React from 'react';
import Link from 'next/link';

type Certification = {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  issuer?: string;
  issueDate?: string;
};

export default function CertificationCard({ certification, onDelete }: { certification: Certification; onDelete?: (id: string) => void }) {
  return (
    <div className="product-card">
      <div style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden' }}>
        {(() => {
          const isPdf = certification.image?.toLowerCase().endsWith('.pdf');
          let src = certification.image || '/placeholder.svg';

          if (isPdf && src.includes('cloudinary.com')) {
            src = src.replace(/\.pdf$/i, '.jpg');
          }

          // Cache buster
          try {
            const ts = (certification as any).updatedAt || (certification as any).createdAt;
            if (ts && src && !src.includes('?')) {
              const t = new Date(ts).getTime();
              src = `${src}?v=${t}`;
            }
          } catch (e) {
            // ignore
          }

          if (isPdf && !src.endsWith('.jpg')) {
            // Fallback for non-cloudinary PDFs or if we decided not to change extension
            return (
              <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M9 15h6" /></svg>
                <span className="text-xs font-semibold mt-2">PDF Document</span>
              </div>
            )
          }

          return <img src={src} alt={certification.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} onError={(e) => (e.currentTarget.src = '/placeholder.svg')} />;
        })()}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500">Certification</div>
        <Link href={`/admin/certifications/${certification._id}`} className="text-lg font-semibold hover:underline block mt-1 text-gray-900">{certification.title}</Link>
        <div className="text-sm text-gray-600 mt-2 line-clamp-3">{certification.description}</div>
        {certification.issuer && <div className="text-sm text-gray-500 mt-1">Issued by: {certification.issuer}</div>}
        {certification.issueDate && <div className="text-sm text-gray-500">Issued: {new Date(certification.issueDate).toLocaleDateString()}</div>}

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {certification.tags?.slice(0, 6).map((t) => (
            <div key={t} className="text-xs px-2 py-1 rounded" style={{ background: '#f3f4f6', border: '1px solid var(--border-subtle)' }}>{t}</div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link href={`/admin/certifications/${certification._id}`} className="text-sm px-3 py-1 rounded btn-accent">Open</Link>
          <button type="button" onClick={() => onDelete?.(certification._id)} className="text-sm px-3 py-1 rounded btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}