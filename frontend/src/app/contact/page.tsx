"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Mail, Clock, Video, Globe, ChevronLeft, ChevronRight,
  Check, Send, Linkedin, Github
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// --- Types ---
type Tab = "book" | "message";

// --- Components ---

// --- Booking Form Component ---
function BookingConfirmationForm({
  date,
  time,
  onBack,
  onConfirm
}: {
  date: Date;
  time: string;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [formState, setFormState] = useState({ name: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formState.name || !formState.email) {
      setError("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: formState.name,
          email: formState.email,
          message: `Booking Request: ${date.toDateString()} at ${time}\nNotes: ${formState.notes}`,
          date: date.toISOString(),
          time: time
        }),
      });

      if (res.ok) {
        onConfirm();
      } else {
        setError("Failed to submit booking. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--card)] p-6 lg:p-8 animate-in slide-in-from-right duration-300">
      <button
        onClick={onBack}
        className="self-start mb-6 w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="max-w-xl">
        <h4 className="text-xl font-bold mb-6 text-[var(--foreground)]">Enter Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Your name *</label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={e => setFormState({ ...formState, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Email address *</label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-[var(--foreground)]">Additional notes</label>
          <textarea
            value={formState.notes}
            onChange={e => setFormState({ ...formState, notes: e.target.value })}
            rows={4}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-transparent resize-none text-[var(--foreground)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
            placeholder="Please share anything that will help prepare for our meeting."
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3">
          <button onClick={onBack} className="px-6 py-2.5 rounded-full font-medium hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors">
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </div>

        <div className="mt-8 text-xs text-[var(--muted-foreground)] text-center">
          By proceeding, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'form' | 'success'>('calendar');

  // Helper to get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get first day of month (0-6)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    const now = new Date();
    // Don't go back past current month
    if (currentDate.getMonth() > now.getMonth() || currentDate.getFullYear() > now.getFullYear()) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  // Logic: Disable today and past dates
  const isDateDisabled = (day: number) => {
    const now = new Date();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return checkDate < tomorrow;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Time slots
  const timeSlots = [
    "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm",
    "2:00pm", "2:30pm", "3:00pm", "3:30pm"
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setView('form');
  };

  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 animate-in fade-in zoom-in duration-500 bg-[var(--card)]">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Booking Confirmed!</h3>
        <p className="text-[var(--muted-foreground)] max-w-md mb-8">
          You will receive a confirmation email shortly with the meeting details.
        </p>
        <button
          onClick={() => {
            setView('calendar');
            setSelectedDate(null);
            setSelectedTime(null);
          }}
          className="px-6 py-2.5 rounded-full border border-[var(--border)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors"
        >
          Book Another
        </button>
      </div>
    );
  }

  // Common Sidebar Component
  const Sidebar = () => (
    <div className="w-full lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--muted)]/30">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--muted)] mb-3 overflow-hidden border border-[var(--border)]">
            <img src="/images/omchoksi.jpg" alt="Om Choksi" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Om Choksi</p>
          <h3 className="text-xl font-bold text-[var(--foreground)]">30 Min Meeting</h3>
        </div>

        <div className="space-y-4 text-sm text-[var(--muted-foreground)]">
          {selectedDate && (
            <div className="flex items-center gap-3 font-semibold text-[var(--foreground)]">
              <Calendar className="w-4 h-4" />
              <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
          {selectedTime ? (
            <div className="flex items-center gap-3 font-semibold text-[var(--foreground)]">
              <Clock className="w-4 h-4" />
              <span>{selectedTime}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" />
              <span>30m</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Video className="w-4 h-4" />
            <span>Google Meet</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4" />
            <span>Asia/Kolkata</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === 'form' && selectedDate && selectedTime) {
    return (
      <div className="flex flex-col lg:flex-row h-full min-h-[500px] animate-in slide-in-from-bottom-4 duration-500 bg-[var(--card)]">
        <Sidebar />
        <div className="flex-1">
          <BookingConfirmationForm
            date={selectedDate}
            time={selectedTime}
            onBack={() => setView('calendar')}
            onConfirm={() => setView('success')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[500px]">
      <Sidebar />

      {/* Calendar Area */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        {/* Calendar Grid */}
        <div className={`flex-1 transition-all ${selectedDate ? 'md:border-r border-[var(--border)] md:pr-8' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-[var(--foreground)]">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h4>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-1 hover:bg-[var(--muted)] rounded-full transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-1 hover:bg-[var(--muted)] rounded-full transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {padding.map(p => <div key={`pad-${p}`} />)}
            {days.map(day => {
              const disabled = isDateDisabled(day);
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();

              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => {
                    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    setSelectedDate(newDate);
                    setSelectedTime(null); // Reset time when date changes
                  }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md scale-105'
                      : disabled
                        ? 'text-[var(--muted-foreground)] cursor-not-allowed opacity-50 decoration-1 line-through'
                        : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full md:w-48 flex flex-col gap-2 max-h-[380px] overflow-y-auto custom-scrollbar pr-2"
            >
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2 md:hidden">
                Available times for {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </h4>
              <div className="hidden md:block text-sm font-semibold text-[var(--foreground)] mb-4">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </div>

              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`
                     w-full py-2.5 px-4 rounded-lg border text-sm font-medium transition-all
                     ${selectedTime === time
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                      : 'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--muted)]'
                    }
                   `}
                >
                  {time}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SendMessageForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, type: 'basic' }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Send a Message</h3>
        <p className="text-[var(--muted-foreground)]">Response time: Usually within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Name</label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="Om Choksi"
              className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Email</label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="om.choksi@example.com"
              className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--muted-foreground)] text-[var(--foreground)]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-[var(--foreground)]">Message</label>
            <span className="text-xs text-[var(--muted-foreground)]">{formState.message.length}/1000</span>
          </div>
          <textarea
            rows={6}
            required
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            placeholder="What would you like to build?"
            className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--muted-foreground)] resize-none text-[var(--foreground)]"
          />
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-sm font-medium text-center">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium text-center">
            Failed to send message. Please try again or email me directly at omchoksi108@gmail.com.
          </div>
        )}
      </form>
    </div>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<Tab>("book");

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[var(--muted)]/50 to-transparent pointer-events-none" />

        {/* LEFT DECORATIVE PILLAR */}
        <div className="absolute left-[8%] xl:left-[12%] top-32 bottom-32 w-12 pointer-events-none select-none z-[5] hidden xl:block">
          <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
              <defs>
                <pattern id="diagonalStripesLeft" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)] opacity-30" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="64" height="1000" fill="url(#diagonalStripesLeft)" />
            </svg>
          </div>
        </div>

        {/* RIGHT DECORATIVE PILLAR */}
        <div className="absolute right-[8%] xl:right-[12%] top-32 bottom-32 w-12 pointer-events-none select-none z-[5] hidden xl:block">
          <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 5%, white 95%, transparent 100%)' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 1000" preserveAspectRatio="none">
              <defs>
                <pattern id="diagonalStripesRight" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(-45)">
                  <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" className="text-[var(--foreground)] opacity-30" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="64" height="1000" fill="url(#diagonalStripesRight)" />
            </svg>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 font-sans">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--muted-foreground)] uppercase mb-4">Contact</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] tracking-tight mb-2">
              Let's Get <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">In Touch</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-4 text-[var(--muted-foreground)] text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:omchoksi108@gmail.com" className="hover:text-[var(--foreground)] transition-colors">omchoksi108@gmail.com</a>
              <span className="mx-2">•</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-[var(--foreground)] transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[var(--foreground)] transition-colors"><Github className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex p-1 bg-[var(--muted)]/50 backdrop-blur-md rounded-full border border-[var(--border)]">
              <button
                onClick={() => setActiveTab("book")}
                className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                            ${activeTab === "book"
                    ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }
                        `}
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </button>
              <button
                onClick={() => setActiveTab("message")}
                className={`
                            flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                            ${activeTab === "message"
                    ? "bg-[var(--card)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }
                        `}
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden min-h-[500px]"
          >
            {activeTab === "book" ? <CalendarWidget /> : <SendMessageForm />}
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
