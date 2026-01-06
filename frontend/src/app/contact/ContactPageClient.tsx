"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function ContactPageClient() {
  const params = useSearchParams();
  const isBook = params?.has("book-call");
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Add 1 day to get tomorrow
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrow);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const pad = (n: number) => String(n).padStart(2, "0");

  const generateSlots = (start = 9, end = 17, interval = 30) => {
    const slots: string[] = [];
    for (let h = start; h < end; h++) {
      for (let m = 0; m < 60; m += interval) {
        slots.push(`${pad(h)}:${pad(m)}`);
      }
    }
    return slots;
  };

  const formatSlot = (hhmm: string) => {
    const [hh, mm] = hhmm.split(":").map(Number);
    const date = new Date();
    date.setHours(hh, mm, 0, 0);
    const hours = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? "pm" : "am";
    return `${hours}:${pad(mm)}${ampm}`;
  };

  const slots = generateSlots(9, 18, 30); // 9:00 - 17:30 by 30m

  const openSchedulerForDate = (slot?: string) => {
    if (!bookingUrl) return;
    const url = new URL(bookingUrl, window.location.origin);
    // Attach date and time as query params to support schedulers that accept them.
    url.searchParams.set("date", selectedDate);
    if (slot) url.searchParams.set("time", slot);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const confirmBooking = () => {
    // Build friendly message
    const humanTime = selectedSlot ? ` ${formatSlot(selectedSlot)}` : "";
    const message = `Thanks — your request for ${selectedDate}${humanTime} is being processed.`;
    setConfirmationMessage(message);
    setConfirmed(true);

    if (bookingUrl) {
      // open scheduler (may use date/time params)
      openSchedulerForDate(selectedSlot || undefined);
    } else {
      // Fallback: open mailto with prefilled subject/body
      const subject = encodeURIComponent(`Booking request: ${selectedDate}${selectedSlot ? ' ' + selectedSlot : ''}`);
      const body = encodeURIComponent(`Hi Om,%0D%0AI'd like to connect on ${selectedDate}${selectedSlot ? ' at ' + selectedSlot : ''}. Please confirm your availability.%0D%0AThanks.`);
      window.location.href = `mailto:hello@omchoksi.dev?subject=${subject}&body=${body}`;
    }

    // Auto-hide confirmation after 6 seconds and re-enable
    setTimeout(() => {
      setConfirmationMessage(null);
      setConfirmed(false);
    }, 6000);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Contact</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-3">
            Let's Get <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>In Touch</span>
          </h1>
          <p className="mt-3 text-[var(--muted-foreground)]">Pick a time on my calendar to connect, or send a quick message.</p>
        </div>

        {isBook ? (
          bookingUrl ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {confirmationMessage && (
                <div className="lg:col-span-3">
                  <div role="status" className="mx-auto max-w-3xl mb-4 rounded-md bg-green-100/10 border border-green-600 text-green-800 dark:bg-green-900/20 dark:border-green-700 p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                      <div className="text-sm font-medium">{confirmationMessage}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="lg:col-span-1">
                <div className="rounded-xl p-4 border border-[var(--border)] bg-[var(--card)]">
                  <label className="flex flex-col text-sm text-[var(--muted-foreground)]">
                    <span className="mb-2">Choose date</span>
                    <input
                      type="date"
                      min={tomorrow}
                      value={selectedDate}
                      onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(null); }}
                      className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
                    />
                  </label>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Available slots</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map((slot) => {
                        // For future dates, all slots are available
                        // Keep basic validation in case of edge cases
                        const [hh, mm] = slot.split(":").map(Number);
                        const slotDate = new Date(selectedDate + "T" + `${pad(hh)}:${pad(mm)}:00`);
                        const now = new Date();
                        const isPast = slotDate.getTime() <= now.getTime();
                        const disabled = isPast; // Only disable if slot is in the past
                        const selected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => !disabled && setSelectedSlot(slot)}
                            disabled={disabled}
                            className={`${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'} rounded-md px-2 py-2 text-xs text-[var(--foreground)] bg-[var(--card)] border border-[var(--border)] transition-transform ${selected ? 'ring-2 ring-[var(--primary)]' : ''}`}
                            aria-pressed={selected}
                          >
                            {formatSlot(slot)}
                          </button>
                        );
                      })}
                    </div>

                    {/* Show helpful message when there are no available slots for this date */}
                    {(() => {
                      const now = new Date();
                      const availableCount = slots.reduce((acc, slot) => {
                        const [hh, mm] = slot.split(":").map(Number);
                        const slotDate = new Date(selectedDate + "T" + `${pad(hh)}:${pad(mm)}:00`);
                        const isPast = slotDate.getTime() <= now.getTime();
                        // For future dates, all slots are available
                        if (!isPast) return acc + 1;
                        return acc;
                      }, 0);
                      if (availableCount === 0) {
                        return (
                          <div className="mt-3 text-sm text-[var(--muted-foreground)]">
                            No available slots for this date. Try another date or click <strong>Confirm</strong> to request this day and I'll follow up.
                          </div>
                        );
                      }
                      return null;
                    })()}

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={confirmBooking}
                        disabled={confirmed}
                        className={`px-6 py-2 rounded-full font-medium shadow-lg transition-all ${!confirmed ? 'text-white hover:shadow-purple-500/20 active:scale-95' : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'}`}
                        style={!confirmed ? { backgroundImage: 'var(--gradient-accent)' } : undefined}
                      >
                        {confirmed ? 'Confirmed' : `Confirm${selectedSlot ? ` — ${formatSlot(selectedSlot)}` : ''}`}
                      </button>

                      <button
                        onClick={() => { setSelectedSlot(null); setSelectedDate(tomorrow); }}
                        className="px-3 py-2 rounded-md border border-[var(--border)]"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--card)]">
                  <iframe
                    src={bookingUrl}
                    title="Booking"
                    className="w-full h-[720px]"
                    frameBorder={0}
                    allow="microphone; camera; autoplay; clipboard-write"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl p-8 border border-[var(--border)] bg-[var(--card)] text-center">
              <p className="text-lg text-[var(--muted-foreground)] mb-4">No booking URL configured.</p>
              <p className="mb-6">Set <strong>NEXT_PUBLIC_BOOKING_URL</strong> in your frontend environment to embed your scheduler (Calendly, YouCanBook.me, etc.).</p>
              <div className="flex items-center justify-center gap-4">
                <a href="mailto:hello@omchoksi.dev" className="px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all active:scale-95" style={{ backgroundImage: 'var(--gradient-accent)' }}>Email me</a>
                <Link href="/" className="px-6 py-3 rounded-full border border-[var(--border)]">Go back</Link>
              </div>
            </div>
          )
        ) : (
          <div className="rounded-xl p-8 border border-[var(--border)] bg-[var(--card)] text-center">
            <p className="text-lg text-[var(--muted-foreground)] mb-4">Choose an action</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact?book-call" className="px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all active:scale-95" style={{ backgroundImage: 'var(--gradient-accent)' }}>Contact me</Link>
              <a href="mailto:hello@omchoksi.dev" className="px-6 py-3 rounded-full border border-[var(--border)]">Send Message</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}