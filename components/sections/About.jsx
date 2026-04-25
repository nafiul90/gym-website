"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Animation ────────────────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const statsContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "tween", ease: "easeOut", duration: 0.4 } },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ stat }) {
  const { title, description } = stat;

  return (
    <div className="relative p-2 2xs:p-3 md:p-4 border-2 border-[#333] rounded-full bg-gradient-to-b from-primary-dark-700 to-primary-dark-900">
      <div className="p-2 2xs:p-3 md:p-4 border-2 border-[#333] rounded-full bg-gradient-to-b from-primary-dark-700 to-primary-dark-900">
        <div className="size-20 sm:size-24 md:size-20 lg:size-28 flex items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className="block font-teko font-bold text-primary-bright-100 text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl text-center leading-none">
              {description}
            </span>
            <span className="block text-primary-bright-100 text-xs xs:text-sm sm:text-base md:text-sm lg:text-base text-center">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About({ aboutData }) {
  const { caption, title, description, image, stats = [] } = aboutData ?? {};

  if (!caption && !title && !image) return null;

  return (
    <motion.section
      id="about"
      aria-label="about section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="bg-primary-dark-900 scroll-mt-20"
    >
      <div className="relative overflow-hidden">
        {/* background image */}
        {image && (
          <Image
            src={`${IMAGE_URL}/${image}`}
            alt="about section background"
            quality={100}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-primary-dark-900/60" />

        <div className="container py-14 sm:py-[68px] lg:py-20 relative">
          <div className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
            {/* text block */}
            <div className="space-y-4 text-center">
              {caption && (
                <p className="uppercase tracking-[0.4em] text-base 2xs:text-lg sm:text-xl lg:text-2xl font-teko text-primary-bright-100">
                  {caption}
                </p>
              )}
              {title && (
                <h2 className="font-teko text-4xl 2xs:text-5xl sm:text-6xl lg:text-7xl text-primary-bright-100 leading-none">
                  {title}
                </h2>
              )}
              {description && (
                <p className="max-w-[800px] mx-auto text-sm sm:text-base md:text-lg text-primary-bright-100/70 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* stats */}
            {stats.length > 0 && (
              <motion.div
                variants={statsContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
              >
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={statItemVariants}>
                    <StatCard stat={stat} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
