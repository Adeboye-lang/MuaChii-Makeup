import ServiceCard from "../components/ServiceCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getServices } from "../utils/data";

export const metadata = {
  title: "Services & Pricing | MuaChii",
  description: "Bridal, soft glam, editorial, and event makeup services in Abuja, Nigeria.",
};

export default async function ServicesPage() {
  const servicesData = await getServices();
  
  // Map services data to component props format
  const allServices = servicesData.services.map((service: { name: string; description: string; duration: string; price?: number; features: string[] }) => ({
    title: service.name,
    description: service.description,
    duration: service.duration,
    price: `₦${service.price?.toLocaleString() || 'Custom'}`,
    features: service.features,
  }));
  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">
      {/* Header */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-brand-blush/20 rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-cocoa/10 rounded-full blur-[80px] z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30 mb-6">
            <Sparkles size={12} /> Investment in You
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso mb-6">
            Services &<br/>
            <span className="text-brand-cocoa">Pricing</span>
          </h1>
          <p className="text-brand-espresso/60 font-sans font-medium text-lg leading-relaxed max-w-xl mx-auto">
            Premium artistry tailored for every occasion. Each session uses luxury professional products and a personalized skin-prep approach.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 pb-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-brand-blush/8 rounded-full blur-[120px] -translate-y-1/2 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allServices.map((service: { title: string; description: string; duration: string; price: string; features: string[] }, index: number) => (
              <ServiceCard key={index} {...service} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included + Who it's For */}
      <section className="py-28 bg-brand-espresso relative overflow-hidden">
        <div className="absolute top-0 right-0 w-150 h-150 bg-brand-blush/15 rounded-full blur-[150px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cocoa/30 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* What's included */}
            <div className="space-y-8">
              <div>
                <span className="inline-block text-brand-nude/50 text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Every Session Includes</span>
                <h3 className="text-4xl font-serif text-brand-nude">What's Included</h3>
              </div>
              <ul className="space-y-6">
                {[
                  { title: "Luxury Skin Prep", body: "Exclusive serums, moisturizers, and primers selected for your specific skin type and tone." },
                  { title: "Premium Lashes", body: "High-quality strip or individual lashes custom-fitted to complement your eye shape perfectly." },
                  { title: "Setting & Sealing", body: "Professional fixing sprays and powders ensuring your makeup lasts 12+ hours beautifully." },
                  { title: "Personalised Consultation", body: "Every session starts with understanding your vision, skin, and occasion for a truly bespoke result." },
                ].map(({ title, body }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-brand-blush mt-3 shrink-0"></div>
                    <p className="font-sans text-brand-nude/80 font-medium leading-relaxed">
                      <strong className="text-white font-extrabold">{title}:</strong> {body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="bg-white/8 backdrop-blur-md p-10 border border-brand-blush/20 rounded-[2.5rem] space-y-6 flex flex-col">
              <span className="inline-block text-brand-nude/50 text-xs font-extrabold uppercase tracking-[0.25em]">This Is For You If…</span>
              <h3 className="text-4xl font-serif text-brand-blush">Who This Is For</h3>
              <p className="text-brand-nude/70 font-sans font-medium leading-relaxed text-lg">
                My services are for the woman who values refinement, quality, and a luxury experience. Whether it's the biggest day of your life, a business milestone, or simply a night where you want to feel breathtakingly beautiful — I provide a calming, expert touch that delivers guaranteed, stunning results.
              </p>
              <p className="text-brand-nude/60 font-sans font-medium leading-relaxed">
                Available in Abuja. Destination bookings welcome. Additional travel charges may apply.
              </p>
              <div className="pt-4 mt-auto">
                <Link href="/contact" className="inline-flex items-center gap-2 text-brand-blush font-extrabold text-sm uppercase tracking-widest hover:text-white transition-colors group">
                  Contact to Book
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
