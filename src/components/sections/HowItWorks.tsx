"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/content";

export const HowItWorks = ({ content }: { content: SiteContent["home"]["howItWorks"] }) => {
    return (
        <section className="bg-navy-dark overflow-hidden py-24">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-4 block"
                    >
                        {content.sectionLabel}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none"
                    >
                        {content.sectionTitle}{" "}
                        <span className="text-teal">{content.sectionTitleHighlight}</span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting line (desktop) */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        {content.steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Number circle */}
                                <div className="relative mb-8">
                                    <div className="w-14 h-14 rounded-full border border-teal/30 flex items-center justify-center bg-teal/5 group-hover:bg-teal group-hover:border-teal transition-all duration-500">
                                        <span className="text-teal group-hover:text-white font-black text-sm tracking-widest transition-colors duration-500">
                                            {step.number}
                                        </span>
                                    </div>
                                    {/* Outer ring */}
                                    <div className="absolute inset-0 rounded-full border border-teal/10 scale-125 group-hover:scale-150 group-hover:border-teal/20 transition-all duration-700" />
                                </div>

                                <h3 className="text-white font-black text-xl tracking-tight mb-3 group-hover:text-teal transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
