"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, Star, Zap, ShieldCheck, CheckCircle2, Crown, ArrowRight, Heart, Globe, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SiteContent } from "@/lib/content";

const packIconMap: Record<string, any> = {
    "Zap": Zap,
    "Crown": Crown,
    "Star": Star
};

const serviceIconMap: Record<string, any> = {
    "Headphones": Headphones,
    "Zap": Zap,
    "Globe": Globe,
    "ShieldCheck": ShieldCheck
};

export const OffresClient = ({ content }: { content: SiteContent }) => {
    // Helper to get icon for pack based on index/name strategy. 
    // Since names can change, let's map by index or just cycle them?
    // Original: Basic=Zap, Tranquillité=Crown, Standard=Star.
    // Index 0: Zap, 1: Crown, 2: Star.
    const getPackIcon = (index: number) => {
        if (index === 0) return Zap;
        if (index === 1) return Crown;
        return Star;
    };

    const getPackStyle = (index: number, isPopular: boolean) => {
        if (isPopular) {
            return {
                bg: "bg-navy-dark",
                text: "text-white",
                border: "border-teal/30"
            };
        }
        return {
            bg: "bg-white",
            text: "text-navy-dark",
            border: "border-zinc-200"
        };
    };

    return (
        <main className="min-h-screen bg-zinc-50 selection:bg-teal selection:text-white">

            {/* Hero Header */}
            <section className="pt-48 pb-32 relative overflow-hidden bg-navy-dark">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-teal/10 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-8 block">{content.offres.hero.label}</span>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]" dangerouslySetInnerHTML={{
                            __html: `${content.offres.hero.title} <br /> <span class="text-teal">${content.offres.hero.highlight}</span>`
                        }} />
                        <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium tracking-tight h-auto leading-relaxed">
                            {content.offres.hero.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="-mt-20 pb-32 px-4 relative z-20">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {content.offres.packs.map((pack, i) => {
                            const PackIcon = getPackIcon(i);
                            const style = getPackStyle(i, pack.popular);

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "rounded-[2.5rem] p-8 lg:p-10 relative flex flex-col justify-between h-full transition-all duration-500",
                                        style.bg,
                                        pack.popular ? "shadow-2xl shadow-navy-dark/20 scale-105 z-10 ring-4 ring-teal/20" : "shadow-xl shadow-zinc-200 border hover:border-teal/30"
                                    )}
                                >
                                    {pack.popular && (
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-teal text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-teal/30">
                                            Recommandé
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
                                                pack.popular ? "bg-white/10 text-teal" : "bg-zinc-100 text-navy-dark"
                                            )}>
                                                <PackIcon className="w-7 h-7" strokeWidth={1.5} />
                                            </div>
                                            {pack.popular && <Crown className="w-6 h-6 text-teal/50" />}
                                        </div>

                                        <h3 className={cn("text-3xl font-black mb-2 tracking-tight", style.text)}>
                                            {pack.name}
                                        </h3>
                                        <p className={cn("text-sm font-bold uppercase tracking-wider mb-8 opacity-60", style.text)}>
                                            {pack.tagline}
                                        </p>

                                        <div className="w-full h-px bg-current opacity-10 mb-8" />

                                        <ul className="space-y-5 mb-12">
                                            {pack.features.map((feature, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <div className={cn(
                                                        "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                                        pack.popular ? "bg-teal text-white" : "bg-teal/10 text-teal"
                                                    )}>
                                                        <Check className="w-3 h-3" strokeWidth={3} />
                                                    </div>
                                                    <span className={cn("text-base font-bold leading-snug", pack.popular ? "text-white/90" : "text-navy-dark/80")}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link href="/contact" className="w-full">
                                        <Button
                                            className={cn(
                                                "w-full h-16 rounded-2xl font-black uppercase tracking-wider text-xs shadow-lg transition-transform hover:scale-[1.02]",
                                                pack.popular
                                                    ? "bg-teal hover:bg-teal-light text-white shadow-teal/20"
                                                    : "bg-navy-dark hover:bg-navy text-white shadow-navy/10"
                                            )}
                                        >
                                            {pack.ctaText}
                                        </Button>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-navy-dark tracking-tighter mb-6" dangerouslySetInnerHTML={{
                            __html: `${content.offres.comparison.title} <span class="text-teal">${content.offres.comparison.highlight}</span>`
                        }} />
                        <p className="text-navy/50 font-medium">{content.offres.comparison.description}</p>
                    </div>

                    <div className="max-w-6xl mx-auto rounded-[3rem] border border-zinc-100 shadow-2xl overflow-hidden bg-zinc-50/50 backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-zinc-200">
                                        {content.offres.comparison.headers.map((header, h) => (
                                            <th key={h} className={cn(
                                                "p-8 text-lg font-black text-center w-1/5",
                                                h === 0 ? "text-xs font-black tracking-[0.2em] uppercase text-navy/40 text-left" : "text-navy-dark",
                                                h === 3 && "text-teal bg-teal/5"
                                            )}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200">
                                    {content.offres.comparison.rows.map((row, i) => (
                                        <tr key={i} className="hover:bg-white transition-colors">
                                            <td className="p-6 md:p-8 font-bold text-navy-dark/70 text-sm md:text-base">{row[0]}</td>
                                            {[1, 2, 3].map((colIndex) => (
                                                <td key={colIndex} className={cn(
                                                    "p-6 md:p-8 text-center font-bold",
                                                    colIndex === 3 ? "text-navy-dark font-black bg-teal/5 border-l border-teal/10" : "text-navy-dark/40"
                                                )}>
                                                    {typeof row[colIndex] === "boolean"
                                                        ? (row[colIndex]
                                                            ? (colIndex === 3
                                                                ? <CheckCircle2 className="w-6 h-6 mx-auto text-teal fill-teal/10" />
                                                                : <Check className="w-6 h-6 mx-auto text-teal" />)
                                                            : <div className="w-2 h-2 bg-zinc-200 rounded-full mx-auto" />)
                                                        : row[colIndex]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service & Support BENTO */}
            <section className="py-32 bg-zinc-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

                        <div className="md:col-span-2 lg:col-span-2 bg-navy-dark rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">
                                <div>
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                                        <Headphones className="w-8 h-8 text-teal" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{content.offres.services.support.title}</h3>
                                    <p className="text-white/60 text-lg font-medium max-w-md leading-relaxed mb-8">
                                        {content.offres.services.support.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-teal">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(x => (
                                                <div key={x} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-navy-dark flex items-center justify-center text-[10px] text-white">Eng.</div>
                                            ))}
                                        </div>
                                        <span>{content.offres.services.support.label}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 border border-zinc-200 shadow-xl flex flex-col justify-between group hover:border-teal/30 transition-colors duration-500">
                            <div>
                                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-6 text-teal group-hover:scale-110 transition-transform">
                                    <Zap className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-black text-navy-dark mb-4">{content.offres.services.installation.title}</h4>
                                <p className="text-navy/60 font-medium leading-relaxed">
                                    {content.offres.services.installation.description}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 border border-zinc-200 shadow-xl flex flex-col justify-between group hover:border-teal/30 transition-colors duration-500">
                            <div>
                                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-6 text-teal group-hover:scale-110 transition-transform">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-black text-navy-dark mb-4">{content.offres.services.updates.title}</h4>
                                <p className="text-navy/60 font-medium leading-relaxed">
                                    {content.offres.services.updates.description}
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-teal to-teal-dark rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden flex items-center">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4">{content.offres.services.training.title}</h3>
                                <p className="text-white/80 font-medium text-lg leading-relaxed max-w-2xl">
                                    {content.offres.services.training.description}
                                </p>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10">
                                <ShieldCheck className="w-64 h-64 -translate-y-1/4 translate-x-1/4" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-64 bg-navy-dark text-white text-center rounded-[5rem] mx-4 my-20 overflow-hidden relative">
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
                            __html: `${content.offres.finalCta.title} <br /> <span class="text-teal">${content.offres.finalCta.highlight}</span>`
                        }} />
                        <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-xl mx-auto">
                            {content.offres.finalCta.description}
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <Link href="/contact">
                                <Button size="lg" className="h-20 px-12 text-xl bg-teal text-white hover:scale-105 transition-transform shadow-2xl shadow-teal/20">
                                    {content.offres.finalCta.ctaPrimary}
                                    <ArrowRight className="inline-block ml-3" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>


        </main>
    );
};
