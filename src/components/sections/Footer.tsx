"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteContent } from "@/lib/content";

export const Footer = ({ content }: { content: SiteContent["footer"] }) => {
    return (
        <footer className="relative bg-navy-dark text-white pt-32 pb-16 overflow-hidden">
            {/* Background Video (Subtle) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-8 mb-12">
                            <Link href="/" className="relative w-16 h-16 transition-transform duration-500 hover:scale-110">
                                <Image
                                    src="/logoaikarangue.png"
                                    alt="AI-Karangué"
                                    fill
                                    className="object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-500"
                                />
                            </Link>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="relative w-24 h-12 transition-transform duration-500 hover:scale-110">
                                <Image
                                    src="/logokarangue221.png"
                                    alt="Karangué221"
                                    fill
                                    className="object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        </div>

                        <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter" dangerouslySetInnerHTML={{ __html: content.mission }} />

                        <p className="text-xl text-white/50 mb-12 max-w-md leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: content.description }} />

                        {/* Social Media + Newsletter on same line */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="flex gap-4">
                                <Link href={content.social.linkedin} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href={content.social.twitter} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                    <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href={content.social.youtube} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                    <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href={content.social.facebook} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                    <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Link>
                                <Link href={content.social.instagram} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                    <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </Link>
                            </div>

                            {/* Newsletter - Inline */}
                            <div className="flex-1 max-w-md">
                                <form
                                    className="flex gap-2"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const form = e.target as HTMLFormElement;
                                        const input = form.elements[0] as HTMLInputElement;
                                        const email = input.value;
                                        const btn = form.querySelector('button') as HTMLButtonElement;

                                        if (!email) return;

                                        const originalText = btn.innerText;
                                        btn.disabled = true;
                                        btn.innerText = "...";

                                        try {
                                            const res = await fetch("/api/newsletter/subscribe", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ email, source: "footer" }),
                                            });

                                            if (res.ok) {
                                                input.value = "";
                                                btn.innerText = "Merci !";
                                                setTimeout(() => btn.innerText = originalText, 3000);
                                            } else {
                                                btn.innerText = "Erreur";
                                            }
                                        } catch (err) {
                                            console.error(err);
                                            btn.innerText = "Erreur";
                                        } finally {
                                            setTimeout(() => {
                                                btn.disabled = false;
                                                if (btn.innerText === "Erreur") btn.innerText = originalText;
                                            }, 3000);
                                        }
                                    }}
                                >
                                    <input
                                        type="email"
                                        placeholder={content.newsletter.placeholder}
                                        className="flex-1 h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-all font-medium text-sm"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="h-11 px-5 bg-teal hover:bg-teal-light text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {content.newsletter.buttonText}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Site Summary Links */}
                    <div className="lg:col-span-1" /> {/* Spacer */}
                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-teal mb-10">{content.navigation.technology.title}</h4>
                            <ul className="space-y-6">
                                {content.navigation.technology.links.map((item, i) => (
                                    <li key={i}><Link href={item.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors">{item.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-teal mb-10">{content.navigation.sectors.title}</h4>
                            <ul className="space-y-6">
                                {content.navigation.sectors.links.map((item, i) => (
                                    <li key={i}><Link href={item.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors">{item.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-teal mb-10">{content.navigation.company.title}</h4>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-teal flex-shrink-0" />
                                    <span className="text-xs font-bold text-white/60 leading-relaxed uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: content.address }} />
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-teal" />
                                    <span className="text-xs font-bold text-white/60">{content.phone}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">
                            {content.copyright}
                        </p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                            {content.trademark}
                        </p>
                    </div>
                    <div className="flex gap-10">
                        {content.legal.links.map((item) => (
                            <Link key={item} href="#" className="text-[10px] font-black tracking-[0.3em] text-white/30 hover:text-teal uppercase transition-colors">{item}</Link>
                        ))}
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-white/40 hover:text-white"
                    >
                        <ArrowRight className="w-6 h-6 -rotate-90" />
                    </button>
                </div>
            </div>
        </footer>
    );
};
