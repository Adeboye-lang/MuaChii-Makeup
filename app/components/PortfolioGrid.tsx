"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
  alt: string;
}

export default function PortfolioGrid() {
  const [portfolioItems, setPortfolioItems] = useState<GalleryItem[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-espresso/60">Loading gallery...</p>
        </div>
      ) : portfolioItems.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-brand-espresso/60">No gallery items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl shadow-lg border-2 border-white cursor-pointer"
              style={{ aspectRatio: i % 3 === 1 ? "3/4" : "4/5" }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 transition-all duration-500 ${hovered === item.id ? "bg-linear-to-t from-brand-espresso/60 via-brand-cocoa/20 to-transparent" : "bg-linear-to-t from-brand-espresso/20 via-transparent to-transparent"}`}></div>
              {/* Label */}
              <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${hovered === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="bg-white/90 backdrop-blur-sm text-brand-cocoa text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
