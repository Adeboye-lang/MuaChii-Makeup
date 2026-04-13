"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  CalendarDays,
  User,
  FileCheck,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "bridal", name: "Bridal Glam", duration: "90 mins", price: 80000, emoji: "💍", description: "Timeless bridal perfection from aisle to last dance." },
  { id: "soft", name: "Soft Glam", duration: "60 mins", price: 35000, emoji: "✨", description: "Glowing, blended sophistication for any occasion." },
  { id: "natural", name: "Natural Beat", duration: "45 mins", price: 25000, emoji: "🌿", description: "Dewy, effortless 'no-makeup' makeup look." },
  { id: "photo", name: "Photoshoot Makeup", duration: "120 mins", price: 60000, emoji: "📷", description: "HD-ready artistry built for the camera." },
  { id: "home", name: "Home Service", duration: "75 mins", price: 50000, emoji: "🏡", description: "Luxury brought directly to your doorstep." },
  { id: "group", name: "Group / Event Glam", duration: "Varies", price: 0, emoji: "💃", description: "Coordinated glam for bridal parties & events." },
];

const ADD_ONS = [
  { id: "body-glow", name: "Body Glow", price: 5000, emoji: "✨" },
  { id: "hd-brows", name: "HD Brows", price: 3000, emoji: "🪄" },
  { id: "glitter-eyes", name: "Glitter Eyes", price: 4000, emoji: "💫" },
  { id: "lash-set", name: "Premium Lash Set", price: 4500, emoji: "👁️" },
];

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const EVENT_TYPES = ["Wedding / Bridal", "Birthday Party", "Photoshoot", "Corporate Event", "Graduation", "Engagement", "Night Out", "Other"];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BookingData {
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
  addOns: string[];
  addOnTotal: number;
  date: Date | null;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  eventType: string;
  notes: string;
  agreed: boolean;
}

