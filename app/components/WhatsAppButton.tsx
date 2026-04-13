"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "2349025567874"; // Nigerian format, no + or spaces
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! 👋 I'd love to book a makeup session with MuaChii. Could you help me with availability and pricing?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-3">
      {/* Tooltip / Prompt Card */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-3xl p-5 shadow-2xl shadow-green-500/15 border border-gray-100 max-w-65 relative"
          >
            {/* Close */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-cocoa to-brand-blush flex items-center justify-center text-white font-serif font-bold text-lg shrink-0">
                M
              </div>
              <div>
                <p className="font-extrabold text-sm text-gray-800">MuaChii</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                  <span className="text-xs text-green-600 font-semibold">Online now</span>
                </div>
              </div>
            </div>

            {/* Message bubble */}
            <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 font-medium leading-relaxed mb-4">
              👋 Hi gorgeous! Ready to get glam? Let's chat about your perfect look! ✨
            </div>

            {/* CTA */}
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white text-sm font-extrabold rounded-full hover:bg-[#1ebe57] transition-colors shadow-md"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.855L.057 23.776a.5.5 0 00.61.637l6.047-1.586A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.7 9.7 0 01-4.903-1.325l-.351-.208-3.644.955.972-3.547-.228-.363A9.716 9.716 0 012.25 12c0-5.376 4.374-9.75 9.75-9.75S21.75 6.624 21.75 12 17.376 21.75 12 21.75z"/>
              </svg>
              Chat on WhatsApp
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring", stiffness: 200 }}
      >
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl shadow-green-500/40 hover:bg-[#1ebe57] hover:scale-110 transition-all duration-300 group"
        >
          {/* Ping ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>

          {/* WhatsApp SVG Icon */}
          <svg viewBox="0 0 32 32" fill="white" className="w-8 h-8 relative z-10">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.131 6.743 3.047 9.373L1.051 31.2l6.02-1.928A15.924 15.924 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.325 22.604c-.387 1.092-1.924 2-3.154 2.264-.84.178-1.937.32-5.629-1.21-4.72-1.952-7.756-6.731-7.992-7.04-.228-.308-1.917-2.553-1.917-4.87 0-2.317 1.21-3.45 1.639-3.923.387-.43.845-.537 1.126-.537.281 0 .562.003.808.015.26.013.607-.099.95.724.354.848 1.204 2.935 1.31 3.149.107.214.178.463.035.749-.14.28-.21.455-.42.701-.209.246-.44.55-.629.738-.21.209-.428.435-.184.854.245.42 1.085 1.785 2.33 2.893 1.6 1.426 2.948 1.866 3.366 2.075.42.21.664.176.91-.106.246-.281 1.052-1.228 1.333-1.648.281-.42.561-.35.945-.21.385.14 2.45 1.155 2.87 1.366.42.21.7.315.805.49.104.175.104 1.012-.283 2.106z"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
