"use client";

import { IMAGE_URL } from "@/lib/constants";

function hexToRgba(hex, alpha) {
    const clean = (hex ?? "#0F0F0F").replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import JoinButton from "@/components/registration/JoinButton";

// ─── Icons ────────────────────────────────────────────────────────────────────

function HamburgerIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function CrossIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

// ─── Desktop NavLink ──────────────────────────────────────────────────────────

function NavLink({ href, children }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`
                relative group px-4 py-2.5 rounded-xl text-sm font-medium
                text-primary-bright-100 border transition-all duration-300
                active:scale-[0.97]
                ${isActive
                    ? "bg-primary-dark-800 border-primary-dark-700"
                    : "bg-transparent border-transparent hover:bg-primary-dark-800 hover:border-primary-dark-700"
                }
            `}
        >
            <span className="relative block text-nowrap">
                {children}
                <span
                    className={`
                        absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-red-500
                        transition-all duration-300
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                />
            </span>
        </Link>
    );
}

// ─── Mobile sidebar link ──────────────────────────────────────────────────────

function SidebarLink({ href, children, index, onClick }) {
    const itemMotion = {
        hidden: { x: -20, opacity: 0 },
        show: {
            x: 0, opacity: 1,
            transition: { type: "tween", ease: "easeOut", duration: 0.25, delay: index * 0.05 + 0.3 },
        },
        exit: {
            x: -20, opacity: 0,
            transition: { type: "tween", ease: "easeIn", duration: 0.2, delay: index * 0.04 },
        },
    };

    return (
        <motion.div variants={itemMotion}>
            <Link
                href={href}
                onClick={onClick}
                className="group flex items-center gap-2 px-4 py-3 rounded-lg text-primary-bright-100 text-sm font-medium hover:bg-primary-dark-800 hover:border-primary-dark-700 border border-transparent transition-all duration-300"
            >
                <span className="flex-auto text-nowrap">{children}</span>
            </Link>
        </motion.div>
    );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ gymLogo, gymName, navbarLogo, navbarLogoText }) {
    // Prefer explicit navbar logo/text, fall back to gym model logo/name
    const logoSrc = navbarLogo || gymLogo;
    const logoText = navbarLogoText || gymName;

    return (
        <Link href="/" aria-label="site logo" className="flex items-center gap-3 flex-none">
            {logoSrc && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative h-12 w-12 overflow-hidden flex-none"
                >
                    <Image
                        src={`${IMAGE_URL}/${logoSrc}`}
                        alt={logoText || "gym logo"}
                        fill
                        sizes="48px"
                        quality={100}
                        className="object-contain"
                    />
                </motion.div>
            )}
            {logoText && (
                <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="font-teko text-2xl text-primary-bright-100 leading-none"
                >
                    {logoText}
                </motion.span>
            )}
        </Link>
    );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar({ navbarData, gymData, navbarBg }) {
    const {
        logoText: navbarLogoText = "",
        logo: navbarLogo = "",
        links = [],
        ctaText = "Join Now",
    } = navbarData ?? {};

    const gymLogo = gymData?.logo ?? "";
    const gymName = gymData?.gymName ?? "";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setSidebarOpen(false); }, [pathname]);

    const sidebarMotion = {
        hidden: { x: "-100%", opacity: 0, visibility: "hidden" },
        show: {
            x: 0, opacity: 1, visibility: "visible",
            transition: { type: "tween", ease: "easeInOut", duration: 0.3, delay: 0.1 },
        },
        exit: {
            x: "-100%", opacity: 0, visibility: "hidden",
            transition: { type: "tween", ease: "easeInOut", duration: 0.3, delay: links.length * 0.04 + 0.3 },
        },
    };

    const backdropMotion = {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { type: "tween", ease: "easeInOut", duration: 0.3 } },
        exit: { scaleX: 0, transition: { type: "tween", ease: "easeInOut", duration: 0.3, delay: links.length * 0.04 + 0.5 } },
    };

    const navBgScrolled = navbarBg ? hexToRgba(navbarBg, 0.7) : undefined;

    return (
        <>
            {/* ── Main header ── */}
            <header
                style={scrolled && navBgScrolled ? { backgroundColor: navBgScrolled } : undefined}
                className={`fixed top-0 left-0 w-full z-30 border-b transition-all duration-300
                    ${scrolled
                        ? "bg-primary-dark-900/60 backdrop-blur-[6px] border-primary-dark-700"
                        : "bg-transparent backdrop-blur-0 border-transparent"
                    }`}
            >
                <div className="container py-4">
                    <div className="flex items-center justify-between gap-10">
                        {/* Logo */}
                        <Logo
                            gymLogo={gymLogo}
                            gymName={gymName}
                            navbarLogo={navbarLogo}
                            navbarLogoText={navbarLogoText}
                        />

                        {/* Desktop nav */}
                        <nav className="hidden md:block" aria-label="main navigation">
                            <motion.ul
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                                }}
                                className="flex items-center gap-4"
                            >
                                {links.map((link, i) => (
                                    <motion.li
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, y: -10 },
                                            show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
                                        }}
                                    >
                                        <NavLink href={link.href}>{link.label}</NavLink>
                                    </motion.li>
                                ))}
                                {ctaText && (
                                    <motion.li
                                        variants={{
                                            hidden: { opacity: 0, y: -10 },
                                            show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
                                        }}
                                        className="ml-2"
                                    >
                                        <JoinButton className="block px-5 py-2.5 rounded-full text-sm font-medium bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 hover:border-transparent transition-colors duration-300">
                                            {ctaText}
                                        </JoinButton>
                                    </motion.li>
                                )}
                            </motion.ul>
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            className="block md:hidden relative w-8 h-8 text-primary-bright-100"
                            aria-label="toggle navigation"
                            onClick={() => setSidebarOpen((v) => !v)}
                        >
                            <motion.span
                                initial={false}
                                animate={sidebarOpen
                                    ? { y: 36, opacity: 0, filter: "blur(5px)" }
                                    : { y: 0, opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <HamburgerIcon className="size-6" />
                            </motion.span>
                            <motion.span
                                initial={false}
                                animate={sidebarOpen
                                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                                    : { y: -36, opacity: 0, filter: "blur(5px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <CrossIcon className="size-6" />
                            </motion.span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile sidebar ── */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.div
                        variants={sidebarMotion}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        style={navbarBg ? { backgroundColor: navbarBg } : undefined}
                        className="block md:hidden fixed top-0 left-0 z-50 w-full xs:w-64 h-dvh bg-primary-dark-900 border-r border-primary-dark-700"
                    >
                        <div className="p-4 h-full flex flex-col gap-6">
                            {/* Logo + close */}
                            <div className="flex items-center justify-between gap-4">
                                <Logo
                                    gymLogo={gymLogo}
                                    gymName={gymName}
                                    navbarLogo={navbarLogo}
                                    navbarLogoText={navbarLogoText}
                                />
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-primary-bright-100 hover:text-primary-bright-200 transition-colors flex-none"
                                    aria-label="close menu"
                                >
                                    <CrossIcon className="size-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <nav aria-label="mobile navigation" className="flex-auto overflow-y-auto hidden-scrollbar">
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="flex flex-col gap-1"
                                >
                                    {links.map((link, i) => (
                                        <SidebarLink
                                            key={i}
                                            href={link.href}
                                            index={i}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            {link.label}
                                        </SidebarLink>
                                    ))}
                                    {ctaText && (
                                        <div className="mt-4">
                                            <JoinButton
                                                className="block text-center w-full px-5 py-2.5 rounded-full text-sm font-medium bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 transition-colors duration-300"
                                            >
                                                {ctaText}
                                            </JoinButton>
                                        </div>
                                    )}
                                </motion.div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Backdrop ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        variants={backdropMotion}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="block md:hidden fixed inset-0 bg-primary-dark-900/20 backdrop-blur-[2px] z-40 origin-left"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
