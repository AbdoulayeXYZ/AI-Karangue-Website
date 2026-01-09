"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShieldCheck, Video, Cpu, Eye, AlertTriangle, ArrowRight, CheckCircle2, Zap, Activity, Radio, LucideIcon } from "lucide-react";
import { SiteContent } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
    dsm: Eye,
    adas: AlertTriangle,
    dualcam: Video
};

export const HardwareShowcase = ({ content }: { content: SiteContent["home"]["hardware"] }) => {
    return (
        <section id="hardware" className="bg-white overflow-hidden pb-16">
            {/* Introductory Header - Concise Gateway */}
            <div className="container mx-auto px-6 pt-24 pb-10 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 border-b border-navy/5 pb-10">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-4 block"
                        >
                            {content.sectionLabel}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-navy-dark tracking-tighter leading-none"
                        >
                            {content.sectionTitle} <br /> <span className="text-teal">{content.sectionTitleHighlight}</span>
                        </motion.h2>
                    </div>
                </div>
            </div>

            {/* Teaser Card Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.products.map((product, index) => {
                        const Icon = iconMap[product.id] || Zap;
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-zinc-50 rounded-[3rem] p-6 border border-navy/5 overflow-hidden transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-navy/5 h-full flex flex-col">
                                    {/* Visual Teaser - Perspective Frame */}
                                    <div className="relative aspect-video bg-navy-dark rounded-3xl overflow-hidden mb-8 shadow-lg shadow-navy-dark/10">
                                        {/* Simplified HUD */}
                                        <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between">
                                            <div className="flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1 h-1 bg-teal animate-pulse rounded-full" />
                                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Live</span>
                                                </div>
                                                <div className="px-2 py-0.5 bg-white/5 backdrop-blur-md rounded border border-white/10 text-[7px] font-black text-white/40 uppercase tracking-widest">
                                                    ID://{product.id}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-tr from-navy-dark via-transparent to-teal/10" />
                                        <Image
                                            src={product.imagePath}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-6 mix-blend-screen transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Minimal Info */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-teal font-black text-[9px] tracking-widest uppercase">0{index + 1} // {product.role.split(' & ')[0]}</span>
                                    </div>

                                    <h3 className="text-xl font-black text-navy-dark tracking-tight mb-4 group-hover:text-teal transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-navy/5">
                                        <Link
                                            href="/contact"
                                            className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-navy-dark/40 hover:text-navy-dark transition-colors"
                                        >
                                            Demander une démo
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                        <Icon className="w-5 h-5 text-navy/10 group-hover:text-teal transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Compact Final CTA */}
            <div className="container mx-auto px-6 py-20 text-center">
                <Link href="/contact">
                    <button className="h-16 px-12 bg-navy-dark text-white rounded-2xl font-black tracking-widest uppercase text-[10px] hover:bg-teal transition-all duration-300 shadow-xl shadow-navy/10 group">
                        Demander une démo
                        <ArrowRight className="inline-block ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </button>
                </Link>
            </div>
        </section>
    );
};
