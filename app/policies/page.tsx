import Link from "next/link";
import { CalendarDays, CreditCard, Clock, AlertCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Booking Policies | MuaChii",
  description: "Booking, payment, and timing policies for MuaChii luxury makeup services.",
};

export default function PoliciesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">
      {/* Header */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-blush/15 rounded-full blur-[120px] z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30 mb-6">
            <Sparkles size={12} /> Guidelines
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso mb-6">
            Salon<br/>
            <span className="text-brand-cocoa">Policies</span>
          </h1>
          <p className="text-brand-espresso/60 font-sans font-medium text-lg leading-relaxed max-w-xl mx-auto">
            To ensure a flawless, timely, and luxurious experience for every client, please review these policies carefully before securing your appointment.
          </p>
        </div>
      </section>

      {/* Policy Cards */}
      <section className="pb-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-80 h-80 bg-brand-blush/10 rounded-full blur-[100px] -translate-y-1/2 z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10 pt-8 space-y-10">

          {/* Booking */}
          <PolicyCard
            icon={<CalendarDays size={22} className="text-white" />}
            iconBg="bg-brand-cocoa"
            title="Booking & Rescheduling"
            items={[
              { text: "Booking must be done at least 1 day before the appointment date.", warn: false },
              { text: "Express (same-day) booking is subject to an additional charge of ₦5,000.", warn: false },
              { text: "Deposits must be confirmed in full to officially secure your booking date.", warn: false },
              { text: "Rescheduling is only allowed once and must happen within 30 days (1 month) of the original appointment. No-shows automatically cancel the booking and forfeit the deposit.", warn: true },
              { text: "All rescheduling is subject to the MUA's availability — please confirm before rescheduling.", warn: false },
            ]}
          />

          {/* Payment */}
          <PolicyCard
            icon={<CreditCard size={22} className="text-white" />}
            iconBg="bg-brand-blush"
            title="Payment Terms"
            items={[
              { text: "A 50% deposit is required to lock in your booking date.", warn: false },
              { text: "The remaining 50% balance must be paid during or before the end of the service.", warn: false },
              { text: "All deposits are strictly non-refundable under any circumstances.", warn: true },
              { text: "Payment is accepted via bank transfer or cash only. No ATM cards are accepted.", warn: false },
              { text: "Additional charges may apply based on travel distance and location within or outside Abuja.", warn: false },
            ]}
          />

          {/* Timing */}
          <PolicyCard
            icon={<Clock size={22} className="text-white" />}
            iconBg="bg-brand-gold"
            title="Timing & Punctuality"
            subtitle="To ensure a seamless, high-quality service for all clients, every session is given a specific time frame. Please adhere to the following:"
            items={[
              { text: "Clients must be fully ready at the agreed appointment time — clean face, makeup-free, and in a ready environment for service.", warn: false },
              { text: "A grace period of 15 minutes is allowed from the scheduled start time.", warn: false },
              { text: "Delays beyond 15 minutes will attract an additional fee of ₦5,000 per 15-minute block. This covers waiting time and schedule disruption.", warn: true },
              { text: "If delay exceeds 45–60 minutes, the MUA reserves the right to shorten the service to fit the remaining time, OR cancel the appointment entirely with the booking forfeited.", warn: true },
            ]}
          />

          {/* CTA */}
          <div className="text-center pt-8">
            <p className="text-brand-espresso/60 font-sans font-medium mb-6">Have read and understood all the policies?</p>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 bg-gradient-to-r from-brand-cocoa to-brand-blush text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-2xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all shadow-lg"
            >
              I Understand — Let's Book ✨
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicyCard({
  icon,
  iconBg,
  title,
  subtitle,
  items,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  items: { text: string; warn: boolean }[];
}) {
  return (
    <div className="bg-brand-champagne border-2 border-white rounded-[2.5rem] p-8 md:p-12 shadow-lg shadow-brand-blush/5 hover:-translate-y-1 transition-all duration-400 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-nude/30 rounded-full blur-[60px] -mr-16 -mt-16 z-0"></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-brand-nude/40">
          <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
            {icon}
          </div>
          <h3 className="text-3xl font-serif text-brand-espresso">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-brand-espresso/60 font-sans font-medium mb-8 leading-relaxed">{subtitle}</p>
        )}
        <ul className="space-y-5">
          {items.map(({ text, warn }, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className={`mt-1 flex-shrink-0 ${warn ? "text-red-500" : "text-brand-cocoa"}`}>
                <AlertCircle size={18} />
              </div>
              <p className={`font-sans font-medium leading-relaxed ${warn ? "text-red-600 font-bold" : "text-brand-espresso/80"}`}>
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
