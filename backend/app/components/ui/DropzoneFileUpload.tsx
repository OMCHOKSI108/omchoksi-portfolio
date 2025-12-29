"use client";
import React, { useCallback, useState } from 'react';
import { FileText, Loader2, UploadCloud, X } from 'lucide-react';

type Props = {
    onUploaded: (url: string) => void;
    initialUrl?: string;
    accept?: string;
    label?: string;
};

export default function DropzoneFileUpload({ onUploaded, initialUrl, accept = "application/pdf", label = "Upload PDF" }: Props) {
    const [fileUrl, setFileUrl] = useState<string | undefined>(initialUrl);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const uploadFile = useCallback(async (file: File) => {
        setUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
            const j = await res.json();
            if (j?.url) {
                setFileUrl(j.url);
                onUploaded(j.url);
            } else {
                console.error('Upload failed', j);
                alert('Upload failed: ' + (j.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed due to network error');
        } finally {
            setUploading(false);
        }
    }, [onUploaded]);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const f = e.dataTransfer.files?.[0];
        if (f) uploadFile(f);
    }, [uploadFile]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) uploadFile(f);
    }, [uploadFile]);

    const clearFile = () => {
        setFileUrl(undefined);
        onUploaded('');
    }

    return (
        <div className='w-full'>
            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors
            ${dragActive ? 'border-primary bg-primary/10' : 'border-border bg-card'}
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin w-8 h-8 text-primary" />
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                ) : fileUrl ? (
                    <div className="relative w-full flex items-center justify-between p-4 bg-background border rounded-md">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-red-100 rounded text-red-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline truncate max-w-[200px] sm:max-w-xs">
                                    {fileUrl.split('/').pop()}
                                </a>
                                <span className="text-xs text-muted-foreground">Uploaded</span>
                            </div>
                        </div>
                        <button type="button" onClick={clearFile} className="p-1 hover:bg-muted rounded-full transition-colors">
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center cursor-pointer">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <UploadCloud className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium mb-1">{label}</p>
                        <p className="text-xs text-muted-foreground">Drag & drop or click to browse</p>
                    </div>
                )}
                <input
                    type="file"
                    accept={accept}
                    onChange={onFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    disabled={uploading || !!fileUrl}
                />
            </div>
        </div>
    );
}
