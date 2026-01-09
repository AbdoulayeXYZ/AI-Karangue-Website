"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail } from "lucide-react";

export const Newsletter = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy-dark rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-navy-dark to-navy rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/20 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-teal/10 rounded-2xl mb-8">
                                    <Mail className="w-10 h-10 text-teal" />
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                    Restez à la pointe de <br className="hidden md:block" />
                                    <span className="text-teal">l'innovation</span>
                                </h2>

                                <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Recevez nos dernières actualités, études de cas et conseils d'experts pour optimiser votre flotte.
                                </p>
                            </div>

                            <form
                                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const input = form.elements[0] as HTMLInputElement;
                                    const email = input.value;
                                    const btn = form.querySelector('button') as HTMLButtonElement;

                                    if (!email) return;

                                    const originalText = btn.innerHTML;
                                    btn.disabled = true;
                                    btn.innerText = "Inscription...";

                                    try {
                                        const res = await fetch("/api/newsletter/subscribe", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ email, source: "newsletter_section" }),
                                        });

                                        if (res.ok) {
                                            input.value = "";
                                            btn.innerText = "Merci de votre inscription !";
                                            setTimeout(() => btn.innerHTML = originalText, 3000);
                                        } else {
                                            btn.innerText = "Erreur";
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        btn.innerText = "Erreur";
                                    } finally {
                                        setTimeout(() => {
                                            btn.disabled = false;
                                            if (btn.innerText === "Erreur") btn.innerHTML = originalText;
                                        }, 3000);
                                    }
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="votre.email@entreprise.com"
                                    className="flex-1 h-16 px-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium text-lg"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="h-16 px-10 bg-teal hover:bg-teal-light text-white rounded-2xl font-black uppercase tracking-wider text-sm shadow-2xl shadow-teal/30 hover:shadow-teal/50 transition-all flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    S'abonner
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>

                            <p className="text-center text-sm text-white/40 font-medium">
                                🔒 Vos données sont sécurisées. Désabonnement possible à tout moment.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
