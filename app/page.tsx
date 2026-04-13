import Hero from "./components/Hero";
import ServiceCard from "./components/ServiceCard";
import PortfolioGrid from "./components/PortfolioGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices } from "./utils/data";

export default async function Home() {
  const servicesData = await getServices();

  // Map services data to component props (first 2 featured)
  const featuredServices = servicesData.services.slice(0, 2).map((service: { name: string; description: string; duration: string; price?: number; features: string[] }) => ({
    title: service.name,
    description: service.description,
    duration: service.duration,
    price: `₦${service.price?.toLocaleString() || 'Custom'}`,
    features: service.features,
  }));



  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <Hero />

      {/* Featured Services */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-brand-blush/10 rounded-full blur-[100px] -translate-y-1/2 z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-block bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-brand-blush/30">
              ✨ Signature Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-espresso mt-3 sm:mt-4">Featured Offerings</h2>
            <p className="text-brand-espresso/60 font-sans max-w-lg mx-auto font-medium">
              Expertly curated services for the woman who deserves nothing but the absolute best.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="h-px w-12 bg-brand-nude"></div>
              <div className="w-2 h-2 rounded-full bg-brand-blush"></div>
              <div className="h-px w-12 bg-brand-nude"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {featuredServices.map((service: { title: string; description: string; duration: string; price: string; features: string[] }, index: number) => (
              <ServiceCard key={index} {...service} delay={index * 0.15} />
            ))}
          </div>
          
            <div className="mt-12 sm:mt-14 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand-cocoa hover:text-brand-blush transition-colors group">
              View All Services
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-28 bg-brand-champagne relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-100 h-100 bg-brand-blush/15 rounded-full blur-[120px] z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-linear-to-br from-brand-blush/30 to-brand-cocoa/20 rounded-[3rem] translate-x-4 translate-y-4 z-0"></div>
              <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-4/5 shadow-2xl shadow-brand-blush/20">
                <img
                  src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
                  alt="Artist at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-espresso/30 to-transparent"></div>
              </div>
              {/* Floating card */}
  
            </div>

            {/* Text Side */}
            <div className="order-1 lg:order-2 space-y-7">
              <span className="inline-block bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-brand-blush/30">
                The Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-espresso leading-tight">
                More than makeup.<br/>
                <span className="text-brand-cocoa">It's a feeling.</span>
              </h2>
              <p className="text-brand-espresso/70 font-sans font-medium leading-relaxed text-lg">
                Every face is a unique canvas deserving of an editorial, hyper-personalized approach. My philosophy centers on luxurious skin preparation, enhancing your natural bone structure, and creating a soft, radiant glow that looks breathtaking both in person and on camera.
              </p>
              <p className="text-brand-espresso/60 font-sans font-medium leading-relaxed">
                Based in Abuja, I bring warmth, expertise, and a passion for beauty to every session — leaving you feeling like the most elevated version of yourself.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand-cocoa hover:text-brand-blush transition-colors group">
                Meet The Artist
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview (no filter) */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-nude/50 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-block bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-brand-blush/30">
              Our Craft 🎨
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-espresso mt-4">The Portfolio</h2>
            <p className="text-brand-espresso/60 font-sans max-w-lg mx-auto font-medium">
              A glimpse into the art. Every face tells a story of elegance, confidence, and transformation.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="h-px w-12 bg-brand-nude"></div>
              <div className="w-2 h-2 rounded-full bg-brand-blush"></div>
              <div className="h-px w-12 bg-brand-nude"></div>
            </div>
          </div>

          <PortfolioGrid />

          <div className="mt-16 text-center">
            <Link
              href="/portfolio"
              className="inline-block px-10 py-5 bg-linear-to-r from-brand-espresso to-brand-cocoa text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all shadow-lg"
            >
              Explore Full Gallery ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose MuaChii */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF0F8 0%, white 50%, #FFE6F6 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-brand-blush/10 via-transparent to-brand-nude/20 z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-block bg-brand-blush/10 text-brand-cocoa text-xs font-extrabold uppercase tracking-[0.25em] px-5 py-2 rounded-full border border-brand-blush/30">
              ✨ Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-espresso mt-4">The MuaChii Difference</h2>
            <p className="text-brand-espresso/60 font-sans max-w-lg mx-auto font-medium mt-4">
              Luxury expertise meets personalized artistry in every single appointment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-brand-blush to-brand-cocoa rounded-full flex items-center justify-center text-white text-2xl mb-6">
                💎
              </div>
              <h3 className="text-2xl font-serif text-brand-espresso mb-4">Luxury Skin Prep</h3>
              <p className="text-brand-espresso/70 font-sans font-medium leading-relaxed">
                Every look begins with flawless skin. I prioritize premium products and meticulous prep for a breathable, radiant finish that lasts all day.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-brand-blush to-brand-cocoa rounded-full flex items-center justify-center text-white text-2xl mb-6">
                📸
              </div>
              <h3 className="text-2xl font-serif text-brand-espresso mb-4">Camera-Ready Finishing</h3>
              <p className="text-brand-espresso/70 font-sans font-medium leading-relaxed">
                Whether it's your big day or a photoshoot, every look is designed to photograph flawlessly. Tested, trusted, and absolutely stunning under any lighting.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-4xl border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-linear-to-br from-brand-blush to-brand-cocoa rounded-full flex items-center justify-center text-white text-2xl mb-6">
                ✨
              </div>
              <h3 className="text-2xl font-serif text-brand-espresso mb-4">Your Experience Matters</h3>
              <p className="text-brand-espresso/70 font-sans font-medium leading-relaxed">
                Every client is unique. I personalize every appointment to enhance your natural beauty and leave you feeling deeply empowered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-brand-espresso">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1512413914580-ef8091ab7284?auto=format&fit=crop&q=80&w=1500')] bg-cover bg-center"></div>
        <div className="absolute top-0 right-0 w-150 h-150 bg-brand-blush/20 rounded-full blur-[150px] z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cocoa/30 rounded-full blur-[100px] z-0"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center space-y-8 max-w-3xl">
          <span className="inline-block text-brand-nude/60 text-xs font-extrabold uppercase tracking-[0.3em] text-center">
            — Let's Create Magic —
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight text-center">
            Ready for<br/>
            <span className="text-brand-nude">your moment?</span>
          </h2>
          <p className="text-brand-nude/70 font-sans font-medium text-lg max-w-xl mx-auto leading-relaxed">
            Secure your date and let me craft a look you will remember forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link
              href="/booking"
              className="px-8 py-4 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-2xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all shadow-lg w-full sm:w-auto text-center"
            >
              Book Your Glam ✨
            </Link>
            <Link
              href="/policies"
              className="px-8 py-5 bg-white/10 border border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all"
            >
              View Policies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
