"use client";

import { IMAGE_URL } from "@/lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Social icon map ──────────────────────────────────────────────────────────

const SOCIAL_ICONS = {
  facebook: "/logos-icons/facebook-icon.png",
  instagram: "/logos-icons/instagram-icon.png",
  youtube: "/logos-icons/youtube-icon.png",
  whatsapp: "/logos-icons/whatsapp-icon.png",
  x: "/logos-icons/x-icon.png",
  linkedin: "/logos-icons/linkedin-icon.png",
};

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

function InstructorCard({ item }) {
  const { image, name, designation, facebookLink, instagramLink, youtubeLink, whatsappLink, xLink, linkedinLink } = item;

  const socialLinks = [
    { type: "facebook", link: facebookLink },
    { type: "whatsapp", link: whatsappLink },
    { type: "instagram", link: instagramLink },
    { type: "x", link: xLink },
    { type: "linkedin", link: linkedinLink },
    { type: "youtube", link: youtubeLink },
  ].filter((s) => s.link);

  return (
    <div className="h-full relative overflow-hidden rounded-[20px] border border-primary-dark-700">
      {/* vector bg */}
      <Image
        src="/vector-medium.png"
        alt=""
        fill
        sizes="400px"
        quality={100}
        className="object-cover object-[center_35%]"
      />

      {/* content */}
      <div className="relative h-full px-4 py-8 sm:px-4 sm:py-8 md:px-5 md:py-10 lg:px-6 lg:py-12 flex flex-col items-center gap-6 lg:gap-8">
        {/* photo */}
        <div className="relative p-2 sm:p-3 lg:p-4 border-2 border-[#333] rounded-full bg-gradient-to-b from-primary-dark-700 to-primary-dark-900">
          <div className="p-2 sm:p-3 lg:p-4 border-2 border-[#333] rounded-full bg-gradient-to-b from-primary-dark-700 to-primary-dark-900">
            <div className="relative overflow-hidden border-2 border-[#333] rounded-full h-28 sm:h-32 md:h-36 lg:h-40 aspect-square">
              {image ? (
                <Image
                  src={`${IMAGE_URL}/${image}`}
                  alt={name ?? "instructor"}
                  fill
                  sizes="160px"
                  quality={100}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-dark-700 flex items-center justify-center">
                  <span className="text-primary-bright-100/30 text-4xl font-teko">
                    {name?.[0] ?? "?"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* info */}
        <div className="flex flex-col items-center gap-3">
          {name && (
            <h3 className="text-center font-teko text-2xl sm:text-3xl lg:text-4xl text-primary-bright-100 leading-tight">
              {name}
            </h3>
          )}
          {designation && (
            <p className="text-center text-sm sm:text-base text-primary-bright-200/80">
              {designation}
            </p>
          )}

          {/* social links */}
          {socialLinks.length > 0 && (
            <ul className="flex gap-3 mt-1">
              {socialLinks.map((s) => (
                <li key={s.type}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.type} profile`}
                    className="block"
                  >
                    <div className="relative overflow-hidden size-4 lg:size-5">
                      <Image
                        src={SOCIAL_ICONS[s.type]}
                        alt={s.type}
                        fill
                        sizes="20px"
                        quality={100}
                        className="object-contain invert opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Instructors({ instructorsData }) {
  const { caption, title, items = [] } = instructorsData ?? {};

  if (!caption && !title && !items.length) return null;

  const [first, ...rest] = (title ?? "").split(" ");

  return (
    <section
      id="instructors"
      aria-label="instructors section"
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
              className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8"
            >
              {items.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <InstructorCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
