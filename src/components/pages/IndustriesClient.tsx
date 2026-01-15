"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Bus, Truck, ShieldCheck, ChevronRight, BarChart3, Users, Zap, HardHat, Fuel, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { SiteContent } from "@/lib/content";

// Icon mapping for "Other Sectors"
const iconMap: Record<string, any> = {
    "users": Users,
    "zap": Zap,
    "shield": ShieldCheck,
    "chart": BarChart3 // fallback
};

export const IndustriesClient = ({ content }: { content: SiteContent }) => {
    return (
        <main className="min-h-screen bg-zinc-50 selection:bg-teal selection:text-white overflow-hidden">
            <Navbar content={content.navbar} />

            {/* Hero Header - Immersive Dark */}
            <section className="pt-48 pb-32 bg-navy-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/industry-truck.png')] bg-cover bg-center opacity-20 mix-blend-overlay scale-110 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-zinc-50" />

                {/* Decorative gradients for 'peps' */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-teal/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-8 block drop-shadow-lg">{content.industries.hero.label}</span>
                        <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl" dangerouslySetInnerHTML={{
                            __html: `${content.industries.hero.title} <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-light">${content.industries.hero.titleHighlight}</span>`
                        }} />
                        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium tracking-tight h-auto leading-relaxed border-l-4 border-teal pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                            {content.industries.hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-20 relative z-20 space-y-32 pb-40">

                {/* Dynamic Sectors Loop */}
                {content.industries.sectors.map((sector, index) => {
                    // Alternate layout for variety, or keep standard listing? 
                    // Original had: Left-Image for Truck (index 1), Right-Image for Bus (index 0) and BTP (index 2).
                    // Actually: 
                    // Index 0 (Bus): Text Left, Image Right
                    // Index 1 (Truck): Image Left, Text Right (Dark Theme)
                    // Index 2 (BTP): Text Left, Image Right

                    const isEven = index % 2 === 0;
                    const isDark = index === 1; // Logistics was dark. Let's make every 2nd card dark? Or stick to specific style based on ID?
                    // Let's stick to the alternating pattern: Even = Light, Odd = Dark (or just alternated layout)
                    // Original Logistics (Index 1) was Dark.

                    return (
                        <motion.div
                            key={sector.id}
                            id={sector.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 group relative",
                                isDark
                                    ? "bg-navy-dark shadow-navy-dark/30 hover:ring-2 hover:ring-teal/30"
                                    : "bg-white shadow-navy-dark/10 border border-white/50 hover:shadow-3xl hover:shadow-teal/10"
                            )}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Content Column */}
                                <div className={cn(
                                    "p-12 lg:p-20 flex flex-col justify-center relative",
                                    isDark ? "text-white order-2 lg:order-2" : "order-2 lg:order-1"
                                )}>
                                    {/* Backgrounds */}
                                    {!isDark && <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />}
                                    {isDark && <div className="absolute right-0 top-0 w-64 h-64 bg-teal/10 rounded-full blur-[80px]" />}

                                    <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-turtler leading-[0.9] text-inherit">
                                        {sector.title} <span className={cn(
                                            isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-teal to-white" : "text-teal"
                                        )}>{sector.highlight}</span>
                                    </h2>
                                    <p className={cn(
                                        "text-xl leading-relaxed mb-10 font-medium relative z-10",
                                        isDark ? "text-white/70" : "text-navy/60"
                                    )}>
                                        {sector.description}
                                    </p>

                                    {/* Stats or Features */}
                                    {sector.type === 'stats' && (
                                        <div className={cn(
                                            "mb-12 relative z-10",
                                            isDark ? "grid grid-cols-2 gap-4" : "space-y-4"
                                        )}>
                                            {sector.stats.map((stat, i) => (
                                                isDark ? (
                                                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                                                        <div className="text-4xl font-black mb-1 text-teal">{stat.value}</div>
                                                        <div className="text-xs uppercase tracking-wider opacity-60 font-bold">{stat.label}</div>
                                                    </div>
                                                ) : (
                                                    <div key={i} className="flex items-center justify-between p-5 bg-gradient-to-r from-zinc-50 to-white rounded-2xl border border-zinc-100 group-hover:border-teal/20 transition-colors">
                                                        <span className="font-bold text-navy-dark/70">{stat.label}</span>
                                                        <span className="font-black text-teal text-lg">{stat.value}</span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {sector.type === 'list' && (
                                        <ul className="space-y-4 mb-12 relative z-10">
                                            {sector.features.map((item, i) => (
                                                <li key={i} className={cn("flex items-center gap-4 font-bold group/item", isDark ? "text-white" : "text-navy-dark")}>
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover/item:scale-150 transition-transform" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <Link href="/contact">
                                        <Button
                                            variant={isDark ? "primary" : "outline"}
                                            className={cn(
                                                "w-fit h-14 px-8 rounded-xl flex items-center gap-2 group/btn transition-all duration-300",
                                                isDark
                                                    ? "bg-teal text-white hover:bg-teal-light border-none shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                                                    : "text-navy-dark border-2 border-navy/10 hover:bg-navy-dark hover:text-white hover:border-navy-dark"
                                            )}
                                        >
                                            {sector.ctaText} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Image Column */}
                                <div className={cn(
                                    "relative min-h-[500px] lg:min-h-full overflow-hidden",
                                    isDark ? "order-1 lg:order-1" : "order-1 lg:order-2"
                                )}>
                                    <Image
                                        src={sector.imagePath}
                                        alt={sector.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                                    />
                                    <div className={cn(
                                        "absolute inset-0 transition-opacity duration-700",
                                        isDark
                                            ? "bg-gradient-to-r from-transparent to-navy-dark/90 lg:to-navy-dark"
                                            : "bg-gradient-to-br from-teal/20 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100"
                                    )} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Other Sectors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.industries.otherSectors.map((sect, i) => {
                        const Icon = iconMap[sect.iconId] || BarChart3;
                        return (
                            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 hover:border-teal/30 hover:shadow-2xl hover:shadow-teal/5 transition-all duration-300 group cursor-default">
                                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal group-hover:text-white transition-all duration-300 text-teal">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-navy-dark mb-4 group-hover:text-teal transition-colors">{sect.title}</h3>
                                <p className="text-navy/60 font-medium leading-relaxed">{sect.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Final CTA */}
            <section className="py-64 bg-navy-dark text-white text-center rounded-[5rem] mx-4 my-20 overflow-hidden relative" id="contact">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal/30 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy/40 blur-[150px] rounded-full" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-6xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mb-16" dangerouslySetInnerHTML={{
                            __html: `${content.industries.finalCta.title} <br /> <span class="text-teal">${content.industries.finalCta.titleHighlight}</span>`
                        }} />
                        <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-xl mx-auto">
                            {content.industries.finalCta.description}
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <Link href="/contact">
                                <Button size="lg" className="h-20 px-12 text-xl bg-teal text-white hover:scale-105 transition-transform shadow-2xl shadow-teal/20">
                                    {content.industries.finalCta.ctaPrimary}
                                    <ArrowRight className="inline-block ml-3" />
                                </Button>
                            </Link>
                            <Link href="/offres">
                                <Button variant="outline" size="lg" className="h-20 px-12 text-xl border-white/10 text-white hover:bg-white hover:text-navy-dark transition-all">
                                    {content.industries.finalCta.ctaSecondary}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer content={content.footer} />
        </main>
    );
};
