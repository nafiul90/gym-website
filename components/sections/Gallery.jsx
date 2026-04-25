"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", duration: 0.4 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeft({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close"
        >
          <XIcon className="size-5" />
        </button>

        {/* Prev */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
          className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${IMAGE_URL}/${item.image}`}
            alt={item.caption || "gallery image"}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          {item.caption && (
            <p className="text-sm text-white/70 text-center">{item.caption}</p>
          )}
          <p className="text-xs text-white/30">{index + 1} / {items.length}</p>
        </motion.div>

        {/* Next */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

const PAGE_SIZE = 6;

export default function Gallery({ galleryData, galleryItems = [] }) {
  const { title, subtitle, visible } = galleryData ?? {};
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const sorted = [...galleryItems].sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0));
  const shown = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i > 0 ? i - 1 : sorted.length - 1)), [sorted.length]);
  const goNext = useCallback(() => setLightboxIndex((i) => (i < sorted.length - 1 ? i + 1 : 0)), [sorted.length]);

  if (!sorted.length && !title && !subtitle) return null;

  const [first, ...rest] = (title ?? "").split(" ");

  return (
    <section
      id="gallery"
      aria-label="gallery section"
      className="bg-primary-dark-900 scroll-mt-20"
    >
      <div className="container py-14 sm:py-[68px] lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-8 sm:space-y-12 lg:space-y-16"
        >
          {/* Header */}
          {(title || subtitle) && (
            <motion.div variants={headerVariants} className="space-y-3 text-center">
              {title && (
                <h2 className="font-teko text-4xl 2xs:text-5xl sm:text-6xl lg:text-7xl text-primary-bright-100 leading-none">
                  <span>{first} </span>
                  {rest.length > 0 && <span className="text-red-600">{rest.join(" ")}</span>}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm sm:text-base text-primary-bright-100/60 leading-relaxed max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}

          {/* Grid */}
          {shown.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {shown.map((item, i) => (
                <motion.button
                  key={item._id ?? i}
                  variants={itemVariants}
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-primary-dark-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label={item.caption || `gallery image ${i + 1}`}
                >
                  <Image
                    src={`${IMAGE_URL}/${item.image}`}
                    alt={item.caption || `gallery image ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 50vw"
                    quality={80}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-dark-900/0 group-hover:bg-primary-dark-900/30 transition-colors duration-300" />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-white text-center line-clamp-2">{item.caption}</p>
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Load More */}
          {hasMore && (
            <motion.div variants={headerVariants} className="flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-8 py-3 rounded-full border border-primary-dark-700 text-sm text-primary-bright-100 hover:bg-primary-dark-700 transition-colors duration-300"
              >
                Load More
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={sorted}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}
