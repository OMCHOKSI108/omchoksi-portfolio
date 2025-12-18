"use client";
import React, { useEffect, useMemo, useState } from "react";
import QuickConnect from "./quick-connect";

export default function QuickConnectRoot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const openHandler = () => {
      setIsOpen(true);
      setShowBooking(false);
      setSelectedDate(null);
      setSelectedSlot(null);
      setConfirmed(false);
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

  const handleConfirm = () => {
    if (!selectedDate) return;
    // Keep the user on the page. Show friendly confirmation banner.
    setConfirmed(true);

    // Do not navigate away. Optionally, you could still send a booking request
    // to a backend or analytics endpoint here.

    // Auto-hide the success message after 3 seconds but keep the modal open.
    setTimeout(() => {
      setConfirmed(false);
    }, 3000);
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
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Pick a date and optional time slot below.</p>

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
                      className={`px-2 py-2 text-sm rounded-lg border ${
                        selectedSlot === s
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
                disabled={!selectedDate}
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedDate ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "opacity-50 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>

          {confirmed && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800">
              Booking confirmed — opening scheduler.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 