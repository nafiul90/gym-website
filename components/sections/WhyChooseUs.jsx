"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.45 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ReasonCard({ item }) {
  const { icon, title, description } = item;

  return (
    <div className="h-full flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
      {/* icon with vector bg */}
      <div className="relative overflow-hidden p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 border-[6px] xs:border-[7px] sm:border-8 md:border-[9px] lg:border-[10px] border-primary-bright-300 bg-primary-dark-800 shadow-[16px_12px_9px_2px_rgba(255,255,255,0.10)_inset] rounded-full">
        {/* decorative vector */}
        <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] aspect-[1.35/1]">
          <Image
            src="/vector-small.png"
            alt=""
            fill
            sizes="200px"
            quality={100}
            className="object-contain"
          />
        </div>
        {/* icon */}
        {icon && (
          <div className="relative overflow-hidden size-8 xs:size-9 sm:size-10 md:size-11 lg:size-12">
            <Image
              src={`${IMAGE_URL}/${icon}`}
              alt={title ?? "icon"}
              fill
              sizes="50px"
              quality={100}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* text */}
      <div className="text-center max-w-64 space-y-3">
        {title && (
          <h3 className="font-teko text-2xl sm:text-3xl lg:text-4xl text-primary-bright-100 leading-tight">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm sm:text-base text-primary-bright-100/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function WhyChooseUs({ whyChooseUsData }) {
  const { caption, title, items = [] } = whyChooseUsData ?? {};

  if (!caption && !title && !items.length) return null;

  const [first, ...rest] = (title ?? "").split(" ");

  return (
    <section
      id="why-choose-us"
      aria-label="why choose us section"
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
          {/* header */}
          <motion.div variants={headerVariants} className="space-y-4 text-center">
            {caption && (
              <p className="uppercase tracking-[0.4em] text-base 2xs:text-lg sm:text-xl lg:text-2xl font-teko text-red-600">
                {caption}
              </p>
            )}
            {title && (
              <h2 className="font-teko text-4xl 2xs:text-5xl sm:text-6xl lg:text-7xl text-primary-bright-100 leading-none">
                <span>{first} </span>
                {rest.length > 0 && (
                  <span className="text-red-600">{rest.join(" ")}</span>
                )}
              </h2>
            )}
          </motion.div>

          {/* cards grid */}
          {items.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {items.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <ReasonCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
