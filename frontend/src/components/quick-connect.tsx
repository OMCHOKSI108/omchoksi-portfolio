"use client";

import React, { useState } from 'react';
import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  Calendar,
  Send,
  Check,
  Copy
} from 'lucide-react';

const QuickConnect = ({ isOpen, onClose, onBookCall }: { 
  isOpen: boolean; 
  onClose: () => void;
  onBookCall: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' or 'form'
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('omchoksi108@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="w-full max-w-lg mx-auto bg-[var(--card)]/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl font-sans text-[var(--foreground)] border border-[var(--border)] animate-in slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 flex items-center justify-center transition-colors"
        >
          <span className="text-lg font-bold">×</span>
        </button>

        {/* --- Drag Handle & Socials --- */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-1.5 bg-text-secondary/30 rounded-full mb-6"></div>
          <div className="flex gap-6 text-[var(--muted-foreground)]">
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* --- Tabs --- */}
        <div className="flex p-1 bg-[var(--muted)]/50 rounded-xl mb-6 relative">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'quick' ? 'bg-[var(--card)] shadow-sm text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Quick connect
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'form' ? 'bg-[var(--card)] shadow-sm text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Fill a form
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="min-h-[280px]">
          {activeTab === 'quick' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Email Card */}
              <button
                onClick={handleCopyEmail}
                className="group flex flex-col items-start p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all text-left relative overflow-hidden"
              >
                <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)] mb-3 group-hover:scale-110 transition-transform">
                  {copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-1">Email</h4>
                <p className="text-xs font-semibold text-[var(--foreground)]/80 mb-1">omchoksi108@gmail.com</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">Send me an email directly</p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>

              {/* Book Call Card */}
              <button
                onClick={onBookCall}
                className="group flex flex-col items-start p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-all text-left relative overflow-hidden"
              >
                <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)] mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-1">Book a Call</h4>
                <p className="text-xs font-semibold text-[var(--foreground)]/80 mb-1">Schedule a time slot</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">Book a call on my calendar</p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            </div>
          ) : (
            <form className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--foreground)]">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all placeholder:text-[var(--muted-foreground)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--foreground)]">Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all placeholder:text-[var(--muted-foreground)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[var(--foreground)]">Message</label>
                  <span className="text-[10px] text-[var(--muted-foreground)]">{formState.message.length}/1000</span>
                </div>
                <textarea
                  rows={4}
                  placeholder="What would you like to discuss?"
                  className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all placeholder:text-[var(--muted-foreground)] resize-none"
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--primary-foreground)] font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <Send className="w-4 h-4" />
                Send message
              </button>
            </form>
          )}
        </div>

        {/* --- Footer Status --- */}
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl py-3 px-4 flex items-center justify-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-xs font-bold text-green-800 dark:text-green-200">Currently available for new opportunities</span>
        </div>
      </div>
    </div>
  );
};

export default QuickConnect;