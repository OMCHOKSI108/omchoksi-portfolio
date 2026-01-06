"use client";

import React, { useState } from 'react';
import {
  Copy,
  MapPin,
  ArrowRight,
  Check,
  Globe,
  Terminal,
  Database,
  Layout,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import QuickConnect from './quick-connect';

const BentoGridRow = ({ showQuickConnect, onCloseQuickConnect, onOpenQuickConnect }: {
  showQuickConnect?: boolean;
  onCloseQuickConnect?: () => void;
  onOpenQuickConnect?: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  // Booking State
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('omchoksi108@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    alert(`Booking Confirmed for December ${selectedDate}, 2025 at ${selectedTime}.\n(This is a demo action)`);
    setShowBooking(false);
    setSelectedTime(null);
  }

  return (
    <div className="w-full p-8 font-sans text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* --- CARD 1: Time Zone (Left) --- */}
        <div className="relative group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-sm backdrop-blur-xl h-[420px] flex flex-col transition-all hover:shadow-md">
          <div className="p-8 relative z-20 text-center">
            <h3 className="mb-6 font-serif text-2xl leading-tight text-[var(--foreground)]">
              I'm very flexible with time zone communications
            </h3>

            {/* Timezone Tags */}
            <div className="flex justify-center gap-3">
              <span className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs font-bold text-[var(--muted-foreground)] backdrop-blur-sm">
                GB UK
              </span>
              <span className="flex items-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-bold text-[var(--foreground)] shadow-sm">
                IN India
              </span>
              <span className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs font-bold text-[var(--muted-foreground)] backdrop-blur-sm">
                US USA
              </span>
            </div>
          </div>

          {/* Dotted Globe Visual */}
          <div className="absolute inset-0 top-24 w-full h-full pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
              alt="World Map"
              className="h-full w-full object-cover opacity-60 dark:opacity-40"
            />
          </div>

          {/* Bottom Location Info */}
          <div className="absolute bottom-8 left-8 z-30">
            <div className="flex flex-col items-start gap-1">
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 text-[var(--foreground)] mb-1" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Remote</span>
                <span className="text-lg font-bold text-[var(--foreground)]">India</span>
              </div>

              <button
                onClick={onOpenQuickConnect || (() => { })}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-all hover:gap-3 cursor-pointer"
              >
                Connect now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- CARD 2: CTA (Middle) --- */}
        <div className="relative flex flex-col items-center justify-center rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 text-center transition-all hover:shadow-md h-[420px]">
          <h3 className="mb-8 font-sans text-3xl text-[var(--foreground)] leading-[1.1]">
            Ready to discuss your <br />
            next AI or data project?
          </h3>

          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--muted)] hover:shadow-sm active:scale-95 cursor-pointer"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]" />
            )}
            <span>omchoksi108@gmail.com</span>

            {/* Copied Tooltip */}
            <span className={`absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-[var(--muted)] px-2 py-1 text-xs text-[var(--foreground)] transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
              Copied!
            </span>
          </button>
        </div>

        {/* --- CARD 3: Tech Stack / Browser (Right) --- */}
        <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] h-[420px] transition-all hover:shadow-md">
          {/* Top Tags Section */}
          <div className="p-6">
            <div className="flex gap-2 overflow-hidden mb-4">
              <span className="px-2 py-1 bg-[var(--muted)] border border-[var(--border)] rounded text-xs flex items-center gap-1"><Terminal className="w-3 h-3" /> Bash</span>
              <span className="px-2 py-1 bg-[var(--muted)] border border-[var(--border)] rounded text-xs flex items-center gap-1"><Database className="w-3 h-3" /> SQL</span>
            </div>
          </div>

          {/* Browser Mockup Visual */}
          <div className="mt-auto w-full px-6 pb-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg">
              {/* Browser Header */}
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--muted)] px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="ml-2 h-1.5 w-16 rounded-full bg-[var(--border)]" />
              </div>

              {/* Browser Content */}
              <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(var(--muted)_1px,transparent_1px)] [background-size:16px_16px] p-6 text-center">
                <h4 className="text-sm font-bold text-[var(--foreground)]">Websites that</h4>
                <span className="text-2xl font-black text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-primary)' }}>
                  Impact.
                </span>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-medium text-[var(--primary-foreground)]">
                    Start &rarr;
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-[10px] font-medium text-[var(--muted-foreground)]">
                    Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Connect Modal */}
      <QuickConnect
        isOpen={showQuickConnect || false}
        onClose={onCloseQuickConnect || (() => { })}
        onBookCall={() => setShowBooking(true)}
      />

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-end justify-center p-4">
          <div className="w-full max-w-lg mx-auto bg-[var(--card)] backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl font-sans text-[var(--foreground)] border border-[var(--border)] animate-in slide-in-from-bottom-4 duration-300">
            {/* Close button */}
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--muted)]/10 hover:bg-[var(--muted)]/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="text-lg font-bold">×</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--foreground)]">Book a Call</h3>
                <p className="text-xs text-[var(--muted-foreground)]">Select a time that works for you</p>
              </div>
            </div>

            {/* Calendar */}
            <div className="space-y-4">
              {/* Date Selection */}
              <div className="flex items-center justify-between">
                <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h4 className="font-semibold text-[var(--foreground)]">December 2025</h4>
                <button className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--muted-foreground)] mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setSelectedDate(i + 1)}
                    className={`aspect-square text-sm rounded-lg hover:bg-[var(--muted)] transition-colors ${i + 1 === selectedDate ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'text-[var(--foreground)]'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <h5 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Available Times
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all ${selectedTime === time
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                          : 'bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleConfirmBooking}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BentoGridRow;