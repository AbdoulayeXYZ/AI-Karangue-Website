"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SiteContent, defaultContent } from "@/lib/content";
import { usePathname } from "next/navigation";

export const Navbar = ({ content }: { content?: SiteContent["navbar"] }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navbarContent = content || defaultContent.navbar;
    const navLinks = navbarContent.links;

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Body scroll lock while menu open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isMobileMenuOpen]);

    // Close on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 flex justify-center",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-2xl border-b border-navy/5 shadow-lg shadow-navy-dark/5"
                        : "bg-transparent border-b border-white/5"
                )}
            >
                {/* Luxury corner accents */}
                <div className={cn(
                    "absolute top-8 left-8 w-10 h-10 border-l border-t pointer-events-none transition-all duration-700",
                    isScrolled ? "border-navy/10 opacity-0" : "border-white/10 opacity-100"
                )} />
                <div className={cn(
                    "absolute top-8 right-8 w-10 h-10 border-r border-t pointer-events-none transition-all duration-700",
                    isScrolled ? "border-navy/10 opacity-0" : "border-white/10 opacity-100"
                )} />

                <nav
                    className={cn(
                        "w-full container mx-auto flex items-center justify-between transition-all duration-700",
                        isScrolled ? "h-16 px-4 sm:px-6" : "h-24 sm:h-32 px-4 sm:px-6"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="relative flex items-center group z-10" onClick={closeMenu}>
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 transition-all duration-700">
                            <Image
                                src="/logoaikarangue.png"
                                alt="AI-Karangué"
                                fill
                                className={cn(
                                    "object-contain group-hover:scale-110 transition-all duration-500",
                                    !isScrolled && "brightness-0 invert"
                                )}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10 xl:gap-12">
                        {navLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative group text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500",
                                            isScrolled
                                                ? isActive ? "text-navy" : "text-navy/50 hover:text-navy"
                                                : isActive ? "text-white" : "text-white/50 hover:text-white"
                                        )}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 h-px transition-all duration-500",
                                            isActive ? "w-full" : "w-0 group-hover:w-full",
                                            isScrolled ? "bg-navy" : "bg-teal"
                                        )} />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <LanguageSwitcher />
                        <Link
                            href="https://karangue221.artbeaurescence.sn"
                            target="_blank"
                            className={cn(
                                "text-[10px] font-black tracking-[0.3em] uppercase transition-colors",
                                isScrolled ? "text-navy/40 hover:text-navy" : "text-white/40 hover:text-teal"
                            )}
                        >
                            Accès Client
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant={isScrolled ? "secondary" : "primary"}
                                size="sm"
                                className={cn(
                                    "h-11 px-7 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-700",
                                    !isScrolled && "bg-teal text-white hover:shadow-[0_0_30px_rgba(0,128,128,0.4)]"
                                )}
                            >
                                {navbarContent.cta}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Hamburger — Morphing icon */}
                    <button
                        className={cn(
                            "lg:hidden relative z-[110] w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                            isMobileMenuOpen
                                ? "bg-teal"
                                : isScrolled
                                    ? "bg-navy/8 hover:bg-navy/12"
                                    : "bg-white/10 hover:bg-white/15 backdrop-blur-sm"
                        )}
                        onClick={() => setIsMobileMenuOpen(v => !v)}
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="relative w-[18px] h-3.5">
                            {/* Bar top */}
                            <span className={cn(
                                "absolute left-0 h-0.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1]",
                                isMobileMenuOpen
                                    ? "top-1/2 w-full -translate-y-1/2 rotate-45 bg-white"
                                    : "top-0 w-full bg-current",
                                !isMobileMenuOpen && (isScrolled ? "text-navy" : "text-white"),
                                isMobileMenuOpen ? "" : isScrolled ? "bg-navy" : "bg-white"
                            )} />
                            {/* Bar mid */}
                            <span className={cn(
                                "absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-all duration-200",
                                isMobileMenuOpen
                                    ? "w-0 opacity-0 bg-white"
                                    : "w-3/4 opacity-100",
                                !isMobileMenuOpen && (isScrolled ? "bg-navy" : "bg-white")
                            )} />
                            {/* Bar bottom */}
                            <span className={cn(
                                "absolute left-0 h-0.5 rounded-full transition-all duration-300 ease-[0.16,1,0.3,1]",
                                isMobileMenuOpen
                                    ? "bottom-1/2 w-full translate-y-1/2 -rotate-45 bg-white"
                                    : "bottom-0 w-5/6",
                                !isMobileMenuOpen && (isScrolled ? "bg-navy" : "bg-white")
                            )} />
                        </div>
                    </button>
                </nav>
            </header>

            {/* ── Mobile Menu: Bottom Sheet — sibling to header to escape its stacking context ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[105] bg-navy-dark/70 backdrop-blur-sm lg:hidden"
                            onClick={closeMenu}
                        />

                        {/* Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
                            className="fixed bottom-0 left-0 right-0 z-[106] lg:hidden bg-navy-dark rounded-t-[2rem] shadow-2xl shadow-black/50"
                            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
                        >
                            {/* Decorative ambient glows — clipped to sheet corners via own wrapper */}
                            <div className="pointer-events-none absolute inset-0 rounded-t-[2rem] overflow-hidden">
                                <div className="absolute top-0 right-0 w-56 h-56 bg-teal/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-navy/40 rounded-full blur-[60px]" />
                            </div>

                            {/* Drag handle */}
                            <div className="flex justify-center pt-3.5 pb-2">
                                <div className="w-9 h-1 rounded-full bg-white/15" />
                            </div>

                            {/* Scrollable content — nav links only */}
                            <div className="px-5 pt-3 pb-2">
                                {/* Primary CTA — always at top, fixed */}
                                <Link href="/contact" onClick={closeMenu}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 }}
                                        className="flex items-center justify-between bg-teal hover:bg-teal-light transition-colors rounded-2xl px-5 py-4 mb-4 group"
                                    >
                                        <span className="text-white font-black text-sm uppercase tracking-[0.15em]">
                                            {navbarContent.cta}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                                    </motion.div>
                                </Link>

                                <div className="overflow-y-auto overscroll-contain pb-2 max-h-[45vh]">
                                    {/* Navigation links */}
                                    <nav className="space-y-0.5">
                                        {navLinks.map((link, i) => {
                                            const isActive = pathname === link.href;
                                            return (
                                                <motion.div
                                                    key={link.name}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.08 + i * 0.04, type: "tween", ease: [0.16, 1, 0.3, 1] }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={closeMenu}
                                                        className={cn(
                                                            "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200",
                                                            isActive
                                                                ? "bg-teal/12 text-white"
                                                                : "text-white/60 hover:text-white hover:bg-white/5 active:bg-white/8"
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            "font-bold text-[15px] tracking-tight",
                                                            isActive && "font-black text-white"
                                                        )}>
                                                            {link.name}
                                                        </span>
                                                        {isActive && (
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-teal">En cours</span>
                                                                <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                                                            </span>
                                                        )}
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </div>

                            {/* Non-scrolling footer — outside overflow-y-auto so the language dropdown can overflow freely */}
                            <div className="px-5 pb-6">
                                {/* Divider */}
                                <div className="h-px bg-white/5 mb-4" />

                                {/* Secondary row */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35 }}
                                    className="relative flex items-center justify-between px-1"
                                >
                                    <LanguageSwitcher dropUp />
                                    <Link
                                        href="https://karangue221.artbeaurescence.sn"
                                        target="_blank"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                                    >
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50 hover:text-teal transition-colors">
                                            Accès Client
                                        </span>
                                        <ExternalLink className="w-3 h-3 text-white/30" />
                                    </Link>
                                </motion.div>

                                {/* Brand footer */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-4 text-center text-[9px] font-bold tracking-[0.25em] uppercase text-white/20"
                                >
                                    AI-Karangué © 2025 · Art&apos;Beau-Rescence S.A.S.
                                </motion.p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
