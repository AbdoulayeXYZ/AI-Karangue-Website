"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { SiteContent } from "@/lib/content";
import {
    Shield, Heart, TrendingDown, Clock, DollarSign, AlertTriangle,
    MapPin, Fuel, Wrench, Users, Video, Thermometer,
    Scale, BarChart3, Zap, CheckCircle2, ArrowRight,
    Eye, Brain, Camera, Star, Package, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SolutionsClientProps {
    content: SiteContent;
}

export default function SolutionsClient({ content }: SolutionsClientProps) {
    return (
        <main className="min-h-screen bg-white selection:bg-teal selection:text-white overflow-hidden">
            <Navbar />

            {/* Hero - The Promise */}
            <section className="relative min-h-screen flex items-center justify-center bg-navy-dark pt-20 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/hero.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/60 to-white" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h1 className="text-6xl md:text-[10rem] font-black text-white tracking-tighter mb-12 leading-[0.85]">
                            La Plateforme<br /><span className="text-teal">Karangué221</span>
                        </h1>


                        <p className="text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto font-medium mb-12 leading-relaxed">
                            La solution IoT + IA qui transforme votre flotte en <span className="text-white font-black">actif stratégique sécurisé et rentable.</span>
                        </p>


                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/#roi-calculator">
                                <Button size="lg" className="h-16 px-12 text-lg bg-teal hover:bg-teal-light shadow-2xl shadow-teal/20 flex items-center gap-3">
                                    <span>Calculer mon ROI</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="h-16 px-12 text-lg border-white/20 text-white hover:bg-white hover:text-navy-dark">
                                    {content.solutions.hero.ctaSecondary}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ArrowRight className="rotate-90 text-white/30 w-8 h-8" />
                </div>
            </section>

            {/* Value Demonstration - Why You Need This */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-6 block">Votre Réalité Actuelle</span>
                        <h2 className="text-5xl md:text-7xl font-black text-navy-dark mb-8 tracking-tight leading-tight">
                            Chaque jour sans <span className="text-teal">Karangué221</span> vous coûte.
                        </h2>
                        <p className="text-xl text-navy/60 font-medium">
                            Les gestionnaires de flotte perdent en moyenne <span className="text-navy-dark font-black">30% de leur budget</span> en inefficacités évitables.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        {/* Save Lives */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-50 border border-navy/5 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:border-teal/20 transition-all duration-500 group"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/save-lives.png"
                                    alt="Driver Safety"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-navy-dark/20 group-hover:bg-transparent transition-all duration-500" />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                    <Heart className="w-8 h-8 text-teal" />
                                </div>
                            </div>

                            <div className="p-10">
                                <h3 className="text-3xl font-black text-navy-dark mb-4">Sauver des Vies</h3>
                                <p className="text-navy/60 font-medium mb-8 leading-relaxed">
                                    <span className="text-navy-dark font-bold">Sans AI-Karangué</span> : Accidents évitables, fatigue non détectée, comportements à risque invisibles.
                                </p>
                                <div className="bg-white rounded-2xl p-6 mb-8 border border-navy/5 shadow-inner">
                                    <p className="text-sm font-black text-teal mb-4 uppercase tracking-wider">AVEC KARANGUÉ221</p>
                                    <ul className="space-y-3">
                                        {[
                                            "Détection somnolence IA",
                                            "Alertes collision imminente",
                                            "Scoring comportemental",
                                            "Preuves vidéo 360°"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-navy-dark/80">
                                                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center justify-between border-t border-navy/5 pt-6">
                                    <div className="text-left">
                                        <p className="text-4xl font-black text-navy-dark">-40%</p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">D'accidents</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Save Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-50 border border-navy/5 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:border-teal/20 transition-all duration-500 group"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/save-time.png"
                                    alt="Fleet Efficiency"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-navy-dark/20 group-hover:bg-transparent transition-all duration-500" />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                    <Clock className="w-8 h-8 text-teal" />
                                </div>
                            </div>

                            <div className="p-10">
                                <h3 className="text-3xl font-black text-navy-dark mb-4">Gagner du Temps</h3>
                                <p className="text-navy/60 font-medium mb-8 leading-relaxed">
                                    <span className="text-navy-dark font-bold">Sans AI-Karangué</span> : Gestion manuelle, rapports Excel, recherche d'informations, temps perdu.
                                </p>
                                <div className="bg-white rounded-2xl p-6 mb-8 border border-navy/5 shadow-inner">
                                    <p className="text-sm font-black text-teal mb-4 uppercase tracking-wider">AVEC KARANGUÉ221</p>
                                    <ul className="space-y-3">
                                        {[
                                            "Visibilité flotte en 1 clic",
                                            "Rapports automatisés",
                                            "Alertes instantanées",
                                            "Maintenance prédictive"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-navy-dark/80">
                                                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center justify-between border-t border-navy/5 pt-6">
                                    <div className="text-left">
                                        <p className="text-4xl font-black text-navy-dark">10h</p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Économisées / sem</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Save Money */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-50 border border-navy/5 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:border-teal/20 transition-all duration-500 group"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/save-money.png"
                                    alt="Cost Savings"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-navy-dark/20 group-hover:bg-transparent transition-all duration-500" />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                    <DollarSign className="w-8 h-8 text-teal" />
                                </div>
                            </div>

                            <div className="p-10">
                                <h3 className="text-3xl font-black text-navy-dark mb-4">Réduire les Coûts</h3>
                                <p className="text-navy/60 font-medium mb-8 leading-relaxed">
                                    <span className="text-navy-dark font-bold">Sans AI-Karangué</span> : Vols de carburant, surconsommation, pannes coûteuses.
                                </p>
                                <div className="bg-white rounded-2xl p-6 mb-8 border border-navy/5 shadow-inner">
                                    <p className="text-sm font-black text-teal mb-4 uppercase tracking-wider">AVEC KARANGUÉ221</p>
                                    <ul className="space-y-3">
                                        {[
                                            "Stop vol carburant (FLS)",
                                            "Optimisation consommation",
                                            "Réduction maintenance",
                                            "Baisse primes assurance"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-navy-dark/80">
                                                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex items-center justify-between border-t border-navy/5 pt-6">
                                    <div className="text-left">
                                        <p className="text-4xl font-black text-navy-dark">3.5x</p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Retour sur Invest.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Platform Capabilities - How It Works */}
            <section className="py-32 bg-zinc-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-6 block">Plateforme SaaS Complète</span>
                        <h2 className="text-5xl md:text-7xl font-black text-navy-dark mb-8 tracking-tight leading-tight">
                            Tout ce dont vous avez besoin. <span className="text-teal">En un seul endroit.</span>
                        </h2>
                        <p className="text-xl text-navy/60 font-medium">
                            Karangué221 centralise l'ensemble de vos opérations de flotte dans une interface intuitive et puissante.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Localisation & Tracking",
                                features: [
                                    "GPS temps réel haute précision",
                                    "Historique trajets illimité",
                                    "Rapports de parcours détaillés",
                                    "Notifications entrée/sortie zones"
                                ],
                                impact: "Optimisation routes, sécurité flotte"
                            },
                            {
                                icon: Fuel,
                                title: "Gestion Carburant",
                                features: [
                                    "Contrôle niveau FLS (99% précision)",
                                    "Monitoring consommation par trajet",
                                    "Détection & prévention vols",
                                    "Analytics économies carburant"
                                ],
                                impact: "Réduction coûts carburant -15%"
                            },
                            {
                                icon: Wrench,
                                title: "Maintenance Prédictive",
                                features: [
                                    "Intervalles service automatiques",
                                    "Rapports usure & kilométrage",
                                    "Alertes maintenance préventive",
                                    "Historique interventions"
                                ],
                                impact: "Contrôle coûts, moins de pannes"
                            },
                            {
                                icon: Users,
                                title: "Comportement Conducteur",
                                features: [
                                    "Eco-driving scoring personnalisé",
                                    "Analytics comportements à risque",
                                    "Identification conducteur (iButton/RFID)",
                                    "Rapports performance individuels"
                                ],
                                impact: "Conduite sûre, -12% consommation"
                            },
                            {
                                icon: Video,
                                title: "Vidéo Intelligence",
                                features: [
                                    "Streaming live multi-caméras",
                                    "Enregistrements basés événements",
                                    "Archive Cloud sécurisée",
                                    "Preuves légales horodatées"
                                ],
                                impact: "Protection juridique, résolution litiges"
                            },
                            {
                                icon: Package,
                                title: "Sécurité Cargaison",
                                features: [
                                    "Tracking marchandises en transit",
                                    "Capteurs portes & ouvertures",
                                    "Alertes accès non autorisé",
                                    "Rapports livraisons"
                                ],
                                impact: "Prévention pertes financières"
                            },
                            {
                                icon: Thermometer,
                                title: "Monitoring Température",
                                features: [
                                    "Capteurs température en continu",
                                    "Rapports conformité chaîne froid",
                                    "Alertes dépassement seuils",
                                    "Traçabilité produits sensibles"
                                ],
                                impact: "Qualité préservée, conformité"
                            },
                            {
                                icon: Scale,
                                title: "Contrôle Charge Essieux",
                                features: [
                                    "Capteurs poids en temps réel",
                                    "Rapports charge par essieu",
                                    "Alertes surcharge",
                                    "Prévention amendes"
                                ],
                                impact: "Éviter pertes liées amendes"
                            },
                            {
                                icon: BarChart3,
                                title: "Business Intelligence",
                                features: [
                                    "Dashboards personnalisables",
                                    "Intégration ERP/API",
                                    "Rapports automatisés sur-mesure",
                                    "Export données (Excel/PDF)"
                                ],
                                impact: "Décisions data-driven, efficacité"
                            }
                        ].map((module, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-3xl p-8 border border-navy/5 hover:border-teal/30 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-navy-dark rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal transition-colors shadow-lg">
                                    <module.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-navy-dark mb-4">{module.title}</h3>
                                <ul className="space-y-2 mb-6">
                                    {module.features.map((feature, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-navy/70 font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-4 border-t border-navy/5">
                                    <p className="text-xs font-black text-teal uppercase tracking-wider">Impact Business</p>
                                    <p className="text-sm font-bold text-navy-dark mt-1">{module.impact}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hardware Enablers - In-Vehicle Experience */}
            <section className="py-32 bg-navy-dark text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-8 block">Immersion Technologique</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-none">
                            La sécurité <span className="text-teal">vue de l'intérieur.</span>
                        </h2>
                        <p className="text-xl text-white/60 font-medium max-w-3xl mx-auto leading-relaxed">
                            Découvrez nos trois piliers technologiques Teltonika intégrés nativement à Karangué221 pour une sécurité absolue.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {/* 1. DSM */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:border-teal/30 transition-all duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative min-h-[500px] lg:h-full">
                                    <Image src="/VUEDSM.png" alt="Vue DSM Conducteur" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 to-transparent lg:hidden" />
                                </div>
                                <div className="p-10 lg:p-20 flex flex-col justify-center">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="bg-white p-3 rounded-2xl shadow-lg shadow-teal/10 border border-teal/10 relative w-20 h-20 flex items-center justify-center">
                                            <Image src="/device-dsm.png" alt="DSM Device" width={64} height={64} className="object-contain" />
                                        </div>
                                        <div>
                                            <span className="text-teal font-black text-xs tracking-[0.2em] uppercase block mb-2">Surveillance Conducteur</span>
                                            <h3 className="text-4xl font-black tracking-tight text-white">DSM</h3>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <p className="text-lg text-white/70 font-medium leading-relaxed">
                                            Un système d'intelligence artificielle qui scanne le visage du conducteur en temps réel pour détecter les <span className="text-white font-bold">signes de fatigue</span> et les <span className="text-white font-bold">distractions</span>.
                                        </p>
                                    </div>

                                    <div className="mb-10">
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                            <h5 className="text-teal font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4" /> Bénéfices Karangué221
                                            </h5>
                                            <ul className="space-y-3 text-sm text-white/80 font-medium grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Détection fatigue & somnolence</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Alerte distraction (téléphone)</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Vérification port de ceinture</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Preuve vidéo comportementale</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Link href="/contact" className="w-full">
                                        <Button className="w-full bg-teal hover:bg-teal-light text-white font-bold h-16 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-between px-8 group-hover:scale-[1.02] transition-transform duration-300">
                                            <span className="text-lg">Voir le DSM en action</span>
                                            <div className="bg-white/20 p-2 rounded-full">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. ADAS */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:border-teal/30 transition-all duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-10 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="bg-white p-3 rounded-2xl shadow-lg shadow-teal/10 border border-teal/10 relative w-20 h-20 flex items-center justify-center">
                                            <Image src="/device-adas.png" alt="ADAS Device" width={64} height={64} className="object-contain" />
                                        </div>
                                        <div>
                                            <span className="text-teal font-black text-xs tracking-[0.2em] uppercase block mb-2">Assistance Route</span>
                                            <h3 className="text-4xl font-black tracking-tight text-white">ADAS</h3>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <p className="text-lg text-white/70 font-medium leading-relaxed">
                                            Une caméra savante qui lit la route devant le véhicule. Elle anticipe les dangers et alerte le conducteur via le <span className="text-teal font-bold">Coach Conduite</span> avant l'impact.
                                        </p>
                                    </div>

                                    <div className="mb-10">
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                            <h5 className="text-teal font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4" /> Bénéfices Karangué221
                                            </h5>
                                            <ul className="space-y-3 text-sm text-white/80 font-medium grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Alerte collision frontale (FCW)</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Alerte sortie de voie (LDW)</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Détection piétons & obstacles</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Lecture panneaux vitesse</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Link href="/contact" className="w-full">
                                        <Button className="w-full bg-teal hover:bg-teal-light text-white font-bold h-16 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-between px-8 group-hover:scale-[1.02] transition-transform duration-300">
                                            <span className="text-lg">Découvrir l'ADAS</span>
                                            <div className="bg-white/20 p-2 rounded-full">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                                <div className="relative min-h-[500px] lg:h-full order-1 lg:order-2">
                                    <Image src="/VUEADAS.png" alt="Vue ADAS Route" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-l from-navy-dark/90 to-transparent lg:hidden" />
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. DualCam */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:border-teal/30 transition-all duration-500"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative min-h-[500px] lg:h-full">
                                    <Image src="/VUEDUALCAM.png" alt="Vue DualCam" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 to-transparent lg:hidden" />
                                </div>
                                <div className="p-10 lg:p-20 flex flex-col justify-center">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="bg-white p-3 rounded-2xl shadow-lg shadow-teal/10 border border-teal/10 relative w-20 h-20 flex items-center justify-center">
                                            <Image src="/device-dualcam.png" alt="DualCam Device" width={64} height={64} className="object-contain" />
                                        </div>
                                        <div>
                                            <span className="text-teal font-black text-xs tracking-[0.2em] uppercase block mb-2">Preuve Vidéo</span>
                                            <h3 className="text-4xl font-black tracking-tight text-white">DualCam</h3>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <p className="text-lg text-white/70 font-medium leading-relaxed">
                                            Un système double objectif connectés qui filme simultanément la route et l'habitacle. Les séquences d'incidents sont automatiquement envoyées sur le <span className="text-white font-bold">cloud Karangué221</span>.
                                        </p>
                                    </div>

                                    <div className="mb-10">
                                        <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                                            <h5 className="text-teal font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                <CheckCircle2 className="w-4 h-4" /> Bénéfices Karangué221
                                            </h5>
                                            <ul className="space-y-3 text-sm text-white/80 font-medium grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Preuve irréfutable (fraude/accident)</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Exonération conducteur (non-responsable)</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Formation par l'image</li>
                                                <li className="flex items-start gap-2"><div className="w-1 h-1 bg-teal rounded-full mt-2"></div>Protection contre vol marchandise</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Link href="/contact" className="w-full">
                                        <Button className="w-full bg-teal hover:bg-teal-light text-white font-bold h-16 rounded-2xl shadow-xl shadow-teal/20 flex items-center justify-between px-8 group-hover:scale-[1.02] transition-transform duration-300">
                                            <span className="text-lg">Voir les preuves DualCam</span>
                                            <div className="bg-white/20 p-2 rounded-full">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center mt-32 p-12 bg-white/5 rounded-[3rem] border border-white/10 max-w-5xl mx-auto backdrop-blur-xl">
                        <h3 className="text-3xl font-black mb-12">Un Écosystème Connecté</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                            {/* Connecting Line (hidden on mobile) */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal/30 to-transparent -translate-y-full"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-navy-dark border border-teal/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal/10">
                                    <ShieldCheck className="w-8 h-8 text-teal" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-3">Sécurité Active</h4>
                                <p className="text-white/50 text-sm leading-relaxed">Détection des risques avant l'accident (DSM + ADAS)</p>
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-navy-dark border border-teal/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal/10">
                                    <Video className="w-8 h-8 text-teal" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-3">Preuve Différée</h4>
                                <p className="text-white/50 text-sm leading-relaxed">Documentation vidéo cloud des incidents (DualCam)</p>
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-navy-dark border border-teal/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal/10">
                                    <TrendingDown className="w-8 h-8 text-teal" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-3">Résultat Mesurable</h4>
                                <p className="text-white/50 text-sm leading-relaxed">-50% d'accidents en année 1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Detail Section - "Le Cerveau" */}
            <section className="py-40 bg-zinc-50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-teal font-black tracking-[0.3em] uppercase text-xs mb-8 block">Le Cerveau des Opérations</span>
                            <h2 className="text-5xl md:text-7xl font-black text-navy-dark mb-8 tracking-tighter leading-none">
                                Pilotez tout depuis <br /><span className="text-teal">une interface unique.</span>
                            </h2>
                            <p className="text-2xl text-navy-dark/60 font-medium max-w-3xl mx-auto leading-relaxed">
                                Finies les multiples plateformes. Retrouvez téléavertissement, vidéo et analyse de performance au même endroit.
                            </p>
                        </motion.div>
                    </div>

                    <div className="space-y-24">
                        {/* Feature 1: Tracking (Large Card) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] p-4 border border-zinc-100 shadow-2xl shadow-navy-dark/5"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12">
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-dark/20 group">
                                    <div className="aspect-[16/10] relative">
                                        <Image src="/tracking.png" alt="Suivi Temps Réel" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    </div>
                                    {/* Overlay UI Element */}
                                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-1000">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <div>
                                            <div className="text-xs text-navy/40 font-bold uppercase tracking-wider">Statut Flotte</div>
                                            <div className="text-navy-dark font-black">54 Véhicules Actifs</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="w-16 h-16 bg-navy-dark text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-navy-dark/20">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-4xl font-black text-navy-dark mb-6 tracking-tight">Visibilité Totale</h3>
                                    <p className="text-xl text-navy-dark/60 leading-relaxed mb-10 font-medium">
                                        Suivez vos véhicules en temps réel sur une carte interactive fluide. Historique de trajet, arrêts, et statuts moteur en un coup d'œil.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {['Position GPS Exacte', 'Replay Trajet', 'Alertes Sortie de Zone', 'Identification Chauffeur'].map((tag, i) => (
                                            <span key={i} className="bg-zinc-100 text-navy-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-teal hover:text-white transition-colors cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature 2: Dashboard (Large Card Reversed) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] p-4 border border-zinc-100 shadow-2xl shadow-navy-dark/5"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-12">
                                <div className="order-2 lg:order-1">
                                    <div className="w-16 h-16 bg-teal text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal/20">
                                        <BarChart3 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-4xl font-black text-navy-dark mb-6 tracking-tight">Décisions Data-Driven</h3>
                                    <p className="text-xl text-navy-dark/60 leading-relaxed mb-10 font-medium">
                                        Transformez vos données brutes en actions concrètes. Rapports de consommation, scores d'éco-conduite, et maintenance prédictive.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                            <span className="font-bold text-navy-dark">Score Éco-Conduite</span>
                                            <span className="font-black text-teal">94/100</span>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                            <span className="font-bold text-navy-dark">Économie Carburant</span>
                                            <span className="font-black text-teal">-15%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2 relative rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-dark/20 group">
                                    <div className="aspect-[16/10] relative">
                                        <Image src="/dashboard.png" alt="Tableau de bord" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature 3: Video & Geofencing (Bento Grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-navy-dark rounded-[3rem] overflow-hidden relative group min-h-[500px] flex flex-col"
                            >
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                                    <Image src="/video focus.png" alt="Vidéo" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent" />

                                <div className="relative z-10 p-12 mt-auto">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                                        <Video className="w-7 h-7 text-teal" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4">Vidéo à la Demande</h3>
                                    <p className="text-white/60 font-medium leading-relaxed mb-6">
                                        Accédez aux caméras en direct ou revivez les incidents passés. Preuves HD téléchargeables instantanément.
                                    </p>
                                    <Link href="/contact">
                                        <Button variant="ghost" className="text-white p-0 hover:bg-transparent hover:text-teal group-hover:translate-x-2 transition-all">
                                            {content.solutions.platformDetail.features.video.ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[3rem] border border-zinc-200 overflow-hidden relative group min-h-[500px] flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-2/3 h-2/3 opacity-10 rounded-bl-full bg-teal translate-x-1/3 -translate-y-1/3 blur-3xl" />

                                <div className="p-12 relative z-10">
                                    <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-6">
                                        <ShieldCheck className="w-7 h-7 text-teal" />
                                    </div>
                                    <h3 className="text-3xl font-black text-navy-dark mb-4">Geofencing Intelligent</h3>
                                    <p className="text-navy-dark/60 font-medium leading-relaxed mb-8">
                                        Définissez des zones autorisées (dépôts, clients) ou interdites. Soyez alerté instantanément par email/SMS.
                                    </p>
                                    <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 relative overflow-hidden">
                                        <div className="aspect-video relative rounded-xl overflow-hidden shadow-inner">
                                            <Image src="/geofencing.png" alt="Geofencing Map" fill className="object-cover" />
                                        </div>
                                        <div className="flex items-center gap-3 mt-4 text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-lg w-fit">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                            Alerte: Sortie de Zone
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Final CTA High-Fashion Brand Closing */}
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
                        <h2 className="text-6xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mb-16">
                            Prêt à transformer <br /> <span className="text-teal">votre flotte ?</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-xl mx-auto">
                            Rejoignez les gestionnaires qui ont choisi la sérénité opérationnelle avec Karangué221.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <Link href="/contact">
                                <Button size="lg" className="h-20 px-12 text-xl bg-teal text-white hover:scale-105 transition-transform shadow-2xl shadow-teal/20">
                                    Calculer mon ROI
                                    <ArrowRight className="inline-block ml-3" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="h-20 px-12 text-xl border-white/10 text-white hover:bg-white hover:text-navy-dark transition-all">
                                    Demander une démo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer content={content.footer} />
        </main>
    );
}
