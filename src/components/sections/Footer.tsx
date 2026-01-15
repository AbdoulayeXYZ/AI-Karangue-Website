"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteContent } from "@/lib/content";

export const Footer = ({ content }: { content: SiteContent["footer"] }) => {
    if (!content) return null;

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

                {/* Social Media & Newsletter (Full Width) */}
                <div className="mb-32">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-md">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                            <Link href={content.social?.linkedin || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href={content.social?.whatsapp || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-6 h-6 group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 8.39c-2.003 0-3.96-.539-5.673-1.56L3 22.1l1.281-4.685c-1.113-1.613-1.699-3.52-1.699-5.464 0-5.513 4.486-10 10-10 2.67 0 5.181 1.04 7.07 2.93 1.89 1.89 2.93 4.401 2.93 7.07 0 5.513-4.486 10-10 10M12.355 0C5.54 0 0 5.54 0 12.355c0 2.181.571 4.31 1.655 6.193L0 24l5.594-1.467c1.802 1.026 3.844 1.567 5.923 1.567 6.815 0 12.355-5.54 12.355-12.355 0-3.284-1.278-6.37-3.6-8.692C17.95 1.278 14.864 0 12.355 0"></path></svg>
                            </Link>
                            <Link href={content.social?.instagram || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href={content.social?.facebook || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href={content.social?.youtube || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link href={content.social?.tiktok || "#"} target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal transition-all duration-500 group border border-white/5">
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-6 h-6 group-hover:scale-110 transition-transform"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.01.52.07 1.04.26 1.53.45 1.18 1.64 2.01 2.89 2.05.61.03 1.23-.1 1.77-.32 1.18-.5 1.91-1.66 2.01-2.93.01-3.51-.01-7.02.01-10.53-.01-1.03.01-2.06.01-3.09z"></path></svg>
                            </Link>
                        </div>

                        <div className="w-full lg:w-auto flex-1 max-w-2xl">
                            <form
                                className="flex flex-col md:flex-row gap-4"
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
                                            btn.innerText = "MERCI !";
                                            setTimeout(() => btn.innerText = originalText, 3000);
                                        } else {
                                            btn.innerText = "ERREUR";
                                        }
                                    } catch (err) {
                                        btn.innerText = "ERREUR";
                                    } finally {
                                        setTimeout(() => {
                                            btn.disabled = false;
                                            if (btn.innerText === "ERREUR") btn.innerText = originalText;
                                        }, 3000);
                                    }
                                }}
                            >
                                <div className="relative flex-1">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="email"
                                        placeholder={content.newsletter?.placeholder}
                                        className="w-full h-16 pl-16 pr-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all font-medium text-lg"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="h-16 px-10 bg-teal hover:bg-teal-light text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-50 shadow-xl shadow-teal/20"
                                >
                                    {content.newsletter?.buttonText}
                                </Button>
                            </form>
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
