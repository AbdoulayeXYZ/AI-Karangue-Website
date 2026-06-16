"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Eye, AlertTriangle, Shield, Smartphone, MapPin, Bell,
    BarChart3, Video, ArrowRight, CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 : DASHCAM IA — PRODUCT SHOWCASE
// ─────────────────────────────────────────────────────────────────────────────
const ProductShowcase = () => (
    <section className="bg-navy-dark relative overflow-hidden py-28 lg:py-44">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-teal/[0.06] rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">

            {/* Header */}
            <div className="text-center mb-24 lg:mb-36">
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl lg:text-[7.5vw] font-black text-white tracking-tighter leading-[0.92] mb-6"
                >
                    Un boitier.<br />
                    <span className="text-teal">Deux modules.</span><br />
                    Une protection totale.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                    className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    Installe sur ton pare-brise en 15 minutes. Actif a chaque trajet.
                    L'intelligence artificielle embarquee qui veille sur toi et ta route.
                </motion.p>
            </div>

            {/* 3-col: DSC | Product | ADAS */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] gap-12 lg:gap-8 items-center mb-20 lg:mb-28">

                {/* DSC */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                            <Eye className="w-5 h-5 text-teal" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-teal/60 tracking-widest uppercase">Module 01</div>
                            <div className="text-white font-black text-xl tracking-tight">DSC</div>
                        </div>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed pl-4 border-l border-teal/20">
                        Comportement conducteur. L'IA surveille ta vigilance en temps reel pour te proteger avant le danger.
                    </p>
                    <ul className="space-y-3.5">
                        {[
                            "Detection somnolence et fatigue",
                            "Alerte telephone au volant",
                            "Verification port de ceinture",
                            "Identification conducteur IA",
                        ].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/50 group">
                                <CheckCircle2 className="w-4 h-4 text-teal/50 mt-0.5 shrink-0 group-hover:text-teal transition-colors" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Center product image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative mx-auto w-full max-w-xs lg:max-w-none"
                >
                    {/* Glow rings */}
                    <div className="absolute inset-0 rounded-full border border-teal/10 scale-110 animate-pulse" style={{ animationDuration: "3s" }} />
                    <div className="absolute inset-0 rounded-full border border-teal/[0.05] scale-[1.3]" />
                    <div className="absolute inset-[15%] bg-teal/[0.08] rounded-full blur-3xl" />

                    <div className="relative aspect-square">
                        <Image
                            src="/dashcamia.png"
                            alt="DASHCAM IA Streamax"
                            fill
                            className="object-contain drop-shadow-[0_0_80px_rgba(0,128,128,0.3)] scale-[1.15]"
                        />
                    </div>

                </motion.div>

                {/* ADAS */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5 text-teal" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-teal/60 tracking-widest uppercase">Module 02</div>
                            <div className="text-white font-black text-xl tracking-tight">ADAS</div>
                        </div>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed pl-4 border-l border-teal/20">
                        Comportement de conduite. L'IA lit ta route et anticipe les collisions avant qu'elles arrivent.
                    </p>
                    <ul className="space-y-3.5">
                        {[
                            "Alerte collision frontale (FCW)",
                            "Detection sortie de voie (LDW)",
                            "Protection pietons et obstacles",
                            "Lecture panneaux de vitesse",
                        ].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/50 group">
                                <CheckCircle2 className="w-4 h-4 text-teal/50 mt-0.5 shrink-0 group-hover:text-teal transition-colors" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Stats strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] rounded-3xl overflow-hidden border border-white/[0.06]"
            >
                {[
                    { value: "99.2%", label: "Precision IA" },
                    { value: "0.05s", label: "Temps de reaction" },
                    { value: "15 min", label: "Installation" },
                    { value: "24h/24", label: "Protection active" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] hover:bg-white/[0.06] transition-colors px-6 lg:px-10 py-8 text-center">
                        <div className="text-3xl lg:text-4xl font-black text-teal mb-1.5 tracking-tighter">{stat.value}</div>
                        <div className="text-white/25 text-[10px] font-bold tracking-[0.2em] uppercase">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 : DASHCAM ON VEHICLE — cinematic full-bleed
// ─────────────────────────────────────────────────────────────────────────────
const DashcamOnVehicle = () => (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
            src="/DashcamiaOnVehicle.png"
            alt="DASHCAM IA installee sur ton vehicule"
            fill
            className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-xl">
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-8 block"
                >
                    VU DE TON VEHICULE
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6"
                >
                    Discret.<br />
                    <span className="text-teal">Toujours actif.</span><br />
                    Jamais seul.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                    className="text-white/50 text-lg mb-10 leading-relaxed"
                >
                    La DASHCAM IA se fixe sur ton pare-brise en quelques minutes.
                    Nos techniciens se deplacent chez toi, partout au Senegal.
                    Installation incluse dans ton abonnement.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <Link href="/contact">
                        <button className="h-14 px-10 bg-teal text-white rounded-2xl font-black tracking-[0.15em] uppercase text-[10px] hover:bg-teal/80 transition-all duration-300 flex items-center gap-4 group shadow-xl shadow-teal/20">
                            Souscrire maintenant
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <p className="text-white/30 text-xs font-medium">
                        Sans engagement. Resiliable a tout moment.
                    </p>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 : PLATFORM — Karangue221
// ─────────────────────────────────────────────────────────────────────────────
const PlatformSection = () => (
    <section className="bg-white overflow-hidden py-28 lg:py-44">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Screenshot */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative order-2 lg:order-1"
                >
                    <Image
                        src="/AIKaranguePlateforme.png"
                        alt="Plateforme Karangue221 — video + carte en direct"
                        width={800}
                        height={550}
                        className="w-full h-auto"
                    />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                >
                    <span className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
                        LA PLATEFORME KARANGUE221
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-navy-dark tracking-tighter leading-[0.88] mb-6">
                        Ton vehicule.<br />
                        <span className="text-teal">En temps reel.</span><br />
                        Partout.
                    </h2>
                    <p className="text-navy/50 text-lg mb-10 leading-relaxed">
                        Ton compte s'active automatiquement apres l'installation.
                        Acces immediat depuis ton navigateur ou smartphone.
                        Alertes instantanees, historique complet, score de conduite.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-10">
                        {[
                            { icon: MapPin, label: "GPS Temps Reel" },
                            { icon: Bell, label: "Alertes Instantanees" },
                            { icon: Video, label: "Video HD Cloud" },
                            { icon: BarChart3, label: "Score de Conduite" },
                            { icon: Shield, label: "Protection 24h/24" },
                            { icon: Smartphone, label: "App iOS et Android" },
                        ].map(({ icon: Icon, label }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.06 * i }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 bg-zinc-50 rounded-xl p-3.5 border border-navy/5 hover:border-teal/30 hover:bg-teal/[0.03] transition-all duration-300 group"
                            >
                                <div className="w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-teal/20 transition-colors">
                                    <Icon className="w-4 h-4 text-teal" />
                                </div>
                                <span className="text-xs font-black text-navy-dark">{label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <Link href="/solutions">
                        <button className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-navy-dark/40 hover:text-teal transition-colors group">
                            Decouvrir la plateforme
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 : APP MOBILE
// ─────────────────────────────────────────────────────────────────────────────
const AppMobileSection = () => (
    <section className="bg-navy-dark overflow-hidden py-28 lg:py-44 relative">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-teal/[0.05] rounded-full blur-[130px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <span className="text-teal font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
                        L'APPLICATION DANS TA POCHE
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.88] mb-6">
                        Surveille ton vehicule<br />
                        <span className="text-teal">depuis ton telephone.</span>
                    </h2>
                    <p className="text-white/40 text-lg mb-12 leading-relaxed">
                        Karangue221 te donne une visibilite totale sur ton vehicule.
                        Video en direct, carte temps reel, alertes push immediates.
                        Accessible 24h/24 depuis n'importe ou au Senegal.
                    </p>

                    <div className="space-y-5 mb-12">
                        {[
                            { step: "01", title: "Carte en temps reel", desc: "Position exacte de ton vehicule, historique de trajets" },
                            { step: "02", title: "Video 4 cameras en direct", desc: "Interieur, route avant, angles en HD" },
                            { step: "03", title: "Alertes push instantanees", desc: "Notification en cas d'incident detecte par l'IA" },
                            { step: "04", title: "Rapports de conduite", desc: "Score hebdomadaire, conseils de securite personnalises" },
                        ].map(({ step, title, desc }, i) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 * i }}
                                viewport={{ once: true }}
                                className="flex gap-5 group"
                            >
                                <div className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-teal text-[10px] font-black shrink-0 group-hover:bg-teal group-hover:border-teal transition-all duration-300 group-hover:text-white">
                                    {step}
                                </div>
                                <div>
                                    <div className="text-white font-black text-sm mb-0.5 group-hover:text-teal transition-colors">{title}</div>
                                    <div className="text-white/25 text-xs leading-relaxed">{desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <Link href="/contact">
                        <button className="h-14 px-10 bg-teal text-white rounded-2xl font-black tracking-[0.15em] uppercase text-[10px] hover:bg-teal/80 transition-all duration-300 flex items-center gap-4 group shadow-xl shadow-teal/20">
                            Commencer maintenant
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>

                {/* App screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="absolute inset-0 bg-teal/[0.08] blur-[80px] rounded-full scale-75" />
                    <div className="relative w-60 lg:w-72 xl:w-80">
                        <Image
                            src="/AIKaranguéAPP.png"
                            alt="Application Karangue221 — surveillance vehicule"
                            width={400}
                            height={820}
                            className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 : PERSONA — The driver
// ─────────────────────────────────────────────────────────────────────────────
const PersonaSection = () => (
    <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <Image
            src="/persona.jpeg"
            alt="Conducteur protege par AI-Karangue"
            fill
            className="object-cover object-[center_30%]"
        />
        {/* Gradient leger uniquement en bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />

        <div className="container mx-auto px-6 relative z-10 pb-16 lg:pb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
            >
                <div>
                    <p className="text-white/50 text-xs font-bold tracking-[0.3em] uppercase mb-3">Mamadou D. — Transporteur, Dakar</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.0]">
                        Protege chaque trajet.<br />
                        <span className="text-teal">A partir de 9.900 F/mois.</span>
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Link href="/contact">
                        <button className="h-16 px-10 bg-teal text-white rounded-2xl font-black tracking-[0.15em] uppercase text-[10px] hover:bg-teal/80 transition-all duration-300 flex items-center gap-4 group shadow-xl shadow-teal/30">
                            Souscrire maintenant
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export const HomeB2CSections = () => (
    <>
        <ProductShowcase />
        <DashcamOnVehicle />
        <PlatformSection />
        <AppMobileSection />
        <PersonaSection />
    </>
);
