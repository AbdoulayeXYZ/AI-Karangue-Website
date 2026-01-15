"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, X } from "lucide-react";
import { SiteContent } from "@/lib/content";

export const Hero = ({ content }: { content: SiteContent["home"]["hero"] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        setMousePos({ x, y });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-default"
        >
            {/* 1. Deep Atmospheric Layers */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-25 brightness-[0.4] scale-105 transition-all duration-1000"
                >
                    <source src={content.heroVideoPath} type="video/mp4" />
                </video>

                {/* Film Grain Texture Overlay */}
                <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Mouse-Tracking Spotlight */}
                <div
                    className="absolute inset-0 z-[2] opacity-40 transition-opacity duration-1000 group-hover:opacity-60"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 128, 128, 0.15) 0%, transparent 50%)`,
                    }}
                />

                {/* Deep Cinematic Vignette */}
                <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

                {/* 2. Floating Atmospheric Particles (SVG for performance) */}
                <div className="absolute inset-0 z-[4] pointer-events-none opacity-20">
                    {isMounted && [...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: Math.random() * 0.5,
                                scale: Math.random() * 0.5 + 0.5,
                            }}
                            animate={{
                                y: ["-10%", "110%"],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: Math.random() * 20 + 20,
                                repeat: Infinity,
                                delay: Math.random() * -20,
                                ease: "linear",
                            }}
                            className="absolute w-1 h-1 bg-teal rounded-full blur-[1px]"
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center translate-y-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                    className="flex flex-col items-center"
                >
                    {/* Character Reveal Headline - Luxury Polish */}
                    <h1 className="text-[9vw] md:text-[11vw] lg:text-[13vw] font-black text-white leading-[0.85] mb-16 select-none tracking-tighter">
                        <motion.span
                            initial={{ filter: "blur(40px)", opacity: 0, y: 50 }}
                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            {content.mainTitle1}
                        </motion.span>
                        <motion.span
                            initial={{ filter: "blur(40px)", opacity: 0, y: 50 }}
                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                            transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex justify-center"
                        >
                            {content.mainTitle2.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.8 + i * 0.05,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-teal/70 to-white bg-[length:200%_auto] animate-sweep"
                                    style={{ textShadow: "0 0 50px rgba(0, 128, 128, 0.3)" }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.span>
                    </h1>

                    {/* Minimalist Visual Anchor */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="w-24 h-[1px] bg-gradient-to-r from-transparent via-teal to-transparent mb-20"
                    />

                    {/* The "Experience" Interface Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-32 h-32 flex items-center justify-center rounded-full transition-all duration-700 active:scale-90"
                        >
                            {/* Outer Atmosphere */}
                            <div className="absolute inset-0 rounded-full border border-teal/10 scale-100 group-hover:scale-125 transition-all duration-1000 group-hover:border-teal/30" />
                            <div className="absolute inset-0 rounded-full border border-teal/5 scale-100 animate-ping-slow" />

                            {/* Inner Glass */}
                            <div className="relative w-20 h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/5 flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(0,128,128,0.2)] group-hover:bg-teal group-hover:border-teal transition-all duration-700">
                                <Play className="w-8 h-8 fill-white text-white ml-1 group-hover:scale-110 transition-transform duration-500" />

                                {/* Inner Glow Sweep */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.2),transparent)] animate-spin-slow transition-opacity" />
                            </div>

                            {/* Floating Text Indicator */}
                            <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-left opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-8 transition-all duration-1000">
                                <span className="block text-[8px] font-black tracking-[0.5em] uppercase text-teal mb-1">Interactive</span>
                                <span className="block text-[10px] font-black tracking-[0.2em] uppercase text-white/40">{content.videoButtonText}</span>
                            </div>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Aesthetic Borders - Luxury Framing (Bottom only) */}
            <div className="absolute bottom-10 left-10 w-12 h-12 border-l border-b border-white/10" />
            <div className="absolute bottom-10 right-10 w-12 h-12 border-r border-b border-white/10" />

            {/* Video Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 lg:p-20"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, scale: 1.02, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: 100 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 bg-black"
                        >
                            {(() => {
                                const isYouTube = content.presentationVideoPath.includes("youtube.com") || content.presentationVideoPath.includes("youtu.be");

                                if (isYouTube) {
                                    // Simple parser for YouTube IDs
                                    let videoId = "";
                                    if (content.presentationVideoPath.includes("youtu.be")) {
                                        videoId = content.presentationVideoPath.split("youtu.be/")[1]?.split("?")[0];
                                    } else if (content.presentationVideoPath.includes("v=")) {
                                        videoId = content.presentationVideoPath.split("v=")[1]?.split("&")[0];
                                    }

                                    return (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    );
                                }

                                return (
                                    <video
                                        autoPlay
                                        controls
                                        playsInline
                                        className="w-full h-full object-contain"
                                    >
                                        <source src={content.presentationVideoPath} type="video/mp4" />
                                    </video>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                @keyframes sweep {
                    0% { background-position: 200% 50%; }
                    100% { background-position: -200% 50%; }
                }
                @keyframes spin-slow {
                    to { transform: rotate(360deg); }
                }
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .animate-sweep {
                    animation: sweep 8s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }
                .animate-ping-slow {
                    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </section>
    );
};
