"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Check } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  delay?: number;
}

export default function ServiceCard({ title, description, duration, price, features, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white border-2 border-white p-8 flex flex-col space-y-6 rounded-4xl hover:shadow-[0_20px_60px_rgb(255,66,161,0.18)] hover:-translate-y-2 transition-all duration-400 relative overflow-hidden"
    >
      {/* Pink corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-brand-blush/20 via-brand-nude/10 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-150 z-0"></div>

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-2xl font-serif text-brand-espresso">{title}</h3>
        <p className="text-brand-espresso/60 font-sans font-medium text-sm leading-relaxed">{description}</p>
      </div>

      {/* Price + Duration */}
      <div className="relative z-10 flex items-center justify-between py-5 border-y border-brand-nude/40">
        <div className="flex items-center gap-2 text-brand-espresso/60 text-sm font-bold">
          <Clock size={15} className="text-brand-blush" />
          <span>{duration}</span>
        </div>
        <div className="text-2xl font-serif text-brand-cocoa font-bold">{price}</div>
      </div>

      {/* Features */}
      <ul className="relative z-10 space-y-3 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-brand-espresso/70 font-sans font-medium">
            <div className="w-5 h-5 rounded-full bg-brand-blush/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={11} className="text-brand-cocoa" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative z-10 pt-2">
        <Link
          href="/contact"
          className="block w-full text-center py-3 sm:py-4 bg-brand-nude/30 text-brand-espresso font-extrabold text-xs tracking-widest uppercase rounded-full hover:bg-gradient-to-r hover:from-brand-cocoa hover:to-brand-blush hover:text-white transition-all duration-300 shadow-sm"
        >
          Book This Service
        </Link>
      </div>
    </motion.div>
  );
}
