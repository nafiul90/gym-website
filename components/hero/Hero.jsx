"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Social media list (vertical, left side) ─────────────────────────────────

const SOCIAL_ICONS = {
  facebook: "/logos-icons/facebook-icon.png",
  instagram: "/logos-icons/instagram-icon.png",
  youtube: "/logos-icons/youtube-icon.png",
  whatsapp: "/logos-icons/whatsapp-icon.png",
  x: "/logos-icons/x-icon.png",
  linkedin: "/logos-icons/linkedin-icon.png",
};

function SocialNavList({ socialMedia }) {
  const active = (socialMedia ?? []).filter((s) => s.link);
  if (!active.length) return null;

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
      }}
      className="flex flex-col gap-4"
    >
      {active.map((item, i) => {
        const icon = SOCIAL_ICONS[item.type];
        if (!icon) return null;
        return (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: {
                opacity: 1,
                x: 0,
                transition: { type: "tween", ease: "easeOut", duration: 0.3 },
              },
            }}
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.type} link`}
              className="block"
            >
              <div className="relative overflow-hidden md:size-4 lg:size-5">
                <Image
                  src={icon}
                  alt={`${item.type} logo`}
                  fill
                  sizes="20px"
                  quality={100}
                  className="object-contain invert"
                />
              </div>
            </a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

// ─── App download badges ──────────────────────────────────────────────────────

function DownloadAppList({ androidUrl, iosUrl }) {
  if (!androidUrl && !iosUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="space-y-2"
    >
      <p className="text-xs text-primary-bright-100/70 whitespace-pre-line leading-tight">
        {"Bring our app\nto your fingertips"}
      </p>
      <div className="flex flex-col gap-2">
        {androidUrl && (
          <a
            href={androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-7 lg:h-8 aspect-[3.38/1] relative"
          >
            <Image
              src="/logos-icons/get-it-on-google-play-badge.png"
              alt="Get it on Google Play"
              fill
              sizes="100px"
              quality={100}
              className="object-contain"
            />
          </a>
        )}
        {iosUrl && (
          <a
            href={iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-7 lg:h-8 aspect-[3/1] relative"
          >
            <Image
              src="/logos-icons/download-on-the-app-store-badge.svg"
              alt="Download on the App Store"
              fill
              sizes="100px"
              quality={100}
              className="object-contain"
            />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({ heroData, gymData, socialMedia }) {
  const { banners = [] } = heroData ?? {};
  const androidUrl = gymData?.androidUrl ?? "";
  const iosUrl = gymData?.iosUrl ?? "";

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handlePaginationClick = (index) => {
    swiperRef.current?.swiper?.slideToLoop(index);
  };

  if (!banners.length) return null;

  const hasSocial = (socialMedia ?? []).some((s) => s.link);
  const hasApps = androidUrl || iosUrl;

  return (
    <motion.section
      aria-label="hero section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      // navbar is fixed (80px) — hero fills remaining viewport
      className="h-[calc(100dvh)] relative overflow-hidden bg-primary-dark-900"
    >
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        speed={1000}
        effect="fade"
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        grabCursor={true}
        keyboard={{ enabled: true }}
        navigation={{ enabled: true, hideOnClick: true }}
        modules={[Autoplay, EffectFade, Navigation, Keyboard]}
        className="relative h-full"
      >
        {banners.map((banner, index) => {
          const {
            image,
            caption,
            title,
            description,
            ctaText: bannerCta,
            ctaLink: bannerCtaLink,
          } = banner;
          const finalCtaText = bannerCta || "Join Now";
          const finalCtaLink = bannerCtaLink || "/#packages";

          return (
            <SwiperSlide
              key={index}
              className="relative h-full cursor-grab active:cursor-grabbing"
            >
              {/* Background image */}
              {image && (
                <Image
                  src={`${IMAGE_URL}/${image}`}
                  alt={title || "hero banner"}
                  quality={100}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-primary-dark-900/60" />

              {/* Centre content */}
              <div className="relative h-full flex justify-center items-center">
                <div className="container space-y-4 text-center">
                  {caption && (
                    <p className="uppercase tracking-[0.4em] text-xl 2xs:text-2xl sm:text-3xl lg:text-4xl font-teko text-primary-bright-100">
                      {caption}
                    </p>
                  )}

                  {title && (
                    <h1 className="font-teko text-5xl 2xs:text-6xl sm:text-7xl lg:text-8xl text-primary-bright-100 leading-none">
                      {title}
                    </h1>
                  )}

                  {description && (
                    <p className="max-w-[800px] mx-auto text-primary-bright-100/70 text-sm 2xs:text-base md:text-lg">
                      {description}
                    </p>
                  )}

                  <div className="flex justify-center pt-2">
                    <Link
                      href={finalCtaLink}
                      className="inline-flex items-center gap-1.5 capitalize text-xs sm:text-sm lg:text-base px-6 py-3 xs:px-7 xs:py-3.5 rounded-full bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 hover:border-transparent transition-colors duration-300 active:scale-[0.97]"
                    >
                      {finalCtaText}
                      <RightArrow className="size-4 sm:size-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Social media + app downloads — bottom-left on desktop */}
        {(hasSocial || hasApps) && (
          <div className="hidden md:block absolute z-10 md:bottom-10 md:left-10 lg:bottom-14 lg:left-14">
            <div className="flex items-end gap-4">
              {hasSocial && (
                <nav aria-label="social media links">
                  <SocialNavList socialMedia={socialMedia} />
                </nav>
              )}
              {hasApps && (
                <DownloadAppList androidUrl={androidUrl} iosUrl={iosUrl} />
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="absolute z-10 left-1/2 bottom-6 -translate-x-1/2 flex custom-pagination">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`pagination-bullet ${index === activeIndex ? "active" : ""}`}
              onClick={() => handlePaginationClick(index)}
            />
          ))}
        </div>
      </Swiper>
    </motion.section>
  );
}
