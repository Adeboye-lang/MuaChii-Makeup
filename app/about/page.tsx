import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "About | MuaChii",
  description: "Meet the luxury makeup artist behind MuaChii — based in Abuja, Nigeria.",
};

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-champagne">

      {/* Hero Header */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/30 z-0"></div>
        <div className="absolute top-20 right-0 w-125 h-125 bg-brand-blush/20 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-cocoa/10 rounded-full blur-[80px] z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-125">
            {/* Text */}
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full border border-brand-blush/30">
                <Sparkles size={12} /> Meet The Artist
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-espresso leading-tight">
                Beauty with<br/>
                <span className="text-brand-cocoa">Intention</span>
              </h1>
              <p className="text-brand-espresso/70 font-sans font-medium text-lg leading-relaxed max-w-lg">
                I believe makeup should never mask who you are. It should elevate your natural beauty, inspire deep confidence, and create a moment you remember forever.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-brand-blush/30 hover:-translate-y-0.5 transition-all shadow-md group">
                Work With Me
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-linear-to-br from-brand-blush/30 to-brand-cocoa/10 rounded-[3rem] translate-x-5 translate-y-5 z-0 max-w-112.5 mx-auto lg:mx-0 lg:ml-auto h-full"></div>
              <div className="relative w-full max-w-105 aspect-3/4 rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-blush/25 z-10 border-4 border-white">
                <img
                  src="/Artist.jpg"
                  alt="Makeup Artist Portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-espresso/30 to-transparent"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-nude/40 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-4xl">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="inline-block text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em]">My Journey</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-espresso">
                <span className="text-7xl text-brand-blush/30 font-serif leading-none float-left mr-3 mt-1">M</span>
                y passion for beauty began as a young girl fascinated by the transformative power of makeup.
              </h2>
            </div>
            <div className="space-y-6 text-brand-espresso/70 font-sans font-medium leading-relaxed text-lg">
              <p>
                My approach is rooted in precision skin prep, advanced color theory, and a genuine understanding of what works on every skin tone. I specialize in creating makeup that looks flawless in person and absolutely stunning on camera — balancing artistry with technical excellence.
              </p>
              <p>
                I believe in enhancing your natural beauty, not hiding it. Every look is custom-tailored to complement your unique features, skin tone, and the occasion. Whether it's bridal, editorial, or everyday glamour, my focus is delivering a result that feels effortless, radiant, and authentically you.
              </p>
              <p>
                My goal is simple: you leave feeling confident, beautiful, and like the best version of yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-28 bg-brand-espresso relative overflow-hidden">
        <div className="absolute top-0 left-0 w-125 h-125 bg-brand-cocoa/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-brand-blush/20 rounded-full blur-2xl z-0"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center space-y-8">
          <QuoteIcon className="mx-auto text-brand-blush w-16 h-16 mb-4 opacity-60" />
          <blockquote className="text-3xl md:text-5xl font-serif text-white italic font-light leading-relaxed">
            "Beauty with intention means recognizing the elegance that already exists within you — and giving it permission to shine."
          </blockquote>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-16 bg-brand-blush/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-blush"></div>
            <div className="h-px w-16 bg-brand-blush/40"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-brand-champagne text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-brand-blush/10 rounded-full blur-2xl z-0"></div>
        <div className="container mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-espresso">Ready to work together?</h2>
          <p className="text-brand-espresso/60 font-sans font-medium text-lg max-w-lg mx-auto leading-relaxed">
            Let's create a look that makes you feel as beautiful on the outside as you are on the inside.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link href="/services" className="px-10 py-5 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-brand-blush/30 hover:-translate-y-1 transition-all shadow-lg">
              Explore Services ✨
            </Link>
            <Link href="/contact" className="px-10 py-5 bg-white border-2 border-brand-nude text-brand-espresso text-sm font-extrabold uppercase tracking-widest rounded-full hover:border-brand-blush hover:bg-brand-nude/20 transition-all shadow-sm">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
