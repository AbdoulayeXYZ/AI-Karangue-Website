"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SiteContent } from "@/lib/content";
import {
    Shield, MapPin, MessageSquare, AlertTriangle, Camera, UserCheck,
    Database, Eye, Map, Bell, BarChart3, Settings, TrendingDown,
    Zap, Star, PieChart, ArrowRight, CheckCircle2, Smartphone, Monitor
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TrackingClientProps {
    content: SiteContent;
}

const IconMap: Record<string, any> = {
    MapPin, MessageSquare, AlertTriangle, Camera, UserCheck, Database,
    Eye, Map, Bell, BarChart3, Settings, TrendingDown, Zap, Shield, Star, PieChart, Smartphone, Monitor
};

export default function TrackingClient({ content }: TrackingClientProps) {
    const tracking = content.tracking;
    const { scrollYProgress } = useScroll();
    const posterScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

    return (
        <main className="min-h-screen bg-white selection:bg-teal selection:text-white overflow-hidden">

            {/* 1. HERO - SUPERVISION CENTER-STAGE */}
            <section className="relative min-h-[100vh] flex flex-col items-center justify-center bg-navy-dark pt-32 pb-40 overflow-hidden">
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal/10 via-navy-dark/0 to-navy-dark/0 opacity-50" />
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-teal/5 to-transparent" />
                    {/* Animated Circuit lines (implied via CSS or SVG if wanted, here keeping it clean) */}
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mx-auto mb-20"
                    >
                        <motion.span
                            initial={{ letterSpacing: "0.2em", opacity: 0 }}
                            animate={{ letterSpacing: "0.5em", opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="inline-block text-teal text-[10px] font-black uppercase mb-8"
                        >
                            {tracking.hero.label}
                        </motion.span>
                        <h1
                            className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9] inline-block"
                            dangerouslySetInnerHTML={{ __html: tracking.hero.title }}
                        />
                        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
                            {tracking.hero.description}
                        </p>
                    </motion.div>

                    {/* MAIN ASSET: Karangué221 Mockup */}
                    <div className="relative max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ scale: posterScale }}
                            className="relative"
                        >
                            {/* Glow behind mockup */}
                            <div className="absolute -inset-10 bg-teal/20 blur-[120px] rounded-full opacity-50 animate-pulse" />

                            <div className="relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-1 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] group transition-all duration-1000 overflow-hidden"
                                style={{ perspective: "1000px" }}>
                                <motion.div
                                    whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-[2.8rem] overflow-hidden"
                                    style={{
                                        maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
                                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
                                    }}
                                >
                                    <Image
                                        src="/tracking-cloud.png"
                                        alt="Karangué221 Supervision Platform"
                                        width={1400}
                                        height={800}
                                        className="w-full h-auto object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. SAMA KARANGUÉ EXPERIENCE */}
            <section className="py-40 bg-zinc-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-navy-dark/5 rounded-2xl flex items-center justify-center">
                                        <Smartphone className="w-6 h-6 text-navy-dark" />
                                    </div>
                                    <span className="text-navy-dark/40 font-black tracking-[0.4em] uppercase text-[10px]">Expérience Terrain</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-navy-dark mb-8 tracking-tighter leading-[1.1]">
                                    Sama Karangué <br />
                                    <span className="text-teal">Le Pouvoir Mobile</span>
                                </h2>
                                <p className="text-xl text-navy/60 font-medium mb-12 leading-relaxed max-w-xl">
                                    {tracking.sama.description}
                                </p>

                                <div className="space-y-4">
                                    {tracking.sama.features.items.slice(0, 4).map((f, i) => (
                                        <div key={i} className="flex items-center gap-4 text-navy-dark/70 font-bold">
                                            <CheckCircle2 className="w-5 h-5 text-teal" />
                                            <span>{f.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <Image
                                    src="/tracking-hero-v2.png"
                                    alt="Sama Karangué App Interface"
                                    width={800}
                                    height={1000}
                                    className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.1)]"
                                />
                                {/* Abstract Orbs */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal/5 blur-[120px] rounded-full -z-10" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PERFORMANCE GALLERY (Posters 1-8) */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-32">
                        <span className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Rigueur Opérationnelle</span>
                        <h2 className="text-5xl md:text-8xl font-black text-navy-dark mb-8 tracking-tighter leading-[0.9]">
                            L'Excellence <br /> en 8 Piliers
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
                        {tracking.detailedFeatures.map((feature, i) => {
                            const Icon = IconMap[feature.icon] || Shield;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="group relative flex flex-col pt-24"
                                >
                                    {/* Numbering */}
                                    <span className="absolute top-0 left-0 text-[120px] font-black text-navy-dark/5 leading-none select-none">
                                        0{i + 1}
                                    </span>

                                    {/* Poster Preview */}
                                    <div className="relative mb-12 aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-navy-dark/5">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-teal" />
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black text-navy-dark uppercase tracking-tight">{feature.title}</h3>
                                        </div>
                                        <p className="text-navy/50 font-medium leading-relaxed text-lg md:text-xl">
                                            {feature.posterText}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. TECHNICAL RIGOR - BENTO GRID */}
            <section className="py-40 bg-navy-dark relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        {/* Architecture Haute Fidélité */}
                        <div className="md:col-span-4 bg-white/5 backdrop-blur-md rounded-[3rem] p-10 border border-white/10 flex flex-col justify-between overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">Architecture <br /> Haute Fidélité</h3>
                                <p className="text-white/40 text-lg font-medium leading-relaxed">
                                    Notre infrastructure garantit une transmission de données en millisecondes, même dans les zones à faible couverture.
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 bg-gradient-to-tr from-teal to-transparent rounded-full blur-3xl" />
                        </div>

                        {/* Black Box Local */}
                        <div className="md:col-span-4 bg-teal rounded-[3rem] p-10 flex flex-col items-center justify-center text-center text-white min-h-[400px]">
                            <Database className="w-16 h-16 mb-6 text-white" />
                            <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">Black Box Local</h4>
                            <p className="font-bold opacity-80 text-lg">Stockage sécurisé jusqu'à 30 jours sans connexion.</p>
                        </div>

                        {/* RGPD Compliance */}
                        <div className="md:col-span-4 bg-white/5 backdrop-blur-md rounded-[3rem] p-10 border border-white/10 flex flex-col items-center justify-center text-center">
                            <Shield className="w-16 h-16 mb-6 text-teal" />
                            <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">RGPD Compliance</h4>
                            <p className="text-white/40 font-bold text-lg">Sécurité des données personnelles certifiée.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FINAL CTA - PRECISION CONTACT */}
            <section className="py-64 bg-white text-center relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-9xl font-black text-navy-dark mb-12 leading-[0.8] tracking-tighter">
                            Prenez le Contrôle<br />
                            <span className="text-teal underline decoration-navy-dark/5 underline-offset-[20px]">Dès Aujourd'hui.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-20">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="h-24 px-16 text-xl bg-navy-dark hover:bg-navy-light text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 group flex items-center justify-center">
                                    <span>{tracking.finalCta.ctaPrimary}</span>
                                    <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform shrink-0" />
                                </Button>
                            </Link>
                            <Link href="tel:+221787864848" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="h-24 px-16 text-xl border-navy-dark/10 text-navy-dark rounded-2xl font-black uppercase tracking-widest hover:bg-navy-dark hover:text-white transition-all">
                                    Appeler un expert
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Canvas */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal via-transparent to-transparent" />
                </div>
            </section>

        </main>
    );
}
