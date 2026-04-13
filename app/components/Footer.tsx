import Link from "next/link";
import { Instagram, MapPin, Phone, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-espresso text-brand-champagne relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-blush/10 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cocoa/20 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center md:text-left mb-16">

          {/* Brand Section */}
          <div className="flex flex-col space-y-5 items-center md:items-start">
            <Link href="/" className="text-4xl font-serif tracking-wide text-brand-champagne hover:scale-105 transition-transform inline-block">
              Mua<span className="text-brand-blush">Chii</span><span className="text-brand-gold text-base align-super">✨</span>
            </Link>
            <p className="text-sm font-medium text-brand-nude/80 max-w-xs leading-relaxed">
              Feminine luxury makeup artistry for women who want to feel confident, radiant, and unforgettable.
            </p>
            <a
              href="https://www.instagram.com/mua.chii?igsh=MWQ3M2podGFiNmlscQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blush/20 text-brand-nude text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand-blush hover:text-white transition-all"
            >
              <Instagram size={15} /> @mua.chii
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4 items-center md:items-start">
            <h4 className="font-sans font-extrabold text-xs tracking-[0.25em] uppercase text-brand-blush mb-2">Explore</h4>
            <Link href="/about" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">Meet the Artist</Link>
            <Link href="/services" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">Services &amp; Pricing</Link>
            <Link href="/portfolio" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">Portfolio Gallery</Link>
            <Link href="/faq" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">FAQs</Link>
            <Link href="/policies" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">Booking Policies</Link>
            <Link href="/booking" className="text-sm text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">Book an Appointment</Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-5 items-center md:items-start">
            <h4 className="font-sans font-extrabold text-xs tracking-[0.25em] uppercase text-brand-blush mb-2">Get in Touch</h4>
            <div className="flex items-center gap-3 text-sm group">
              <div className="w-8 h-8 rounded-full bg-brand-blush/20 flex items-center justify-center group-hover:bg-brand-blush transition-colors">
                <Phone size={14} className="text-brand-nude group-hover:text-white transition-colors" />
              </div>
              <a href="tel:+2349025567874" className="text-brand-nude/80 hover:text-brand-blush transition-colors font-medium">+234 (0) 902 556 7874</a>
            </div>
            <div className="flex items-center gap-3 text-sm group">
              <div className="w-8 h-8 rounded-full bg-brand-blush/20 flex items-center justify-center group-hover:bg-brand-blush transition-colors">
                <MapPin size={14} className="text-brand-nude group-hover:text-white transition-colors" />
              </div>
              <span className="text-brand-nude/80 font-medium">Abuja, Nigeria</span>
            </div>

            <Link
              href="/booking"
              className="mt-4 w-full md:w-auto text-center px-8 py-4 bg-gradient-to-r from-brand-cocoa to-brand-blush text-white text-xs font-extrabold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-brand-blush/30 hover:-translate-y-0.5 transition-all shadow-md"
            >
              Book Now ✨
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-blush/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-nude/50 flex items-center gap-1">
            &copy; {year} MuaChii. Made with <Heart size={12} className="text-brand-blush fill-brand-blush" /> All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-brand-nude/50">
            <Link href="/policies" className="hover:text-brand-blush transition-colors">Booking Policies</Link>
            <Link href="/faq" className="hover:text-brand-blush transition-colors">FAQs</Link>
            <Link href="/booking" className="hover:text-brand-blush transition-colors">Book Now</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
