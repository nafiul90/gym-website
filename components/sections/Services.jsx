"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ item }) {
  const { icon, backgroundImage, title, description } = item;

  return (
    <div className="h-full relative overflow-hidden rounded-[20px] border border-primary-dark-700 min-h-[320px] sm:min-h-[360px] lg:min-h-[400px]">
      {/* background image */}
      {backgroundImage && (
        <Image
          src={`${IMAGE_URL}/${backgroundImage}`}
          alt={title ?? "service"}
          quality={100}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover rounded-[20px] object-top"
        />
      )}

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark-900" />

      {/* content */}
      <div className="relative h-full px-8 pb-8 pt-32 sm:px-8 sm:pb-8 sm:pt-32 md:px-10 md:pb-10 md:pt-40 lg:px-12 lg:pb-12 lg:pt-48 flex flex-col items-center justify-end gap-4 lg:gap-6">
        {icon && (
          <div className="relative overflow-hidden size-12 sm:size-14 md:size-16 lg:size-20">
            <Image
              src={`${IMAGE_URL}/${icon}`}
              alt={title ?? "icon"}
              fill
              sizes="80px"
              quality={100}
              className="object-contain"
            />
          </div>
        )}
        <div className="text-center space-y-3">
          {title && (
            <h3 className="font-teko text-2xl sm:text-3xl lg:text-4xl text-primary-bright-100 leading-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm sm:text-base text-primary-bright-200/80 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Services({ servicesData }) {
  const { caption, title, items = [] } = servicesData ?? {};

  if (!caption && !title && !items.length) return null;

  const [first, ...rest] = (title ?? "").split(" ");

  return (
    <section
      id="services"
      aria-label="services section"
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {items.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <ServiceCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
