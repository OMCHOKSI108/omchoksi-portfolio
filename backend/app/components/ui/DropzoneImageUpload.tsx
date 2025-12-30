"use client";
import React, { useCallback, useState } from 'react';
import Image from 'next/image';

type Props = {
  onUploaded: (url: string) => void;
  initialUrl?: string;
};

export default function DropzoneImageUpload({ onUploaded, initialUrl }: Props) {
  const [preview, setPreview] = useState<string | undefined>(initialUrl);
  const [uploading, setUploading] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const j = await res.json();
      if (j?.url) {
        setPreview(j.url);
        onUploaded(j.url);
      } else {
        console.error('Upload failed', j);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) uploadFile(f);
  }, [uploadFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadFile(f);
  }, [uploadFile]);

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-gray-700 rounded p-4 flex items-center justify-center bg-gray-800"
      >
        {uploading ? (
          <div>Uploading…</div>
        ) : preview ? (
          <div className="relative">
            <Image src={preview} alt="preview" width={192} height={128} className="w-48 h-32 object-cover" />
          </div>
        ) : (
          <div className="text-gray-400">Click or drag image here</div>
        )}
        <input type="file" accept="image/*" onChange={onFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10" />
      </div>
    </div>
  );
}
