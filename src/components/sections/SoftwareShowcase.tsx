"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Layout, Video, Shield, ArrowRight, Zap, Monitor, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteContent } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
    tracking: Layout,
    video: Video,
};

export const SoftwareShowcase = ({ content }: { content: SiteContent["home"]["software"] }) => {
    return (
        <section id="software" className="bg-zinc-50 overflow-hidden py-32 relative">
            {/* Background Ambience - Subtle Tech Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#003366 1px, transparent 1px), linear-gradient(90deg, #003366 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header - Emotional & Commanding */}
                <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24 text-center lg:text-left">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-6 block"
                        >
                            {content.sectionLabel}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black text-navy-dark tracking-tighter leading-[0.9]"
                        >
                            {content.sectionTitle} <br /> <span className="text-teal">{content.sectionTitleHighlight}</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Immersive Platform Experience (Side-by-Side) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {content.features.map((feature, index) => (
                        <div key={feature.id} className="w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group"
                            >
                                <Link href={`/solutions#${feature.id}`} className="block relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-navy/20 group-hover:shadow-[0_30px_90px_-20px_rgba(0,51,102,0.3)] transition-all duration-700">
                                    <Image
                                        src={feature.imagePath}
                                        alt={feature.title}
                                        width={0}
                                        height={0}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="w-full h-auto object-contain transition-transform duration-[1.5s] ease-[0.2,1,0.3,1] group-hover:scale-105"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Link>

                                <div className="mt-8 space-y-4">
                                    <h3 className="text-3xl font-black text-navy-dark">{feature.title}</h3>
                                    <p className="text-navy/60 font-medium text-lg leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <Link
                                        href={feature.linkText.toLowerCase().includes('démo') ? '/contact' : `/solutions#${feature.id}`}
                                        className="inline-flex items-center gap-3 text-teal font-black uppercase tracking-wider text-sm mt-2 group-hover:gap-4 transition-all"
                                    >
                                        <span>{feature.linkText}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Bottom Hook */}
                <div className="mt-20 text-center">
                    <p className="text-navy/40 text-sm font-medium mb-8">
                        {content.bottomHook}
                    </p>
                    <Link className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-teal hover:text-navy-dark transition-colors border-b border-teal/20 pb-1 hover:border-navy-dark" href="/solutions#platform">
                        {content.bottomLink}
                    </Link>
                </div>
            </div>
        </section>
    );
};
