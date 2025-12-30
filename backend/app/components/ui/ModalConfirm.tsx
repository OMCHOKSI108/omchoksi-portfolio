"use client";
import React from 'react';

export default function ModalConfirm({ open, title, message, onCancel, onConfirm }:{open:boolean; title:string; message:string; onCancel:()=>void; onConfirm:()=>void}){
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded shadow max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 mb-4">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-3 py-2 bg-neutral-800 rounded cursor-pointer">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 rounded text-white cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
}
