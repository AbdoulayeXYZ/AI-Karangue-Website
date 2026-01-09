"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-navy-dark selection:bg-teal selection:text-white">
            <Navbar />

            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-navy-dark/5 overflow-hidden border border-zinc-100 flex flex-col lg:flex-row">

                        {/* Left Side: Value Prop */}
                        <div className="w-full lg:w-5/12 bg-navy-dark p-12 lg:p-20 text-white relative overflow-hidden flex flex-col justify-between">
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/grid.svg')] bg-center bg-repeat opacity-[0.03]" />
                            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />

                            <div className="relative z-10">
                                <span className="text-teal font-black tracking-[0.2em] uppercase text-xs mb-8 block">Démonstration Personnalisée</span>
                                <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                                    Passez au niveau supérieur.
                                </h1>
                                <p className="text-white/60 text-lg leading-relaxed mb-12">
                                    Découvrez comment AI-Karangué transforme vos données brutes en leviers de rentabilité.
                                    Réservez une démo de 30 minutes avec un expert sectoriel.
                                </p>

                                <ul className="space-y-6 mb-12">
                                    {[
                                        "Audit gratuit de votre flotte actuelle",
                                        "Simulation de ROI en direct",
                                        "Plan de déploiement sur-mesure"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 space-y-6 mt-12 pt-12 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">Téléphone</p>
                                        <p className="font-bold">+221 77 314 70 59</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">Email</p>
                                        <p className="font-bold">contact@aikarangue.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">Siège</p>
                                        <p className="font-bold">Dakar, Sénégal</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full lg:w-7/12 p-12 lg:p-20 bg-white">
                            <h2 className="text-3xl font-black text-navy-dark mb-2">Parlons de votre projet</h2>
                            <p className="text-navy/50 mb-10">Remplissez ce formulaire, nous vous recontactons sous 24h ouvrées.</p>

                            <form
                                className="space-y-8"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const btn = form.querySelector('button') as HTMLButtonElement;
                                    const originalText = btn.innerHTML;

                                    // Gather data
                                    const firstName = (form.elements[0] as HTMLInputElement).value;
                                    const lastName = (form.elements[1] as HTMLInputElement).value;
                                    const email = (form.elements[2] as HTMLInputElement).value;
                                    const company = (form.elements[3] as HTMLInputElement).value;
                                    const fleetSize = (form.elements[4] as HTMLSelectElement).value;
                                    const message = (form.elements[5] as HTMLTextAreaElement).value;

                                    if (!firstName || !lastName || !email || !company) {
                                        alert("Veuillez remplir tous les champs obligatoires.");
                                        return;
                                    }

                                    btn.disabled = true;
                                    btn.innerText = "Envoi en cours...";

                                    try {
                                        const res = await fetch("/api/contact", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                firstName,
                                                lastName,
                                                email,
                                                company,
                                                fleetSize,
                                                message
                                            }),
                                        });

                                        if (res.ok) {
                                            form.reset();
                                            btn.innerText = "Message envoyé !";
                                            setTimeout(() => btn.innerHTML = originalText, 5000);
                                        } else {
                                            btn.innerText = "Erreur lors de l'envoi";
                                            setTimeout(() => btn.innerHTML = originalText, 3000);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        btn.innerText = "Erreur technique";
                                        setTimeout(() => btn.innerHTML = originalText, 3000);
                                    } finally {
                                        setTimeout(() => {
                                            btn.disabled = false;
                                        }, 3000);
                                    }
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Prénom *</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder="John" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Nom *</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder="Doe" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Email *</label>
                                    <input type="email" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder="john@entreprise.com" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Entreprise *</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder="Votre Société" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Taille de la flotte</label>
                                        <select className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium appearance-none">
                                            <option>1 - 10 véhicules</option>
                                            <option>11 - 50 véhicules</option>
                                            <option>51 - 200 véhicules</option>
                                            <option>200+ véhicules</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">Message (Facultatif)</label>
                                    <textarea className="w-full h-40 p-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20 resize-none" placeholder="Dites-nous en plus sur vos besoins..." />
                                </div>

                                <Button size="lg" type="submit" className="w-full h-16 text-lg bg-navy-dark text-white hover:bg-navy shadow-xl shadow-navy-dark/10 group flex items-center justify-center gap-2">
                                    Réserver ma démo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <p className="text-center text-xs text-navy/40 font-medium">
                                    En cliquant, vous acceptez notre politique de confidentialité. Vos données sont sécurisées.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
