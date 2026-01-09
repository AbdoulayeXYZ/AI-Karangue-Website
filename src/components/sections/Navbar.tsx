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
                            Réserver Démo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Trigger - Minimalist Circle */}
                <button
                    className={cn(
                        "lg:hidden w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500",
                        isScrolled ? "border-navy/10 text-navy" : "border-white/10 text-white/60 hover:text-white",
                        isMobileMenuOpen && "z-[110]"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay - Full Zen Experience */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[105] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/10 blur-[150px] rounded-full" />

                        <div className="relative flex flex-col items-center gap-8 text-center px-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-5xl md:text-7xl font-black text-white/20 hover:text-white transition-all duration-700 tracking-tighter"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 flex flex-col items-center gap-8"
                            >
                                <div className="w-12 h-px bg-white/20" />
                                <Link
                                    href="https://karangue221.artbeaurescence.sn"
                                    className="text-xs font-black tracking-[0.5em] uppercase text-white/40 hover:text-teal transition-colors"
                                >
                                    Plateforme Connectée
                                </Link>
                                <Link href="/contact">
                                    <Button className="h-16 px-12 text-sm font-black tracking-[0.2em] rounded-2xl">
                                        Réserver une démo
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
