"use client";

import React from "react";
import { MapPin, Phone, Mail, Linkedin, Youtube, Facebook, Instagram, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteContent } from "@/lib/content";

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 8.39c-2.003 0-3.96-.539-5.673-1.56L3 22.1l1.281-4.685c-1.113-1.613-1.699-3.52-1.699-5.464 0-5.513 4.486-10 10-10 2.67 0 5.181 1.04 7.07 2.93 1.89 1.89 2.93 4.401 2.93 7.07 0 5.513-4.486 10-10 10M12.355 0C5.54 0 0 5.54 0 12.355c0 2.181.571 4.31 1.655 6.193L0 24l5.594-1.467c1.802 1.026 3.844 1.567 5.923 1.567 6.815 0 12.355-5.54 12.355-12.355 0-3.284-1.278-6.37-3.6-8.692C17.95 1.278 14.864 0 12.355 0" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.01.52.07 1.04.26 1.53.45 1.18 1.64 2.01 2.89 2.05.61.03 1.23-.1 1.77-.32 1.18-.5 1.91-1.66 2.01-2.93.01-3.51-.01-7.02.01-10.53-.01-1.03.01-2.06.01-3.09z" />
    </svg>
);

export const Footer = ({ content }: { content: SiteContent["footer"] }) => {
    if (!content) return null;

    return (
        <footer className="bg-navy-dark text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">

                {/* Main grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-16 mb-16">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-5 mb-8">
                            <Link href="/" className="relative w-12 h-12">
                                <Image
                                    src="/logoaikarangue.png"
                                    alt="AI-Karangue"
                                    fill
                                    className="object-contain brightness-0 invert opacity-70"
                                />
                            </Link>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="relative w-20 h-8">
                                <Image
                                    src="/logokarangue221.png"
                                    alt="Karangue221"
                                    fill
                                    className="object-contain brightness-0 invert opacity-70"
                                />
                            </div>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
                            La protection intelligente du conducteur au Senegal.
                            DASHCAM IA Streamax + Plateforme Karangue221.
                        </p>

                        {/* Contact */}
                        <div className="space-y-3 mb-8">
                            <a href="tel:+221787864848" className="flex items-center gap-3 text-white/40 hover:text-teal transition-colors group">
                                <Phone className="w-3.5 h-3.5 text-teal/60 group-hover:text-teal shrink-0" />
                                <span className="text-xs font-bold">{content.phone}</span>
                            </a>
                            <a href="mailto:contact@aikarangue.com" className="flex items-center gap-3 text-white/40 hover:text-teal transition-colors group">
                                <Mail className="w-3.5 h-3.5 text-teal/60 group-hover:text-teal shrink-0" />
                                <span className="text-xs font-bold">contact@aikarangue.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-white/40">
                                <MapPin className="w-3.5 h-3.5 text-teal/60 shrink-0" />
                                <span className="text-xs font-bold">Ouakam, Dakar, Senegal</span>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-3">
                            {[
                                { href: content.social?.linkedin, Icon: Linkedin },
                                { href: content.social?.instagram, Icon: Instagram },
                                { href: content.social?.facebook, Icon: Facebook },
                                { href: content.social?.youtube, Icon: Youtube },
                                { href: content.social?.whatsapp, Icon: WhatsAppIcon },
                                { href: content.social?.tiktok, Icon: TikTokIcon },
                            ].map(({ href, Icon }, i) => (
                                <Link
                                    key={i}
                                    href={href || "#"}
                                    target="_blank"
                                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-teal hover:border-teal transition-all duration-300"
                                >
                                    <Icon />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Produit */}
                    <div>
                        <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-teal mb-7">Produit</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "DASHCAM IA", href: "/#product" },
                                { label: "Nos Offres", href: "/offres" },
                                { label: "Comment ca marche", href: "/#howitworks" },
                                { label: "Plateforme Karangue221", href: "/solutions" },
                                { label: "Application mobile", href: "/#app" },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors font-medium">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-teal mb-7">Support</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "FAQ", href: "/faq" },
                                { label: "Nous contacter", href: "/contact" },
                                { label: "WhatsApp direct", href: content.social?.whatsapp || "#" },
                                { label: "Blog", href: "/blog" },
                                { label: "Souscrire", href: "/contact" },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors font-medium">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Entreprise */}
                    <div>
                        <h4 className="text-[9px] font-black tracking-[0.4em] uppercase text-teal mb-7">Entreprise</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Art'Beau-Rescence", href: "#" },
                                { label: "Notre mission", href: "#" },
                                { label: "Presse", href: "#" },
                                { label: "Partenaires", href: "#" },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors font-medium">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.25em]">
                        {content.copyright}
                    </p>

                    <div className="flex items-center gap-8">
                        {content.legal.links.map((item) => (
                            <Link key={item} href="#" className="text-[10px] font-bold text-white/20 hover:text-white/60 uppercase tracking-[0.2em] transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all"
                    >
                        <ArrowRight className="w-4 h-4 -rotate-90" />
                    </button>
                </div>
            </div>
        </footer>
    );
};
