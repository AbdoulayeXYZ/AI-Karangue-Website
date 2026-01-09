"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Solutions", href: "/solutions" },
        { name: "Industries", href: "/industries" },
        { name: "Nos Offres", href: "/offres" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ease-[0.16,1,0.3,1] flex justify-center",
                isScrolled ? "bg-white/80 backdrop-blur-2xl border-b border-navy/5 shadow-xl" : "bg-transparent border-b border-white/5"
            )}
        >
            {/* Top Luxury Corners - Fixed Framing */}
            <div className={cn(
                "absolute top-8 left-8 w-12 h-12 border-l border-t pointer-events-none transition-all duration-1000",
                isScrolled ? "border-navy/10" : "border-white/10"
            )} />
            <div className={cn(
                "absolute top-8 right-8 w-12 h-12 border-r border-t pointer-events-none transition-all duration-1000",
                isScrolled ? "border-navy/10" : "border-white/10"
            )} />

            <nav
                className={cn(
                    "w-full container mx-auto flex items-center justify-between transition-all duration-1000 ease-[0.16,1,0.3,1]",
                    isScrolled ? "h-20 px-6" : "h-32 px-6"
                )}
            >
                {/* Branding - Minimalist Logo */}
                <Link href="/" className="relative flex items-center group z-10">
                    <div className="relative w-16 h-16 transition-all duration-1000">
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

                {/* Navigation Links - Zen Style */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    "relative group text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500",
                                    isScrolled ? "text-navy/60 hover:text-navy" : "text-white/60 hover:text-white"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-500 group-hover:w-full",
                                    isScrolled ? "bg-navy" : "bg-teal"
                                )} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Actions - Precision Buttons */}
                <div className="hidden lg:flex items-center gap-8">
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
                                "h-12 px-8 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-700",
                                !isScrolled && "bg-teal text-white hover:shadow-[0_0_30px_rgba(0,128,128,0.4)]"
                            )}
                        >
                            Demander une démo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Trigger - Modern Animated Button */}
                <button
                    className={cn(
                        "lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden group",
                        isScrolled
                            ? "bg-navy/5 hover:bg-navy/10 text-navy"
                            : "bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm",
                        isMobileMenuOpen && "z-[110] bg-teal text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                            className={cn(
                                "absolute w-5 h-0.5 rounded-full transition-colors",
                                isMobileMenuOpen ? "bg-white" : isScrolled ? "bg-navy" : "bg-white"
                            )}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className={cn(
                                "absolute w-5 h-0.5 rounded-full transition-colors",
                                isMobileMenuOpen ? "bg-white" : isScrolled ? "bg-navy" : "bg-white"
                            )}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                            className={cn(
                                "absolute w-5 h-0.5 rounded-full transition-colors",
                                isMobileMenuOpen ? "bg-white" : isScrolled ? "bg-navy" : "bg-white"
                            )}
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile Menu - Modern Slide-in Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[105] bg-navy-dark/95 backdrop-blur-xl lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Slide-in Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-[106] w-full max-w-md bg-gradient-to-br from-navy-dark via-navy-dark to-navy lg:hidden shadow-2xl"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-20 right-20 w-64 h-64 bg-teal/20 blur-[120px] rounded-full" />
                            <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-600/20 blur-[100px] rounded-full" />

                            {/* Content Container */}
                            <div className="relative h-full flex flex-col p-8 pt-24">
                                {/* Navigation Links */}
                                <nav className="flex-1 flex flex-col justify-center gap-2">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 100 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="group block py-4 px-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-3xl font-black text-white/90 group-hover:text-white transition-colors tracking-tight">
                                                        {link.name}
                                                    </span>
                                                    <motion.div
                                                        initial={{ x: -10, opacity: 0 }}
                                                        whileHover={{ x: 0, opacity: 1 }}
                                                        className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center"
                                                    >
                                                        <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </motion.div>
                                                </div>
                                                <div className="h-px bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Bottom Actions */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-4 pt-8 border-t border-white/10"
                                >
                                    <Link
                                        href="https://karangue221.artbeaurescence.sn"
                                        target="_blank"
                                        className="block text-center py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className="text-xs font-black tracking-[0.3em] uppercase text-white/60 group-hover:text-teal transition-colors">
                                            Accès Client
                                        </span>
                                    </Link>
                                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full h-14 rounded-xl bg-teal hover:bg-teal-light text-white font-black tracking-wider shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 transition-all">
                                            Demander une démo
                                        </Button>
                                    </Link>
                                </motion.div>

                                {/* Footer Info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                                        AI-Karangué © 2025
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};
