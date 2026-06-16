"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, AlertTriangle, Shield, Smartphone, Play } from "lucide-react";
import { SiteContent } from "@/lib/content";

// ─────────────────────────────────────────────────────────────────────────────
// DSC FEATURES
// ─────────────────────────────────────────────────────────────────────────────
const DSC_FEATURES = [
    {
        id: "somnolence",
        label: "Somnolence",
        title: "Somnolence detectee",
        description: "L'IA mesure la fermeture des paupieres et la frequence de clignement. Alerte sonore immediate avant que le conducteur ne perde le controle.",
        image: "/dscSomnolence.jpeg",
    },
    {
        id: "yawning",
        label: "Baillement",
        title: "Baillement detecte",
        description: "Un baillement repete est le premier signe de fatigue profonde. Le systeme declenche une alerte bien avant que les reflexes ne s'alterent.",
        image: "/dscYawning.jpeg",
    },
    {
        id: "drowsiness",
        label: "Fatigue",
        title: "Fatigue extreme",
        description: "Tete penchee, yeux mi-clos, micro-sommeils. L'IA detecte les signaux que le conducteur lui-meme ne percoit plus.",
        image: "/dscDownsiness.jpeg",
    },
    {
        id: "distraction",
        label: "Distraction",
        title: "Regard detourne",
        description: "Les yeux quittent la route plus de 2 secondes : l'alerteretentit. 90% des accidents impliquent une inattention d'une seconde ou moins.",
        image: "/dscDistraction.jpeg",
    },
    {
        id: "phone",
        label: "Telephone",
        title: "Telephone au volant",
        description: "La camera frontale identifie l'utilisation d'un telephone en temps reel. Preuve video horodatee, transmise instantanement sur la plateforme.",
        image: "/dscPhoneUse.jpeg",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADAS FEATURES
// ─────────────────────────────────────────────────────────────────────────────
const ADAS_FEATURES = [
    {
        id: "fcw",
        label: "FCW",
        title: "Collision frontale",
        description: "Forward Collision Warning. La camera ADAS calcule la distance et la vitesse de rapprochement avec le vehicule devant. Alerte 2,5 secondes avant l'impact potentiel.",
        stat: "2.5s",
        statLabel: "avant l'impact",
        image: "/adasFCW.jpeg",
    },
    {
        id: "ldw",
        label: "LDW",
        title: "Sortie de voie",
        description: "Lane Departure Warning. Franchissement de ligne sans clignotant detecte instantanement. Indispensable sur les routes a voies non balisees du Senegal.",
        stat: "100%",
        statLabel: "des franchissements",
        image: "/adasLDW.png",
    },
    {
        id: "distance",
        label: "Distance",
        title: "Distance de securite",
        description: "L'IA surveille en permanence la distance inter-vehiculaire et alerte le conducteur quand il se rapproche trop du vehicule qui precede.",
        stat: "<3s",
        statLabel: "temps de reaction",
        image: "/adasDistanceDeSecutité.png",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// DSC SECTION — galerie interactive
// ─────────────────────────────────────────────────────────────────────────────
const DSCSection = () => {
    const [active, setActive] = useState(0);

    return (
        <section id="dsc" className="py-32 lg:py-40 bg-navy-dark overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-3xl mb-20 lg:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-2xl bg-teal/15 border border-teal/25 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-teal" />
                            </div>
                            <span className="text-[10px] font-black text-teal tracking-[0.4em] uppercase">Module 01 — DSC</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                            Ce que l'oeil<br />
                            <span className="text-teal">ne voit plus.</span>
                        </h2>
                        <p className="text-white/40 text-lg font-medium leading-relaxed max-w-xl">
                            La camera DSC embarquee analyse le visage du conducteur 25 fois par seconde. Elle detecte les signes de danger que le conducteur ne percoit plus lui-meme.
                        </p>
                    </motion.div>
                </div>

                {/* Interactive feature viewer */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 lg:gap-16 items-start">

                    {/* Left — tab list */}
                    <div className="space-y-3">
                        {DSC_FEATURES.map((feat, i) => (
                            <motion.button
                                key={feat.id}
                                onClick={() => setActive(i)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                viewport={{ once: true }}
                                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group ${
                                    active === i
                                        ? "bg-white/[0.06] border-teal/30"
                                        : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className={`text-[9px] font-black tracking-[0.35em] uppercase mb-1.5 transition-colors ${active === i ? "text-teal" : "text-white/30"}`}>
                                            {feat.label}
                                        </div>
                                        <div className={`font-black text-lg tracking-tight transition-colors ${active === i ? "text-white" : "text-white/50"}`}>
                                            {feat.title}
                                        </div>
                                        <AnimatePresence>
                                            {active === i && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-white/40 text-sm leading-relaxed mt-3 font-medium"
                                                >
                                                    {feat.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-colors ${active === i ? "bg-teal" : "bg-white/15"}`} />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right — feature image */}
                    <div className="lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.07]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={DSC_FEATURES[active].image}
                                        alt={DSC_FEATURES[active].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>

                            {/* Label badge */}
                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                <div className="bg-navy-dark/70 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                    <span className="text-white font-black text-sm tracking-tight">
                                        {DSC_FEATURES[active].title}
                                    </span>
                                    <span className="text-teal text-[10px] font-bold tracking-widest uppercase ml-auto">
                                        IA Active
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Dot indicators */}
                        <div className="flex items-center justify-center gap-2 mt-5">
                            {DSC_FEATURES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`transition-all duration-300 rounded-full ${
                                        active === i ? "w-6 h-1.5 bg-teal" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// ADAS SECTION — 3 cartes en alternance
// ─────────────────────────────────────────────────────────────────────────────
const ADASSection = () => (
    <section id="adas" className="py-32 lg:py-40 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-teal" />
                        </div>
                        <span className="text-[10px] font-black text-teal tracking-[0.4em] uppercase">Module 02 — ADAS</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy-dark tracking-tighter leading-[0.9] mb-6">
                        La route,<br />
                        <span className="text-teal">anticipee.</span>
                    </h2>
                    <p className="text-navy/50 text-lg font-medium leading-relaxed max-w-xl mx-auto">
                        La camera ADAS lit la route en temps reel et alerte le conducteur avant chaque situation critique. Trois scenarios, une seule regle : prevenir plutot que subir.
                    </p>
                </motion.div>
            </div>

            {/* Feature cards — alternating */}
            <div className="space-y-8 max-w-5xl mx-auto">
                {ADAS_FEATURES.map((feat, i) => (
                    <motion.div
                        key={feat.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-navy/[0.06] shadow-xl shadow-navy/5"
                    >
                        {/* Image */}
                        <div className={`relative min-h-[320px] lg:min-h-[380px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                            <Image
                                src={feat.image}
                                alt={feat.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-navy-dark/20" />
                            {/* Stat overlay */}
                            <div className="absolute top-6 left-6 bg-navy-dark/80 backdrop-blur border border-white/15 rounded-2xl px-4 py-3">
                                <div className="text-2xl font-black text-teal leading-none">{feat.stat}</div>
                                <div className="text-[9px] font-bold text-white/50 tracking-widest uppercase mt-0.5">{feat.statLabel}</div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className={`bg-zinc-50 p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                            <div className="text-[9px] font-black text-teal/70 tracking-[0.4em] uppercase mb-3">{feat.label}</div>
                            <h3 className="text-2xl md:text-3xl font-black text-navy-dark tracking-tight mb-4">{feat.title}</h3>
                            <p className="text-navy/50 text-sm leading-relaxed font-medium mb-8">{feat.description}</p>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                                <span className="text-xs font-black text-navy-dark/70 tracking-wide">Alerte sonore + notification plateforme</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM SECTION
// ─────────────────────────────────────────────────────────────────────────────
const PlatformSection = () => (
    <section id="plateforme" className="py-32 lg:py-40 bg-navy-dark overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-teal/15 border border-teal/25 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-teal" />
                        </div>
                        <span className="text-[10px] font-black text-teal tracking-[0.4em] uppercase">Plateforme — Karangue221</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                        Tout voir.<br />
                        <span className="text-teal">En temps reel.</span>
                    </h2>
                    <p className="text-white/40 text-base leading-relaxed font-medium mb-10 max-w-md">
                        Video en direct, carte GPS, alertes comportementales, historique d'incidents. Karangue221 centralise chaque signal de ta flotte dans une interface unique.
                    </p>

                    <div className="space-y-4 mb-10">
                        {[
                            "Video live + replay des incidents",
                            "Carte GPS en temps reel",
                            "Alertes DSC et ADAS instantanees",
                            "Rapports de conduite par conducteur",
                            "Historique 90 jours accessible",
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                                <span className="text-white/60 text-sm font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <Link href="/contact">
                        <button className="inline-flex items-center gap-3 bg-teal text-white font-black text-sm px-6 py-3.5 rounded-xl hover:bg-teal/90 transition-colors">
                            Demander une demo
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </motion.div>

                {/* Platform screenshot */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/50">
                        <Image
                            src="/AIKaranguePlateforme.png"
                            alt="Plateforme Karangue221 — video + carte en direct"
                            width={800}
                            height={560}
                            className="w-full h-auto"
                        />
                    </div>
                    {/* Glow */}
                    <div className="absolute -inset-8 bg-teal/10 blur-[80px] rounded-full -z-10" />
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// APP SECTION
// ─────────────────────────────────────────────────────────────────────────────
const AppSection = () => (
    <section id="app" className="py-32 lg:py-40 bg-zinc-50 overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* App screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-[260px] md:w-[300px]">
                        <div className="absolute -inset-6 bg-teal/8 blur-[60px] rounded-full" />
                        <Image
                            src="/AIKaranguéAPP.png"
                            alt="Application mobile Karangue221"
                            width={300}
                            height={620}
                            className="relative w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-teal" />
                        </div>
                        <span className="text-[10px] font-black text-teal tracking-[0.4em] uppercase">Application mobile</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-dark tracking-tighter leading-[0.9] mb-6">
                        Ta flotte<br />
                        <span className="text-teal">dans ta poche.</span>
                    </h2>
                    <p className="text-navy/50 text-base leading-relaxed font-medium mb-10 max-w-md">
                        L'application Karangue221 te notifie en temps reel des alertes de tes conducteurs. Recois les incidents, consulte les videos, et suis ta flotte depuis n'importe ou.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {[
                            { label: "Notifications push", desc: "Alertes instantanees" },
                            { label: "Video on-demand", desc: "Replay incidents" },
                            { label: "Suivi GPS live", desc: "Position en direct" },
                            { label: "Score conduite", desc: "Par chauffeur" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white border border-navy/[0.07] rounded-2xl p-4"
                            >
                                <div className="text-xs font-black text-navy-dark mb-0.5">{item.label}</div>
                                <div className="text-[10px] font-medium text-navy/40">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>

                    <Link href="/contact">
                        <button className="inline-flex items-center gap-3 bg-navy-dark text-white font-black text-sm px-6 py-3.5 rounded-xl hover:bg-navy transition-colors">
                            Tester l'application
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// INSURANCE PROOF SECTION — split : image gauche | texte droite
// ─────────────────────────────────────────────────────────────────────────────
const InsuranceSection = () => (
    <section className="bg-navy-dark overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

            {/* Image — aucun texte dessus */}
            <div className="relative min-h-[420px] lg:min-h-0">
                <Image
                    src="/insuranceproof.jpeg"
                    alt="Preuve video d'assurance — Karangue221"
                    fill
                    className="object-cover object-top"
                />
            </div>

            {/* Texte — separé de l'image */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center px-10 py-16 lg:px-16 lg:py-20 border-l border-white/[0.06]"
            >
                <span className="text-[10px] font-black text-teal tracking-[0.4em] uppercase block mb-6">Preuve irrefutable</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                    Chaque trajet,<br />
                    <span className="text-teal">une preuve.</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed font-medium mb-10 max-w-sm">
                    En cas d'accident, la video horodatee devient ta defense legale. Exoneration du conducteur non-responsable. Reduction des primes d'assurance. Fin des litiges.
                </p>
                <div className="flex flex-wrap gap-2.5">
                    {[
                        "Preuve video horodatee",
                        "Cloud securise 90 jours",
                        "Exportable en justice",
                        "Reduction prime assurance",
                    ].map((tag) => (
                        <span key={tag} className="bg-white/[0.05] border border-white/10 text-white/60 text-[10px] font-bold px-3.5 py-1.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────────────────────
const FinalCTA = () => (
    <section className="py-40 bg-navy-dark text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6">
                    La route ne previent pas.<br />
                    <span className="text-teal">Toi, si.</span>
                </h2>
                <p className="text-white/35 text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
                    A partir de 9.900 F/mois. Installation en 15 minutes. Protection immediate.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact">
                        <button className="inline-flex items-center gap-3 bg-teal text-white font-black text-sm px-8 py-4 rounded-xl hover:bg-teal/90 transition-colors shadow-lg shadow-teal/20">
                            Souscrire maintenant
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                    <Link href="/offres">
                        <button className="inline-flex items-center gap-3 border border-white/15 text-white/70 font-black text-sm px-8 py-4 rounded-xl hover:border-white/30 hover:text-white transition-all">
                            Voir les offres
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
interface SolutionsClientProps {
    content: SiteContent;
}

export default function SolutionsClient({ content: _content }: SolutionsClientProps) {
    return (
        <main className="min-h-screen bg-navy-dark selection:bg-teal selection:text-white overflow-hidden">

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-end overflow-hidden pt-20">
                <Image
                    src="/persona.jpeg"
                    alt="Conducteur protege par AI-Karangue"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-navy-dark/20" />

                <div className="container mx-auto px-6 relative z-10 pb-24 lg:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl"
                    >
                        <span className="text-[10px] font-black text-teal/80 tracking-[0.4em] uppercase block mb-6">AI-Karangue — Technologies</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.88] mb-8">
                            L'intelligence<br />
                            qui protege<br />
                            <span className="text-teal">chaque trajet.</span>
                        </h1>
                        <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                            DSC, ADAS, plateforme cloud et application mobile. Un ecosysteme complet pour que tu ne roules plus jamais sans protection.
                        </p>

                        {/* Nav rapide */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "DSC", href: "#dsc" },
                                { label: "ADAS", href: "#adas" },
                                { label: "Plateforme", href: "#plateforme" },
                                { label: "Application", href: "#app" },
                            ].map(({ label, href }) => (
                                <Link key={label} href={href}>
                                    <span className="bg-white/10 backdrop-blur border border-white/15 text-white/80 text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/15 hover:text-white transition-all cursor-pointer tracking-wide">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 right-8 z-10">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                    </motion.div>
                </div>
            </section>

            {/* ── OVERVIEW — 2 modules ── */}
            <section className="py-24 bg-navy-dark border-t border-white/[0.05]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Eye,
                                module: "Module 01",
                                name: "DSC",
                                tagline: "Driver Safety Camera",
                                desc: "Surveille le conducteur. Detecte somnolence, distraction, telephone au volant.",
                                stat: "5",
                                statLabel: "alertes en temps reel",
                                href: "#dsc",
                            },
                            {
                                icon: AlertTriangle,
                                module: "Module 02",
                                name: "ADAS",
                                tagline: "Advanced Driver Assist",
                                desc: "Surveille la route. Detecte collision frontale, sortie de voie, distance dangereuse.",
                                stat: "3",
                                statLabel: "scenarios critiques",
                                href: "#adas",
                            },
                        ].map(({ icon: Icon, module, name, tagline, desc, stat, statLabel, href }) => (
                            <Link key={name} href={href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group bg-white/[0.03] border border-white/[0.07] hover:border-teal/25 rounded-3xl p-8 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-10 h-10 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-teal" />
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-teal group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                    <div className="text-[9px] font-black text-teal/50 tracking-[0.35em] uppercase mb-1">{module}</div>
                                    <div className="text-2xl font-black text-white tracking-tight mb-1">{name}</div>
                                    <div className="text-[10px] font-bold text-white/30 tracking-widest uppercase mb-4">{tagline}</div>
                                    <p className="text-white/35 text-sm leading-relaxed font-medium mb-6">{desc}</p>
                                    <div className="pt-5 border-t border-white/[0.06]">
                                        <span className="text-3xl font-black text-teal">{stat}</span>
                                        <span className="text-white/30 text-xs font-bold ml-2 tracking-wide">{statLabel}</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DSC ── */}
            <DSCSection />

            {/* ── ADAS ── */}
            <ADASSection />

            {/* ── PLATEFORME ── */}
            <PlatformSection />

            {/* ── APP ── */}
            <AppSection />

            {/* ── INSURANCE PROOF ── */}
            <InsuranceSection />

            {/* ── FINAL CTA ── */}
            <FinalCTA />

        </main>
    );
}
