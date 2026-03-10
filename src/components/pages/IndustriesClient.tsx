"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ShieldCheck, Zap, BarChart3, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { SiteContent } from "@/lib/content";

const categories = ["Tous", "Sécurité", "Carburant", "Productivité", "Conformité"];

export const IndustriesClient = ({ content }: { content: SiteContent }) => {
    const [activeCategory, setActiveCategory] = useState("Tous");

    const filteredSectors = content.industries.sectors.filter(
        (sector) => activeCategory === "Tous" || sector.categoryId === activeCategory
    );

    return (
        <main className="min-h-screen bg-zinc-50 selection:bg-teal selection:text-white overflow-hidden">
            {/* Hero Header */}
            <section className="pt-32 sm:pt-48 pb-16 sm:pb-32 bg-navy-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/industry-truck.png')] bg-cover bg-center opacity-20 mix-blend-overlay scale-110 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-zinc-50" />

                <div className="absolute top-20 right-20 w-96 h-96 bg-teal/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-8 block drop-shadow-lg">{content.industries.hero.label}</span>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter mb-6 sm:mb-8 leading-[0.9] drop-shadow-2xl" dangerouslySetInnerHTML={{
                            __html: `${content.industries.hero.title} <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-light">${content.industries.hero.titleHighlight}</span>`
                        }} />
                        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-medium tracking-tight leading-relaxed">
                            {content.industries.hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Navigation */}
            <div className="container mx-auto px-6 -mt-10 relative z-30 mb-20 flex justify-center">
                <div className="bg-white p-2 rounded-full shadow-xl border border-zinc-200 flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto overflow-y-hidden no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 md:whitespace-nowrap cursor-pointer",
                                activeCategory === cat
                                    ? "bg-teal text-white shadow-lg shadow-teal/30 scale-105"
                                    : "text-navy-dark hover:bg-zinc-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-20 space-y-32 pb-40">
                <AnimatePresence mode="popLayout">
                    {filteredSectors.map((sector, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={sector.id}
                                id={sector.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -40 }}
                                transition={{ duration: 0.5 }}
                                className={cn(
                                    "rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 group relative border border-zinc-200 hover:shadow-teal/20",
                                    !isEven ? "bg-navy-dark text-white border-none shadow-navy-dark/30 hover:ring-2 hover:ring-teal/30" : "bg-white"
                                )}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                                    <div className={cn(
                                        "p-10 lg:p-20 flex flex-col justify-center relative min-h-full",
                                        !isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"
                                    )}>
                                        <div className="mb-6 flex gap-3 items-center">
                                            <span className="bg-teal/10 text-teal px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{sector.categoryId}</span>
                                        </div>

                                        <h2 className={cn("text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight", !isEven ? "text-white" : "text-navy-dark")}>
                                            {sector.title} <span className="text-teal">{sector.highlight}</span>
                                        </h2>

                                        {/* Hook / Problem */}
                                        <div className="mb-8 relative">
                                            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-teal to-transparent rounded-full opacity-50"></div>
                                            <p className={cn("text-xl font-bold italic leading-relaxed", !isEven ? "text-white/90" : "text-navy-dark/80")}>
                                                &quot;{sector.hook}&quot;
                                            </p>
                                            <p className={cn("mt-4 text-sm font-medium leading-relaxed", !isEven ? "text-white/60" : "text-navy/60")}>
                                                {sector.problem}
                                            </p>
                                        </div>

                                        {/* Benefits / Metrics Grid */}
                                        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {sector.benefits.map((benefit, i) => (
                                                <div key={i} className={cn(
                                                    "p-4 rounded-2xl border transition-colors",
                                                    !isEven ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-zinc-50 border-zinc-100 hover:border-teal/20"
                                                )}>
                                                    <div className="text-sm font-bold opacity-60 uppercase tracking-wider mb-1 text-teal">{benefit.label}</div>
                                                    <div className={cn("text-xl font-black mb-2", !isEven ? "text-white" : "text-navy-dark")}>{benefit.value}</div>
                                                    <div className={cn("text-xs font-medium leading-relaxed", !isEven ? "text-white/50" : "text-navy/60")}>{benefit.description}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-3 mb-12">
                                            {sector.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                                    <CheckCircle className="w-5 h-5 text-teal shrink-0" />
                                                    <span className={!isEven ? "text-white/80" : "text-navy-dark/80"}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto">
                                            <Link href="/contact">
                                                <Button size="lg" className={cn(
                                                    "w-full sm:w-auto h-16 px-8 rounded-xl text-lg flex items-center gap-3 group/btn",
                                                    !isEven
                                                        ? "bg-teal text-white hover:bg-teal-light border-none"
                                                        : "bg-navy-dark text-white hover:bg-teal"
                                                )}>
                                                    {sector.ctaText} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image Column */}
                                    <div className={cn(
                                        "relative min-h-[400px] lg:min-h-auto w-full h-full",
                                        !isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
                                    )}>
                                        <Image
                                            src={sector.imagePath}
                                            alt={sector.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 hover:scale-105"
                                        />
                                        <div className={cn(
                                            "absolute inset-0 pointer-events-none transition-all duration-700",
                                            !isEven ? "bg-gradient-to-r from-transparent to-navy-dark/90 lg:to-navy-dark" : "bg-gradient-to-r from-transparent to-white/90 lg:to-white opacity-0 group-hover:opacity-100"
                                        )} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Final CTA */}
            <section className="py-24 sm:py-40 lg:py-64 bg-navy-dark text-white text-center rounded-[3rem] sm:rounded-[5rem] mx-2 sm:mx-4 my-10 sm:my-20 overflow-hidden relative" id="contact">
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
                        <h2 className="text-3xl sm:text-5xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mb-8 sm:mb-16" dangerouslySetInnerHTML={{
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
        </main>
    );
};
