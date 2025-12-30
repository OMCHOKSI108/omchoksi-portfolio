"use client";
import React, { useEffect, useMemo, useState } from "react";
import QuickConnect from "./quick-connect";

export default function QuickConnectRoot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const openHandler = () => {
      setIsOpen(true);
      setShowBooking(false);
      setSelectedDate(null);
      setSelectedSlot(null);
      setConfirmed(false);
      setBookingForm({ name: '', email: '' });
      setIsSubmitting(false);
    };
    const closeHandler = () => {
      setIsOpen(false);
      setShowBooking(false);
    };

    window.addEventListener("open-quick-connect", openHandler as EventListener);
    window.addEventListener("close-quick-connect", closeHandler as EventListener);

    return () => {
      window.removeEventListener("open-quick-connect", openHandler as EventListener);
      window.removeEventListener("close-quick-connect", closeHandler as EventListener);
    };
  }, []);

  const todayIso = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const generateSlots = (dateIso: string) => {
    const slots: string[] = [];
    const start = 9 * 60; // 9:00
    const end = 17 * 60 + 30; // 17:30
    for (let t = start; t <= end; t += 30) {
      const hh = Math.floor(t / 60);
      const mm = t % 60;
      slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
    }
    return slots;
  };

  const slots = useMemo(() => (selectedDate ? generateSlots(selectedDate) : []), [selectedDate]);

  const isPastSlot = (dateIso: string, time: string) => {
    const now = new Date();
    const dt = new Date(dateIso + "T" + time + ":00");
    return dt.getTime() <= now.getTime();
  };

  const handleConfirm = async () => {
    if (!selectedDate || !bookingForm.name || !bookingForm.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: bookingForm.name,
          email: bookingForm.email,
          message: `Requested Date: ${selectedDate}, Slot: ${selectedSlot || 'Any time'}`,
        }),
      });

      if (res.ok) {
        setConfirmed(true);
        setTimeout(() => {
          setConfirmed(false);
          setIsOpen(false);
          setShowBooking(false);
        }, 3000);
      } else {
        alert('Failed to send booking request. Please try again.');
      }
    } catch (error) {
      alert('Error sending booking request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (!showBooking) {
    return (
      <QuickConnect
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setShowBooking(false);
        }}
        onBookCall={() => setShowBooking(true)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setShowBooking(false);
        }}
      />

      <div className="relative w-full max-w-2xl mx-auto bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
        <button
          onClick={() => {
            setIsOpen(false);
            setShowBooking(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--muted)]/10"
        >
          ×
        </button>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3">Schedule a call</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Enter your details and pick a date/time.</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-2">Date</label>
            <input
              type="date"
              min={todayIso}
              value={selectedDate ?? ""}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot(null);
              }}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-2">Available slots</label>
            {!selectedDate ? (
              <div className="text-[var(--muted-foreground)] text-sm">Select a date to see slots.</div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s) => {
                  const disabled = selectedDate === todayIso && isPastSlot(selectedDate, s);
                  return (
                    <button
                      key={s}
                      disabled={disabled}
                      onClick={() => setSelectedSlot(s)}
                      className={`px-2 py-2 text-sm rounded-lg border ${selectedSlot === s
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                          : "bg-[var(--card)] text-[var(--foreground)]"
                        } ${disabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setShowBooking(false);
              }}
              className="px-4 py-2 rounded-lg border border-[var(--border)] bg-transparent"
            >
              Back
            </button>

            <div className="flex items-center gap-3">
              <button
                disabled={!selectedDate || !bookingForm.name || !bookingForm.email || isSubmitting}
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${(selectedDate && bookingForm.name && bookingForm.email) ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "opacity-50 cursor-not-allowed"
                  }`}
              >
                {isSubmitting && <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                Confirm
              </button>
            </div>
          </div>

          {confirmed && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800">
              Booking confirmed and email sent!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
