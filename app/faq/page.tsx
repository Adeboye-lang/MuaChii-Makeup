"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    category: "Before Your Appointment",
    items: [
      { q: "How far in advance should I book?", a: "At least 1 day before your appointment. For bridal or high-demand dates, we recommend booking 2–4 weeks in advance. Express (same-day) bookings are available subject to an additional fee of ₦5,000." },
      { q: "How should I prepare my skin before my appointment?", a: "Come with a clean, moisturized face — no existing makeup, please. A clean environment (good lighting, a chair at a comfortable height) helps me do my best work. Drink plenty of water in the days leading up to your appointment for the best skin canvas." },
      { q: "Should I bring any reference photos?", a: "Absolutely! Bring inspo photos of looks you love — pins from Pinterest, Instagram saves, or screenshots. You can share them in your booking form or send them via WhatsApp before your appointment." },
      { q: "Do you offer a bridal trial?", a: "Yes! A bridal trial session is available and strongly recommended for brides. It's a dedicated session where we test your desired look together before the big day. Contact us to arrange yours." },
    ],
  },
  {
    category: "Payments & Deposits",
    items: [
      { q: "How much deposit do I need to pay?", a: "A 50% deposit of the total service fee is required to confirm and secure your booking date. The remaining 50% balance is due on the day of service, before the session ends." },
      { q: "How can I pay the deposit?", a: "Payments are accepted via bank transfer or cash. We do not accept ATM cards at this time. Bank details will be shared with you after your booking is confirmed." },
      { q: "Is the deposit refundable?", a: "All deposits are strictly non-refundable. In the event of a cancellation or no-show, the deposit is forfeited. However, rescheduling is allowed once within 30 days, subject to availability." },
    ],
  },
  {
    category: "The Service & Products",
    items: [
      { q: "What brands/products do you use?", a: "I work exclusively with high-quality, professional-grade products — including luxury skin prep serums, primers, foundations, and setting sprays. All products are selected to suit a wide range of skin tones and types, with a particular focus on melanin-rich skin." },
      { q: "Do you include lashes?", a: "Premium lashes are included in Bridal Glam and Photoshoot Makeup packages. For other services, a premium lash set can be added on for ₦4,500. Individual lash applications are also available." },
      { q: "How long will my makeup last?", a: "With proper skin prep, priming, and our professional finishing sprays, your makeup is designed to last 12+ hours. I'll teach you any key touch-up tips for the specific look we create together." },
    ],
  },
  {
    category: "Location & Travel",
    items: [
      { q: "Where are you based?", a: "I'm based in Abuja, Nigeria and serve clients across the FCT. Home service sessions are available — a travel/logistics fee may apply depending on your location within or outside the city." },
      { q: "Do you travel for destination weddings?", a: "Yes! I'm available for destination bookings across Nigeria and internationally. Please reach out early so we can plan logistics, travel arrangements, and any applicable fees together." },
      { q: "Can I come to your studio?", a: "Currently, sessions are offered as home service (I come to you) or at agreed locations. Please include your preferred service location in your booking form." },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? "border-brand-blush shadow-lg shadow-brand-blush/10 bg-white" : "border-white bg-white hover:border-brand-nude"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className={`font-sans font-bold leading-snug text-base ${isOpen ? "text-brand-cocoa" : "text-brand-espresso"}`}>{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-brand-blush text-white rotate-180" : "bg-brand-champagne text-brand-espresso"}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-6 pb-6 font-sans font-medium text-brand-espresso/70 leading-relaxed text-sm border-t border-brand-champagne pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">
      {/* Header */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-75 bg-brand-blush/15 rounded-full blur-[120px] z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30 mb-6">
            <Sparkles size={12} /> Got Questions?
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso mb-6">
            Frequently<br/>
            <span className="text-brand-cocoa">Asked Questions</span>
          </h1>
          <p className="text-brand-espresso/60 font-sans font-medium text-lg leading-relaxed max-w-xl mx-auto">
            Everything you need to know before booking your glam session. Can't find your answer? Chat with us directly.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-nude/30 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10 pt-10 space-y-14">
          {FAQS.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-2xl font-serif text-brand-espresso flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-brand-blush shrink-0 inline-block"></span>
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const id = `${section.category}__${item.q}`;
                  return (
                    <AccordionItem
                      key={id}
                      q={item.q}
                      a={item.a}
                      isOpen={openItem === id}
                      onToggle={() => setOpenItem(openItem === id ? null : id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have Q? */}
          <div className="bg-brand-espresso rounded-[2.5rem] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blush/20 rounded-full blur-[80px] -mr-20 -mt-20 z-0"></div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl font-serif text-white">Still have a question?</h3>
              <p className="text-brand-nude/70 font-sans font-medium">Chat with me directly on WhatsApp — I'm usually online and happy to help.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <a
                  href="https://wa.me/2349025567874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white text-sm font-extrabold rounded-full hover:bg-[#1ebe57] transition-all shadow-lg"
                >
                  Chat on WhatsApp
                </a>
                <Link href="/booking" className="inline-flex items-center justify-center px-8 py-4 bg-brand-blush text-white text-sm font-extrabold rounded-full hover:bg-brand-cocoa transition-all shadow-lg">
                  Book Now ✨
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
