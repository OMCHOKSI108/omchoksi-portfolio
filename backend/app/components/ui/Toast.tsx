"use client";
import React, { useState, useEffect } from 'react';

type ToastType = 'info' | 'success' | 'error';

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);
  useEffect(()=>{
    if (!toast) return;
    const t = setTimeout(()=> setToast(null), 3500);
    return ()=> clearTimeout(t);
  },[toast]);
  return {
    message: toast?.message ?? null,
    show: (m: string, opts?: { type?: ToastType }) => setToast({ message: m, type: opts?.type ?? 'info' }),
  };
}

export function Toast({ message }: { message: string | null }){
  if (!message) return null;
  // Simple style: show dark background for info/success, red for error
  // The `useToast` hook provides only `message` to the consumer components here.
  return (
    <div className="fixed bottom-6 right-6 bg-neutral-800 text-white px-4 py-2 rounded shadow">{message}</div>
  );
}
