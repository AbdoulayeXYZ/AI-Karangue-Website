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
                            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-navy/5 group-hover:shadow-[0_20px_80px_-20px_rgba(0,51,102,0.15)] border border-zinc-100 transition-all duration-500 h-full flex flex-col">

                                {/* Image Section */}
                                <div className="relative h-[300px] overflow-hidden">
                                    <Image
                                        src={pillar.imagePath}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-[0.2,1,0.3,1] group-hover:scale-110"
                                    />
                                    {/* Subtle Overlay to ensure depth */}
                                    <div className="absolute inset-0 bg-navy-dark/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex flex-col flex-1 bg-white relative z-10">
                                    <div className="mb-6">
                                        <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-[10px] font-black tracking-widest uppercase">
                                            {pillar.subtitle}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-black mb-4 leading-tight text-navy-dark">{pillar.title}</h3>

                                    <p className="text-navy/60 font-medium leading-relaxed mb-8 flex-1">
                                        {pillar.description}
                                    </p>

                                    {/* Benefits List */}
                                    <ul className="space-y-4 pt-6 border-t border-zinc-100 mt-auto">
                                        {pillar.benefits.map((benefit, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm font-bold text-navy-dark">
                                                <div className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal/20">
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
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
