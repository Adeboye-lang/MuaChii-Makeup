"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={`${
          scrolled
            ? "bg-white/80 shadow-[0_20px_60px_rgb(255,20,147,0.25)]"
            : "bg-white/60 shadow-[0_10px_40px_rgb(255,66,161,0.15)]"
        } backdrop-blur-2xl rounded-full px-5 md:px-8 py-3 w-full max-w-5xl flex items-center justify-between border border-white/70 transition-all duration-500`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-3xl font-serif text-brand-espresso tracking-wide z-50 font-bold hover:scale-105 transition-transform flex items-center gap-1"
        >
          Mua<span className="text-brand-blush">Chii</span>
          <Sparkles size={14} className="text-brand-gold mb-2" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-extrabold tracking-widest uppercase text-brand-espresso">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group transition duration-300 ${isActive ? "text-brand-cocoa" : "hover:text-brand-cocoa"}`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1.5 rounded-full bg-brand-blush transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}
          <Link
            href="/booking"
            className="ml-2 px-5 sm:px-7 py-2 sm:py-3 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-xs rounded-full hover:from-brand-blush hover:to-brand-gold hover:shadow-lg hover:shadow-brand-blush/40 hover:-translate-y-0.5 transition-all shadow-md font-extrabold tracking-widest uppercase"
          >
            Book Now ✨
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-brand-nude/50 text-brand-espresso z-50 hover:bg-brand-blush hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden"
          >
            {/* Blurred background */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-champagne via-white to-brand-nude/60 backdrop-blur-xl"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blush/30 rounded-full blur-[100px] z-0"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cocoa/20 rounded-full blur-[100px] z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-8">
              <div className="text-4xl font-serif text-brand-espresso font-bold mb-8">
                Mua<span className="text-brand-blush">Chii</span><span className="text-brand-gold text-xl">✨</span>
              </div>
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl font-serif transition-colors ${isActive ? "text-brand-cocoa" : "text-brand-espresso hover:text-brand-blush"}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 inline-block px-12 py-5 bg-linear-to-r from-brand-cocoa to-brand-blush text-white text-lg font-extrabold rounded-full shadow-2xl shadow-brand-blush/30 hover:shadow-3xl hover:shadow-brand-blush/40 hover:-translate-y-1 transition-all"
                >
                  Book Now ✨
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
