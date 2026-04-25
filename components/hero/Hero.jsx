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

function RightArrow({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

export default function Hero({ data }) {
    const { banners = [], ctaText, ctaLink } = data ?? {};

    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const handlePaginationClick = (index) => {
        swiperRef.current?.swiper?.slideToLoop(index);
    };

    if (!banners.length) return null;

    return (
        <motion.section
            aria-label="hero section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-dvh relative overflow-hidden bg-primary-dark-900"
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
                    const { image, caption, title, description, ctaText: bannerCta, ctaLink: bannerCtaLink } = banner;
                    const finalCtaText = bannerCta || ctaText || "Join Now";
                    const finalCtaLink = bannerCtaLink || ctaLink || "/#packages";

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

                            {/* Content */}
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

                {/* Custom pagination */}
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
