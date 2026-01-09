"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/content";
import { Check } from "lucide-react";

export const TripleImpact = ({ content }: { content: SiteContent["home"]["tripleImpact"] }) => {
    return (
        <section id="triple-impact" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-teal font-black uppercase tracking-[0.3em] text-xs mb-6 block"
                    >
                        {content.sectionLabel}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-navy-dark mb-8 leading-[1.1] tracking-tight"
                    >
                        {content.sectionTitle} <br className="hidden md:block" />
                        <span className="text-teal">{content.sectionTitleHighlight}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-navy/60 leading-relaxed font-medium max-w-2xl mx-auto"
                    >
                        {content.sectionDescription}
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {content.pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/5 group-hover:shadow-[0_20px_80px_-20px_rgba(0,51,102,0.2)] transition-all duration-700">

                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={pillar.imagePath}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-[0.2,1,0.3,1] group-hover:scale-110"
                                    />
                                    {/* Gradient Overlays for Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent opacity-90" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white relative z-10">
                                    <div className="mb-auto pt-4">
                                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black tracking-widest uppercase mb-4">
                                            {pillar.subtitle}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-black mb-4 leading-tight">{pillar.title}</h3>
                                    <p className="text-white/70 font-medium leading-relaxed mb-8">
                                        {pillar.description}
                                    </p>

                                    {/* Benefits List */}
                                    <ul className="space-y-3 pt-6 border-t border-white/10">
                                        {pillar.benefits.map((benefit, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm font-bold text-teal-light">
                                                <div className="w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-teal" strokeWidth={3} />
                                                </div>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
