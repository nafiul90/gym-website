"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Animation ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } },
};

const priceRowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const priceRowItemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.35 } },
};

// ─── RightArrow ───────────────────────────────────────────────────────────────

function RightArrow({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Check icon ───────────────────────────────────────────────────────────────

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────

function PricingCard({ item, ctaText, ctaLink }) {
  const { image, title, subTitle, extraInfo, priceDuration = [], benefits = [] } = item;

  return (
    <div className="h-full relative overflow-hidden rounded-[1.25rem] border border-primary-dark-700 bg-gradient-to-b from-primary-dark-700/40 to-primary-dark-900 flex flex-col items-center">
      {/* cover image — only rendered when an image is set */}
      {image && (
        <div className="relative h-48 w-full flex-none">
          <Image
            src={`${IMAGE_URL}/${image}`}
            alt={title ?? "pricing"}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 576px) 50vw, 100vw"
            quality={90}
            className="object-cover object-bottom rounded-t-[1.25rem]"
          />
          <div className="absolute inset-0 rounded-t-[1.25rem] bg-gradient-to-b from-transparent to-primary-dark-900/70" />
        </div>
      )}

      {/* body */}
      <div className="flex-1 w-full p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-between gap-5 lg:gap-6">
        <div className="w-full flex flex-col items-center gap-4 lg:gap-5">
          {/* title + subtitle */}
          <div className="flex flex-col items-center gap-1 md:gap-2">
            {title && (
              <h3 className="text-center font-teko text-3xl lg:text-4xl text-primary-bright-100 leading-tight">
                {title}
              </h3>
            )}
            {subTitle && (
              <p className="text-xs md:text-sm text-center text-primary-bright-100/60 leading-relaxed">
                {subTitle}
              </p>
            )}
          </div>

          {/* divider */}
          <div className="w-full h-px bg-primary-dark-700" />

          {/* price duration rows */}
          {priceDuration.length > 0 && (
            <motion.ul
              role="list"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={priceRowVariants}
              className="w-full flex flex-col gap-3"
            >
              {[...priceDuration]
                .sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0))
                .map((point, i) => (
                  <motion.li
                    key={i}
                    variants={priceRowItemVariants}
                    className="flex justify-between items-baseline gap-3 text-sm lg:text-base text-primary-bright-200"
                  >
                    <span className="block">{point.duration}</span>
                    <span className="block font-semibold text-primary-bright-100 text-base lg:text-lg whitespace-nowrap">
                      {point.price}
                    </span>
                  </motion.li>
                ))}
            </motion.ul>
          )}

          {/* extra info */}
          {extraInfo && (
            <p className="text-xs md:text-sm text-center text-primary-bright-100/60 leading-relaxed">
              {extraInfo}
            </p>
          )}

          {/* benefits */}
          {benefits.length > 0 && (
            <>
              <div className="w-full h-px bg-primary-dark-700" />
              <motion.ul
                role="list"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={priceRowVariants}
                className="w-full max-h-56 overflow-y-auto flex flex-col gap-2 text-xs md:text-sm text-primary-bright-200"
              >
                {benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    variants={priceRowItemVariants}
                    className="flex items-start gap-2.5"
                  >
                    <CheckIcon className="mt-0.5 flex-none size-3.5 text-red-500" />
                    <span className="block">{b.title}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </div>

        {/* CTA button */}
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-1.5 capitalize text-sm sm:text-base px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 hover:border-transparent transition-colors duration-300 active:scale-[0.97]"
        >
          {ctaText}
          <RightArrow className="size-4 sm:size-5" />
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Pricing({ pricingData, pricingItems = [] }) {
  const { caption, title, ctaText = "Join Now", ctaLink = "/#contact" } = pricingData ?? {};

  if (!caption && !title && !pricingItems.length) return null;

  const [first, ...rest] = (title ?? "").split(" ");
  const sorted = [...pricingItems].sort((a, b) => (a.serial ?? 0) - (b.serial ?? 0));

  return (
    <section
      id="pricing"
      aria-label="pricing section"
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

          {/* cards */}
          {sorted.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {sorted.map((item, i) => (
                <motion.div key={item._id ?? i} variants={itemVariants}>
                  <PricingCard item={item} ctaText={ctaText} ctaLink={ctaLink} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