const INITIAL: BookingData = {
  serviceId: "", serviceName: "", servicePrice: 0, serviceDuration: "",
  addOns: [], addOnTotal: 0,
  date: null, timeSlot: "",
  name: "", phone: "", email: "", location: "", eventType: "", notes: "",
  agreed: false,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatNaira(amount: number) {
  if (amount === 0) return "Custom Quote";
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function buildWhatsAppMessage(b: BookingData) {
  const addOnNames = b.addOns.map(id => ADD_ONS.find(a => a.id === id)?.name).join(", ") || "None";
  const total = b.servicePrice === 0 ? "Custom Quote" : formatNaira(b.servicePrice + b.addOnTotal);
  const lines = [
    `✨ *New Booking Request — MuaChii*`,
    ``,
    `📋 *Service:* ${b.serviceName} (${b.serviceDuration})`,
    b.addOns.length ? `➕ *Add-ons:* ${addOnNames}` : null,
    `📅 *Date:* ${b.date ? formatDate(b.date) : "TBD"}`,
    `⏰ *Time:* ${b.timeSlot}`,
    `💰 *Total Estimate:* ${total}`,
    ``,
    `👤 *Client Details:*`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `📍 Location: ${b.location}`,
    b.eventType ? `🎉 Event: ${b.eventType}` : null,
    b.notes ? `📝 Notes: ${b.notes}` : null,
    ``,
    `_Client has read and agreed to all booking & payment policies._`,
  ].filter(Boolean).join("\n");
  return encodeURIComponent(lines);
}

// ─── Step Components ────────────────────────────────────────────────────────────

function StepService({ data, setData }: { data: BookingData; setData: (d: BookingData) => void }) {
  const toggle = (addOnId: string) => {
    const exists = data.addOns.includes(addOnId);
    const addOns = exists ? data.addOns.filter(a => a !== addOnId) : [...data.addOns, addOnId];
    const addOnTotal = addOns.reduce((sum, id) => sum + (ADD_ONS.find(a => a.id === id)?.price ?? 0), 0);
    setData({ ...data, addOns, addOnTotal });
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map(s => {
          const selected = data.serviceId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setData({ ...data, serviceId: s.id, serviceName: s.name, servicePrice: s.price, serviceDuration: s.duration })}
              className={`p-6 rounded-3xl text-left border-2 transition-all duration-300 group ${
                selected
                  ? "border-brand-blush bg-linear-to-br from-brand-blush/10 to-brand-nude/20 shadow-xl shadow-brand-blush/20"
                  : "border-white bg-white hover:border-brand-nude hover:shadow-lg hover:shadow-brand-blush/10"
              }`}
            >
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h4 className={`font-serif text-lg mb-1 ${selected ? "text-brand-cocoa" : "text-brand-espresso"}`}>{s.name}</h4>
              <p className="text-xs text-brand-espresso/50 font-sans font-medium mb-3 leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-sans font-bold flex items-center gap-1 ${selected ? "text-brand-cocoa" : "text-brand-espresso/60"}`}>
                  <Clock size={13} /> {s.duration}
                </span>
                <span className={`font-serif font-bold text-lg ${selected ? "text-brand-cocoa" : "text-brand-espresso"}`}>
                  {formatNaira(s.price)}
                </span>
              </div>
              {selected && (
                <div className="mt-3 flex items-center gap-2 text-xs font-extrabold text-brand-cocoa uppercase tracking-wider">
                  <Check size={14} /> Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Add-ons */}
      {data.serviceId && (
        <div className="space-y-4">
          <h4 className="font-serif text-xl text-brand-espresso">✨ Enhance your look — Add-ons</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ADD_ONS.map(a => {
              const selected = data.addOns.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                    selected
                      ? "border-brand-blush bg-brand-blush/10 text-brand-cocoa"
                      : "border-white bg-white text-brand-espresso hover:border-brand-nude"
                  }`}
                >
                  <div className="text-2xl mb-1">{a.emoji}</div>
                  <p className="text-xs font-extrabold font-sans">{a.name}</p>
                  <p className="text-xs font-sans text-brand-cocoa mt-0.5">+{formatNaira(a.price)}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StepDateTime({ data, setData }: { data: BookingData; setData: (d: BookingData) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const daysInMonth = useMemo(() => new Date(viewYear, viewMonth + 1, 0).getDate(), [viewYear, viewMonth]);
  const firstDayOfWeek = useMemo(() => new Date(viewYear, viewMonth, 1).getDay(), [viewYear, viewMonth]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!data.date) return;
    
    const dateStr = data.date.toISOString().split("T")[0];
    fetch(`/api/bookings/slots?date=${dateStr}`)
      .then(res => res.json())
      .then(response => setBookedSlots(response.bookedSlots ?? []))
      .catch(() => setBookedSlots([]));
  }, [data.date]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today || d.getDay() === 0) return;
    setData({ ...data, date: d, timeSlot: "" });
  };

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Calendar */}
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-brand-blush/10 border-2 border-white">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="w-9 h-9 rounded-full bg-brand-champagne hover:bg-brand-nude flex items-center justify-center transition-colors">
            <ChevronLeft size={18} className="text-brand-espresso" />
          </button>
          <h4 className="font-serif text-lg text-brand-espresso">{MONTH_NAMES[viewMonth]} {viewYear}</h4>
          <button onClick={nextMonth} className="w-9 h-9 rounded-full bg-brand-champagne hover:bg-brand-nude flex items-center justify-center transition-colors">
            <ChevronRight size={18} className="text-brand-espresso" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_NAMES.map(d => (
            <div key={d} className="text-center text-xs font-extrabold uppercase tracking-wider text-brand-espresso/40 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={i} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(viewYear, viewMonth, day);
            const isPast = date < today;
            const isSunday = date.getDay() === 0;
            const isDisabled = isPast || isSunday;
            const isSelected = data.date?.toDateString() === date.toDateString();
            const isToday = date.toDateString() === today.toDateString();
            return (
              <button
                key={day}
                onClick={() => !isDisabled && selectDate(day)}
                disabled={isDisabled}
                className={`aspect-square w-full rounded-full text-sm font-bold transition-all duration-200 text-center flex items-center justify-center ${
                  isSelected
                    ? "bg-brand-cocoa text-white shadow-lg shadow-brand-blush/30"
                    : isDisabled
                    ? "text-brand-espresso/20 cursor-not-allowed"
                    : isToday
                    ? "bg-brand-nude text-brand-espresso ring-2 ring-brand-blush"
                    : "hover:bg-brand-champagne text-brand-espresso"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-xs font-sans font-medium text-brand-espresso/40 text-center mt-4">Sundays are unavailable</p>
      </div>

      {/* Time Slots */}
      <div className="space-y-4">
        <h4 className="font-serif text-xl text-brand-espresso">
          {data.date ? `Available slots — ${data.date.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "short" })}` : "Select a date first"}
        </h4>
        {data.date ? (
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map(slot => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = data.timeSlot === slot;
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => !isBooked && setData({ ...data, timeSlot: slot })}
                  className={`py-4 rounded-2xl text-sm font-extrabold transition-all duration-200 border-2 ${
                    isBooked
                      ? "border-transparent bg-brand-espresso/5 text-brand-espresso/25 cursor-not-allowed line-through"
                      : isSelected
                      ? "border-brand-blush bg-linear-to-r from-brand-cocoa to-brand-blush text-white shadow-lg shadow-brand-blush/30"
                      : "border-white bg-white text-brand-espresso hover:border-brand-nude hover:shadow-md"
                  }`}
                >
                  {isBooked ? `${slot} · Booked` : slot}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="h-48 bg-white rounded-3xl border-2 border-dashed border-brand-nude flex items-center justify-center">
            <p className="text-brand-espresso/40 font-sans font-medium text-sm">← Pick a date on the calendar</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDetails({ data, setData }: { data: BookingData; setData: (d: BookingData) => void }) {
  const field = (placeholder: string, key: keyof BookingData, type = "text", required = true) => (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={data[key] as string}
      onChange={e => setData({ ...data, [key]: e.target.value })}
      className="w-full bg-brand-champagne border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.15)] transition-all placeholder:text-brand-espresso/30 font-sans font-medium text-brand-espresso"
    />
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {field("Full Name *", "name")}
        {field("WhatsApp / Phone Number *", "phone", "tel")}
      </div>
      <div>
        {field("Location / Area in Abuja *", "location")}
      </div>
      <div>
        <select
          value={data.eventType}
          onChange={e => setData({ ...data, eventType: e.target.value })}
          className="w-full bg-brand-champagne border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.15)] transition-all font-sans font-medium text-brand-espresso cursor-pointer"
        >
          <option value="">Event Type (optional)</option>
          {EVENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>
      <div>
        <textarea
          rows={4}
          placeholder="Any special requests, inspo details, or notes for your artist... (optional)"
          value={data.notes}
          onChange={e => setData({ ...data, notes: e.target.value })}
          className="w-full bg-brand-champagne border-2 border-transparent p-4 rounded-2xl focus:outline-none focus:border-brand-blush focus:bg-white focus:shadow-[0_0_20px_rgb(255,66,161,0.15)] transition-all resize-none placeholder:text-brand-espresso/30 font-sans font-medium text-brand-espresso leading-relaxed"
        />
      </div>
    </div>
  );
}

function StepReview({ data, setData }: { data: BookingData; setData: (d: BookingData) => void }) {
  const addOnsData = ADD_ONS.filter(a => data.addOns.includes(a.id));
  const total = data.servicePrice === 0 ? null : data.servicePrice + data.addOnTotal;
  const deposit = total ? Math.round(total * 0.5) : null;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-3xl p-8 border-2 border-white shadow-lg space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-nude/30 rounded-full blur-[60px] -mr-16 -mt-16 z-0"></div>
        <h4 className="font-serif text-2xl text-brand-espresso relative z-10">Booking Summary</h4>
        <div className="space-y-3 relative z-10">
          {[
            { label: "Service", value: `${data.serviceName} (${data.serviceDuration})`},
            { label: "Add-ons", value: addOnsData.length ? addOnsData.map(a => a.name).join(", ") : "None"},
            { label: "Date", value: data.date ? formatDate(data.date) : "—"},
            { label: "Time", value: data.timeSlot || "—"},
            { label: "Name", value: data.name},
            { label: "Phone", value: data.phone},
            { label: "Location", value: data.location},
            data.eventType ? { label: "Event", value: data.eventType} : null,
          ].filter(Boolean).map(row => row && (
            <div key={row.label} className="flex justify-between items-start gap-4 py-2 border-b border-brand-champagne last:border-0">
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-espresso/40">{row.label}</span>
              <span className="text-sm font-sans font-semibold text-brand-espresso text-right">{row.value}</span>
            </div>
          ))}
        </div>
        {total && (
          <div className="bg-brand-champagne rounded-2xl p-4 space-y-2 relative z-10">
            <div className="flex justify-between">
              <span className="text-sm font-sans font-medium text-brand-espresso/60">Estimated Total</span>
              <span className="font-serif text-xl text-brand-espresso font-bold">{formatNaira(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-sans font-medium text-brand-espresso/60">Deposit to secure (50%)</span>
              <span className="font-serif text-lg text-brand-cocoa font-bold">{formatNaira(deposit!)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Policy Agreement */}
      <div className="bg-brand-blush/5 border-2 border-brand-nude/50 rounded-2xl p-5 flex items-start gap-4">
        <input
          type="checkbox"
          id="policy-agree"
          checked={data.agreed}
          onChange={e => setData({ ...data, agreed: e.target.checked })}
          className="w-5 h-5 rounded mt-0.5 accent-brand-cocoa cursor-pointer shrink-0"
        />
        <label htmlFor="policy-agree" className="text-sm font-sans font-medium text-brand-espresso/80 cursor-pointer leading-relaxed">
          I have read and fully agree to the{" "}
          <Link href="/policies" target="_blank" className="text-brand-cocoa underline hover:text-brand-blush font-bold">
            booking, payment, and timing policies
          </Link>
          . I understand the deposit is non-refundable and rescheduling is subject to availability.
        </label>
      </div>
    </div>
  );
}

// ─── Success Screen ─────────────────────────────────────────────────────────────

function SuccessScreen({ data }: { data: BookingData }) {
  const [saving, setSaving] = useState(false);
  const WHATSAPP_NUMBER = "2349025567874";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(data)}`;

  const handleSaveAndWhatsApp = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Save booking to API
      await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          date: data.date?.toISOString(),
          timeSlot: data.timeSlot,
          service: data.serviceName,
          serviceDuration: data.serviceDuration,
          servicePrice: data.servicePrice,
          addOns: data.addOns,
          addOnTotal: data.addOnTotal,
          location: data.location,
          eventType: data.eventType || "",
          notes: data.notes || "",
          source: "booking-page",
          createdAt: new Date().toISOString(),
          agreed: data.agreed,
        }),
      });
    } catch (error) {
      console.error("Failed to save booking:", error);
    } finally {
      setSaving(false);
      // Open WhatsApp regardless of save status
      window.open(url, "_blank");
    }
  };

  return (
    <div className="text-center py-10 space-y-8 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div
          className="w-28 h-28 bg-linear-to-br from-brand-cocoa to-brand-blush rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-blush/30"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Check size={56} className="text-white" strokeWidth={3} />
          </motion.div>
        </div>

      <div className="space-y-3">
        <h3 className="text-4xl font-serif text-brand-espresso">You're Almost Booked!</h3>
        <p className="text-brand-espresso/60 font-sans font-medium leading-relaxed">
          Your booking details are ready. Tap the button below to send them directly to MuaChii on WhatsApp to confirm your appointment and arrange your deposit.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border-2 border-brand-nude/30 text-left space-y-2 shadow-lg shadow-brand-blush/10">
        <p className="text-xs font-extrabold uppercase tracking-wider text-brand-espresso/40 mb-3">Your Booking</p>
        <p className="font-san font-bold text-brand-espresso">{data.serviceName} · {data.timeSlot}</p>
        <p className="text-sm font-sans text-brand-espresso/60 font-medium">{data.date ? formatDate(data.date) : ""}</p>
        {data.servicePrice > 0 && (
          <p className="text-sm font-sans text-brand-cocoa font-bold">
            Deposit due: {formatNaira(Math.round((data.servicePrice + data.addOnTotal) * 0.5))}
          </p>
        )}
      </div>

      <a
        href="#"
        onClick={handleSaveAndWhatsApp}
        className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:bg-[#1ebe57] transition-colors shadow-xl shadow-green-500/30 hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50"
      >
        <svg viewBox="0 0 32 32" fill="white" className="w-6 h-6">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.131 6.743 3.047 9.373L1.051 31.2l6.02-1.928A15.924 15.924 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.325 22.604c-.387 1.092-1.924 2-3.154 2.264-.84.178-1.937.32-5.629-1.21-4.72-1.952-7.756-6.731-7.992-7.04-.228-.308-1.917-2.553-1.917-4.87 0-2.317 1.21-3.45 1.639-3.923.387-.43.845-.537 1.126-.537.281 0 .562.003.808.015.26.013.607-.099.95.724.354.848 1.204 2.935 1.31 3.149.107.214.178.463.035.749-.14.28-.21.455-.42.701-.209.246-.44.55-.629.738-.21.209-.428.435-.184.854.245.42 1.085 1.785 2.33 2.893 1.6 1.426 2.948 1.866 3.366 2.075.42.21.664.176.91-.106.246-.281 1.052-1.228 1.333-1.648.281-.42.561-.35.945-.21.385.14 2.45 1.155 2.87 1.366.42.21.7.315.805.49.104.175.104 1.012-.283 2.106z"/>
        </svg>
        {saving ? "Saving Booking..." : "Send Booking to MuaChii on WhatsApp"}
      </a>

      <Link href="/" className="block text-sm font-bold text-brand-espresso/40 hover:text-brand-cocoa transition-colors">
        Return to Home
      </Link>
      </motion.div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Service", icon: Sparkles },
  { label: "Date & Time", icon: CalendarDays },
  { label: "Your Details", icon: User },
  { label: "Review", icon: FileCheck },
];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const canProceed = useMemo(() => {
    if (step === 0) return !!data.serviceId;
    if (step === 1) return !!data.date && !!data.timeSlot;
    if (step === 2) return !!data.name && !!data.phone && !!data.location;
    if (step === 3) return data.agreed;
    return false;
  }, [step, data]);

  const handleSubmit = () => {
    if (!canProceed) return;
    setSubmitted(true);
  };

  const total = data.servicePrice === 0 ? null : data.servicePrice + data.addOnTotal;

  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">
      {/* Header */}
      <section className="pt-36 pb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-50 bg-brand-blush/15 rounded-full blur-2xl z-0"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30 mb-6">
            <Sparkles size={12} /> Book Your Glam Session
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-brand-espresso mb-4">
            Let's Get You{" "}
            <span className="text-brand-cocoa">Glam ✨</span>
          </h1>
          <p className="text-brand-espresso/60 font-sans font-medium leading-relaxed">
            Complete the steps below and your booking details will be sent directly to MuaChii via WhatsApp.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 pb-28 relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl">
          {submitted ? (
            <SuccessScreen data={data} />
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 px-4">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div key={i} className="flex items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                          done ? "bg-brand-blush text-white" : active ? "bg-brand-cocoa text-white shadow-lg shadow-brand-blush/30" : "bg-white border-2 border-brand-nude text-brand-espresso/30"
                        }`}>
                          {done ? <Check size={16} /> : <Icon size={16} />}
                        </div>
                        <span className={`hidden md:block text-xs font-extrabold uppercase tracking-wider ${active ? "text-brand-cocoa" : done ? "text-brand-blush" : "text-brand-espresso/30"}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`h-px w-8 md:w-16 transition-all duration-300 ${i < step ? "bg-brand-blush" : "bg-brand-nude"}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step Content */}
              <div className="bg-brand-champagne/50 rounded-[2.5rem] p-6 md:p-10 border-2 border-white shadow-xl shadow-brand-blush/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-serif text-brand-espresso mb-8">
                      {step === 0 && "Choose Your Service"}
                      {step === 1 && "Pick Your Date & Time"}
                      {step === 2 && "Tell Us About You"}
                      {step === 3 && "Review & Confirm"}
                    </h3>

                    {step === 0 && <StepService data={data} setData={setData} />}
                    {step === 1 && <StepDateTime data={data} setData={setData} />}
                    {step === 2 && <StepDetails data={data} setData={setData} />}
                    {step === 3 && <StepReview data={data} setData={setData} />}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation + running total */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-brand-nude/30 gap-4 flex-wrap">
                  <div>
                    {total && step > 0 ? (
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-brand-espresso/40">Running Total</p>
                        <p className="font-serif text-xl text-brand-espresso font-bold">{formatNaira(total)}</p>
                      </div>
                    ) : <div />}
                  </div>

                  <div className="flex items-center gap-4">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-brand-nude text-brand-espresso text-sm font-bold rounded-full hover:border-brand-blush transition-all"
                      >
                        <ChevronLeft size={16} /> Back
                      </button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={() => canProceed && setStep(s => s + 1)}
                        disabled={!canProceed}
                        className={`flex items-center gap-2 px-8 py-3 text-white text-sm font-extrabold uppercase tracking-widest rounded-full transition-all ${
                          canProceed
                            ? "bg-gradient-to-r from-brand-cocoa to-brand-blush hover:shadow-xl hover:shadow-brand-blush/30 hover:-translate-y-0.5 shadow-lg"
                            : "bg-brand-espresso/20 cursor-not-allowed"
                        }`}
                      >
                        Continue <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceed}
                        className={`flex items-center gap-2 px-8 py-3 text-white text-sm font-extrabold uppercase tracking-widest rounded-full transition-all ${
                          canProceed
                            ? "bg-gradient-to-r from-brand-cocoa to-brand-blush hover:shadow-xl hover:shadow-brand-blush/30 hover:-translate-y-0.5 shadow-lg"
                            : "bg-brand-espresso/20 cursor-not-allowed"
                        }`}
                      >
                        Confirm Booking ✨
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
