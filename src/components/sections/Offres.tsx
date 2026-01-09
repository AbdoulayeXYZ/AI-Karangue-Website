"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check, Star, Zap, ShieldCheck, CheckCircle2, Crown, LucideIcon } from "lucide-react";
import { SiteContent } from "@/lib/content";

export const Offres = ({ content }: { content: SiteContent["home"]["offres"] }) => {
    return (
        <section id="offres" className="py-32 bg-zinc-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <span className="text-teal font-black uppercase tracking-[0.2em] text-xs mb-6 block">{content.sectionLabel}</span>
                    <h2 className="text-4xl md:text-6xl font-black text-navy-dark mb-8 leading-tight tracking-tight">
                        {content.sectionTitle} <span className="text-teal">{content.sectionTitleHighlight}</span>
                    </h2>
                    <p className="text-xl text-navy/60 leading-relaxed font-medium max-w-2xl mx-auto">
                        {content.sectionDescription}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                    {content.packs.map((pack, i) => {
                        let Icon: LucideIcon = Star;
                        if (pack.popular) Icon = Crown;
                        else if (i === 0) Icon = Zap;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "relative p-8 lg:p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between group",
                                    pack.popular
                                        ? "bg-navy-dark text-white shadow-2xl scale-105 z-10 border-2 border-teal/20"
                                        : "bg-white border border-navy/5 hover:border-teal/20 hover:shadow-xl shadow-lg shadow-navy/5"
                                )}
                            >
                                {pack.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-teal text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-teal/30 flex items-center gap-2">
                                        <Star className="w-3 h-3 fill-white" />
                                        <span>Recommandé</span>
                                    </div>
                                )}

                                <div>
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg",
                                        pack.popular ? "bg-white/10 text-teal" : "bg-zinc-50 text-navy-dark"
                                    )}>
                                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    <h3 className={cn("text-2xl font-black mb-2", pack.popular ? "text-white" : "text-navy-dark")}>
                                        {pack.name}
                                    </h3>
                                    <p className={cn("text-xs font-bold uppercase tracking-wider mb-8 opacity-60", pack.popular ? "text-teal" : "text-navy/60")}>
                                        {pack.tagline}
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {pack.features.map((feature, j) => (
                                            <div key={j} className="flex items-start gap-3">
                                                <div className={cn(
                                                    "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                                                    pack.popular ? "bg-teal text-white" : "bg-zinc-100 text-teal"
                                                )}>
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                                <span className={cn(
                                                    "text-sm font-bold leading-relaxed",
                                                    pack.popular ? "text-white/90" : "text-navy/70"
                                                )}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    className={cn(
                                        "w-full h-14 rounded-xl font-black uppercase tracking-wider text-xs shadow-lg transition-all hover:scale-[1.02]",
                                        pack.popular
                                            ? "bg-teal hover:bg-teal-light text-white shadow-teal/20"
                                            : "bg-navy-dark hover:bg-navy text-white shadow-navy/10"
                                    )}
                                >
                                    {content.ctaButton}
                                </Button>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-navy/40 font-bold text-sm mb-4">{content.bottomText}</p>
                    <a href="#contact" className="inline-flex items-center gap-2 text-navy-dark font-black text-lg hover:text-teal transition-colors border-b-2 border-teal/20 hover:border-teal pb-1">
                        {content.bottomLink} <CheckCircle2 className="w-5 h-5 text-teal" />
                    </a>
                </div>
            </div>
        </section>
    );
};
