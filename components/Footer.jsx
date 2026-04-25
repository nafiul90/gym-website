import { IMAGE_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

// ─── Social icons (same map as Hero) ─────────────────────────────────────────

const SOCIAL_ICONS = {
  facebook: "/logos-icons/facebook-icon.png",
  instagram: "/logos-icons/instagram-icon.png",
  youtube: "/logos-icons/youtube-icon.png",
  whatsapp: "/logos-icons/whatsapp-icon.png",
  x: "/logos-icons/x-icon.png",
  linkedin: "/logos-icons/linkedin-icon.png",
};

// ─── App store badges ─────────────────────────────────────────────────────────

const APP_BADGES = {
  android: "/logos-icons/get-it-on-google-play-badge.png",
  ios: "/logos-icons/download-on-the-app-store-badge.svg",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FooterLogo({ logo, gymName }) {
  if (!logo && !gymName) return null;
  return (
    <Link href="/" className="flex items-center gap-3 flex-none">
      {logo && (
        <div className="relative h-10 w-10 flex-none overflow-hidden">
          <Image
            src={`${IMAGE_URL}/${logo}`}
            alt={gymName || "logo"}
            fill
            sizes="40px"
            quality={100}
            className="object-contain"
          />
        </div>
      )}
      {gymName && (
        <span className="font-teko text-xl text-primary-bright-100 leading-none">
          {gymName}
        </span>
      )}
    </Link>
  );
}

function SocialLinks({ socialMedia }) {
  const active = (socialMedia ?? []).filter((s) => s.link);
  if (!active.length) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {active.map((item, i) => {
        const icon = SOCIAL_ICONS[item.type];
        if (!icon) return null;
        return (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.type} link`}
            className="relative size-5 opacity-60 hover:opacity-100 transition-opacity duration-200"
          >
            <Image src={icon} alt={item.type} fill sizes="20px" className="object-contain invert" />
          </a>
        );
      })}
    </div>
  );
}

function AppLinks({ androidUrl, iosUrl }) {
  if (!androidUrl && !iosUrl) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {androidUrl && (
        <a href={androidUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on Google Play">
          <div className="relative h-8 w-24">
            <Image src={APP_BADGES.android} alt="Google Play" fill sizes="96px" className="object-contain object-left" />
          </div>
        </a>
      )}
      {iosUrl && (
        <a href={iosUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on App Store">
          <div className="relative h-8 w-24">
            <Image src={APP_BADGES.ios} alt="App Store" fill sizes="96px" className="object-contain object-left" />
          </div>
        </a>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer({ gymData, navbarData, socialMedia }) {
  const {
    gymName,
    logo,
    contactPhone,
    contactEmail,
    addressLine,
    androidUrl,
    iosUrl,
  } = gymData ?? {};

  const navLinks = navbarData?.links ?? [];
  const activeSocial = (socialMedia ?? []).filter((s) => s.link);
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="site footer"
      className="bg-primary-dark-900 border-t border-primary-dark-700"
    >
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <FooterLogo logo={logo} gymName={gymName} />
            <SocialLinks socialMedia={activeSocial} />
            <AppLinks androidUrl={androidUrl} iosUrl={iosUrl} />
          </div>

          {/* ── Quick links ── */}
          {navLinks.length > 0 && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-primary-bright-100/40 font-medium">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-bright-100/70 hover:text-primary-bright-100 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Contact ── */}
          {(contactPhone || contactEmail || addressLine) && (
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-primary-bright-100/40 font-medium">
                Contact
              </h4>
              <ul className="flex flex-col gap-3">
                {contactPhone && (
                  <li className="flex items-start gap-2.5">
                    <PhoneIcon className="size-4 flex-none mt-0.5 text-red-600" />
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-sm text-primary-bright-100/70 hover:text-primary-bright-100 transition-colors duration-200"
                    >
                      {contactPhone}
                    </a>
                  </li>
                )}
                {contactEmail && (
                  <li className="flex items-start gap-2.5">
                    <MailIcon className="size-4 flex-none mt-0.5 text-red-600" />
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-primary-bright-100/70 hover:text-primary-bright-100 transition-colors duration-200 break-all"
                    >
                      {contactEmail}
                    </a>
                  </li>
                )}
                {addressLine && (
                  <li className="flex items-start gap-2.5">
                    <MapPinIcon className="size-4 flex-none mt-0.5 text-red-600" />
                    <span className="text-sm text-primary-bright-100/70">{addressLine}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* ── Download app (repeated larger on lg) ── */}
          {(androidUrl || iosUrl) && (
            <div className="hidden lg:flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-widest text-primary-bright-100/40 font-medium">
                Get the App
              </h4>
              <div className="flex flex-col gap-3">
                {androidUrl && (
                  <a href={androidUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on Google Play">
                    <div className="relative h-10 w-32">
                      <Image src={APP_BADGES.android} alt="Google Play" fill sizes="128px" className="object-contain object-left" />
                    </div>
                  </a>
                )}
                {iosUrl && (
                  <a href={iosUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on App Store">
                    <div className="relative h-10 w-32">
                      <Image src={APP_BADGES.ios} alt="App Store" fill sizes="128px" className="object-contain object-left" />
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Divider + copyright ── */}
        <div className="mt-10 pt-6 border-t border-primary-dark-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-bright-100/30 text-center sm:text-left">
            &copy; {year} {gymName ?? ""}. All rights reserved.
          </p>
          <p className="text-xs text-primary-bright-100/20 text-center">
            Powered by <span className="text-primary-bright-100/40">Gym Assistant</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Inline icons ─────────────────────────────────────────────────────────────

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
