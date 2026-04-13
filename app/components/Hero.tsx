"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-brand-champagne via-white to-brand-nude/30">
      {/* Ambient Glows */}
      <div className="absolute top-20 right-10 w-125 h-125 bg-brand-blush/25 rounded-full blur-[120px] z-0 animate-pulse"></div>
      <div className="absolute bottom-10 left-0 w-100 h-100 bg-brand-cocoa/15 rounded-full blur-[100px] z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand-nude/20 rounded-full blur-[150px] z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center z-10 w-full pt-24 sm:pt-32 pb-16 sm:pb-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col space-y-8 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center lg:justify-start"
          >
            <span className="inline-flex items-center gap-2 bg-brand-blush/10 border border-brand-blush/30 text-brand-cocoa text-xs font-bold uppercase tracking-[0.25em] px-5 py-2.5 rounded-full">
              ✨ Luxury Makeup Artistry
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-brand-espresso leading-[1.05]">
              Feel Gorgeous,
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[1.05]">
              Look{" "}
              <span className="relative inline-block">
                <span className="text-brand-cocoa">Flawless</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 Q100 2 198 8" stroke="#FF42A1" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
            </h1>
          </div>

          {/* Body Text */}
          <p className="text-brand-espresso/70 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-sans font-medium">
            Premium makeup artistry crafted for women who deserve to feel radiant, confident, and breathtakingly beautiful — every single time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/booking"
              className="px-8 py-4 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-sm font-extrabold uppercase tracking-widest rounded-full hover:shadow-2xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all shadow-lg shadow-brand-cocoa/30 w-full sm:w-auto text-center"
            >
              Book Your Glam ✨
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-white/70 backdrop-blur-sm border-2 border-brand-nude text-brand-espresso text-sm font-bold uppercase tracking-widest rounded-full hover:border-brand-blush hover:bg-brand-nude/30 transition-all w-full sm:w-auto text-center"
            >
              See My Work
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Decorative rings */}
          <div className="absolute w-97.5 h-97.5 md:w-125 md:h-125 rounded-full border-2 border-brand-blush/20 z-0 animate-spin" style={{ animationDuration: "20s" }}></div>
          <div className="absolute w-85 h-85 md:w-112.5 md:h-112.5 rounded-full border border-brand-nude/40 z-0"></div>

          {/* Image container */}
          <div className="relative w-75 h-95 md:w-100 md:h-125 rounded-t-full rounded-b-[4rem] overflow-hidden shadow-2xl shadow-brand-blush/30 border-4 border-white z-10">
            <img
              src="/Client2.jpg"
              alt="Luxury feminine makeup artistry"
              className="w-full h-full object-cover"
            />
            {/* Pink overlay tint */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-cocoa/20 via-transparent to-brand-blush/10"></div>
          </div>


        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-brand-espresso/40">Scroll</p>
        <div className="w-px h-12 bg-linear-to-b from-brand-blush to-transparent"></div>
      </motion.div>
    </section>
  );
}
