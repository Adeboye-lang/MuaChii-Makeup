import PortfolioGrid from "../components/PortfolioGrid";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Portfolio | MuaChii",
  description: "Explore luxury bridal, soft glam, and editorial makeup work by MuaChii.",
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">
      {/* Header */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-75 bg-brand-blush/15 rounded-full blur-[120px] z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30 mb-6">
            <Sparkles size={12} /> Our Craft
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso mb-6">
            The<br/>
            <span className="text-brand-cocoa">Gallery</span>
          </h1>
          <p className="text-brand-espresso/60 font-sans font-medium text-lg leading-relaxed max-w-xl mx-auto">
            A curated collection of transformations. Every face a story, every look a work of art.
          </p>
        </div>
      </section>

      {/* Grid — no filter, just beautiful images */}
      <section className="pb-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-blush/10 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-8 sm:pt-12">
          <PortfolioGrid />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-brand-espresso relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-brand-blush/20 rounded-full blur-[150px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-cocoa/30 rounded-full blur-[80px] z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">See a look you love?</h2>
          <p className="text-brand-nude/70 font-sans font-medium text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Screenshot your favourite style and share it in your booking inquiry so we can recreate or personalise it for you.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-3 sm:mt-4 px-8 sm:px-10 py-4 sm:py-5 bg-linear-to-r from-brand-blush to-brand-cocoa text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all shadow-lg"
          >
            Book Your Look ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
