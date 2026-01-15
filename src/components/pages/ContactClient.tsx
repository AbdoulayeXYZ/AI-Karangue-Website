"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { SiteContent } from "@/lib/content";

interface ContactClientProps {
    content: SiteContent;
}

export default function ContactClient({ content }: ContactClientProps) {
    return (
        <main className="min-h-screen bg-navy-dark selection:bg-teal selection:text-white">
            <Navbar content={content.navbar} />

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
                                <span className="text-teal font-black tracking-[0.2em] uppercase text-xs mb-8 block">{content.contact.hero.label}</span>
                                <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                                    {content.contact.hero.title}
                                </h1>
                                <p className="text-white/60 text-lg leading-relaxed mb-12">
                                    {content.contact.hero.description}
                                </p>

                                <ul className="space-y-6 mb-12">
                                    {content.contact.hero.features.map((item, i) => (
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
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">{content.contact.info.phone.label}</p>
                                        <p className="font-bold">{content.contact.info.phone.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">{content.contact.info.email.label}</p>
                                        <p className="font-bold">{content.contact.info.email.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-white/40 mb-1">{content.contact.info.address.label}</p>
                                        <p className="font-bold">{content.contact.info.address.value}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full lg:w-7/12 p-12 lg:p-20 bg-white">
                            <h2 className="text-3xl font-black text-navy-dark mb-2">{content.contact.form.title}</h2>
                            <p className="text-navy/50 mb-10">{content.contact.form.description}</p>

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
                                    btn.innerText = content.contact.form.labels.sending;

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
                                            btn.innerText = content.contact.form.labels.success;
                                            setTimeout(() => btn.innerHTML = originalText, 5000);
                                        } else {
                                            btn.innerText = content.contact.form.labels.error;
                                            setTimeout(() => btn.innerHTML = originalText, 3000);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        btn.innerText = content.contact.form.labels.error;
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
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.firstName}</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder={content.contact.form.placeholders.firstName} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.lastName}</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder={content.contact.form.placeholders.lastName} required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.email}</label>
                                    <input type="email" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder={content.contact.form.placeholders.email} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.company}</label>
                                        <input type="text" className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20" placeholder={content.contact.form.placeholders.company} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.fleetSize}</label>
                                        <select className="w-full h-14 px-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium appearance-none">
                                            {content.contact.form.labels.fleetOptions.map((opt, i) => (
                                                <option key={i}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-dark uppercase tracking-wider">{content.contact.form.labels.message}</label>
                                    <textarea className="w-full h-40 p-6 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-navy-dark font-medium placeholder:text-navy/20 resize-none" placeholder={content.contact.form.placeholders.message} />
                                </div>

                                <Button size="lg" type="submit" className="w-full h-16 text-lg bg-navy-dark text-white hover:bg-navy shadow-xl shadow-navy-dark/10 group flex items-center justify-center gap-2">
                                    {content.contact.form.labels.submit}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>

                                <p className="text-center text-xs text-navy/40 font-medium">
                                    {content.contact.form.labels.privacy}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer content={content.footer} />
        </main>
    );
}
