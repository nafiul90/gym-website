"use client";

import { IMAGE_URL } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

// ─── NavLink ──────────────────────────────────────────────────────────────────

function NavLink({ href, children, onClick }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
                relative px-4 py-2.5 rounded-xl text-sm font-medium
                text-primary-bright-100 border
                transition-all duration-200 ease-in-out
                active:scale-[0.97] group
                ${isActive
                    ? "bg-primary-dark-800 border-primary-dark-700 text-white"
                    : "bg-transparent border-transparent hover:bg-primary-dark-800 hover:border-primary-dark-700 hover:text-white"
                }
            `}
        >
            <span className="relative block text-nowrap">
                {children}
                {/* Underline accent on hover */}
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

// ─── Sidebar link (mobile) ────────────────────────────────────────────────────

function SidebarLink({ href, children, index, onClick }) {
    const itemMotion = {
        hidden: { x: -20, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: { type: "tween", ease: "easeOut", duration: 0.25, delay: index * 0.05 + 0.3 },
        },
        exit: {
            x: -20,
            opacity: 0,
            transition: { type: "tween", ease: "easeIn", duration: 0.2, delay: index * 0.04 },
        },
    };

    return (
        <motion.div variants={itemMotion}>
            <Link
                href={href}
                onClick={onClick}
                className="group flex items-center gap-2 px-4 py-3 rounded-lg text-primary-bright-100 text-base font-medium hover:bg-primary-dark-800 hover:text-white transition-all duration-200"
            >
                <span className="flex-auto">{children}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </Link>
        </motion.div>
    );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar({ data }) {
    const { logoText, logo, links = [], ctaText = "Join Now", ctaLink = "/#packages" } = data ?? {};

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomepage = pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(isHomepage ? window.scrollY > 80 : true);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHomepage]);

    // Close sidebar on route change
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

    return (
        <>
            <header
                className={`${isHomepage ? "fixed" : "sticky"} top-0 left-0 w-full z-30 border-b transition-all duration-300
                    ${scrolled
                        ? "bg-primary-dark-900/60 backdrop-blur-[6px] border-primary-dark-700"
                        : "bg-transparent backdrop-blur-0 border-transparent"
                    }`}
            >
                <div className="container py-4">
                    <div className="flex items-center justify-between gap-10">
                        {/* Logo */}
                        <Link href="/" aria-label="logo" className="flex items-center gap-3 flex-none">
                            {logo ? (
                                <div className="relative h-12 w-12 overflow-hidden">
                                    <Image
                                        src={`${IMAGE_URL}/${logo}`}
                                        alt="logo"
                                        fill
                                        sizes="48px"
                                        quality={100}
                                        className="object-contain"
                                    />
                                </div>
                            ) : null}
                            {logoText && (
                                <span className="font-teko text-2xl text-primary-bright-100 leading-none">
                                    {logoText}
                                </span>
                            )}
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-1">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <NavLink href={link.href}>{link.label}</NavLink>
                                    </li>
                                ))}
                                {ctaText && (
                                    <li>
                                        <Link
                                            href={ctaLink}
                                            className="ml-2 px-5 py-2 rounded-full text-sm font-medium bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 hover:border-transparent transition-colors duration-300"
                                        >
                                            {ctaText}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>

                        {/* Mobile hamburger */}
                        <button
                            className="block md:hidden relative w-8 h-8 text-primary-bright-100"
                            aria-label="toggle menu"
                            onClick={() => setSidebarOpen((v) => !v)}
                        >
                            <motion.span
                                initial={false}
                                animate={sidebarOpen ? { y: 36, opacity: 0, filter: "blur(5px)" } : { y: 0, opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <HamburgerIcon className="size-6" />
                            </motion.span>
                            <motion.span
                                initial={false}
                                animate={sidebarOpen ? { y: 0, opacity: 1, filter: "blur(0px)" } : { y: -36, opacity: 0, filter: "blur(5px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <CrossIcon className="size-6" />
                            </motion.span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile sidebar */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.div
                        variants={sidebarMotion}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="block md:hidden fixed top-0 left-0 z-50 w-full xs:w-64 h-dvh bg-primary-dark-900 border-r border-primary-dark-700"
                    >
                        <div className="p-4 h-full flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-4">
                                <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2">
                                    {logo && (
                                        <div className="relative h-10 w-10">
                                            <Image src={`${IMAGE_URL}/${logo}`} alt="logo" fill sizes="40px" className="object-contain" />
                                        </div>
                                    )}
                                    {logoText && (
                                        <span className="font-teko text-xl text-primary-bright-100">{logoText}</span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-primary-bright-100 hover:text-primary-bright-200 transition-colors"
                                    aria-label="close menu"
                                >
                                    <CrossIcon className="size-6" />
                                </button>
                            </div>

                            {/* Links */}
                            <nav className="flex-auto overflow-y-auto hidden-scrollbar">
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className="flex flex-col"
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
                                        <div className="mt-4 px-4">
                                            <Link
                                                href={ctaLink}
                                                onClick={() => setSidebarOpen(false)}
                                                className="block w-full text-center px-5 py-2.5 rounded-full text-sm font-medium bg-red-600 text-white border border-red-900 hover:bg-white hover:text-primary-dark-900 transition-colors duration-300"
                                            >
                                                {ctaText}
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
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
