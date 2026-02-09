"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
    Shield, Lock, User, ArrowRight, AlertCircle,
    Eye, EyeOff, Activity, ChevronRight, Scan, Globe, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function QRCodePage() {
    const [currentTime, setCurrentTime] = useState("");
    const [gmtTime, setGmtTime] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [booting, setBooting] = useState(true);

    useEffect(() => {
        const authStatus = localStorage.getItem("aikarangue_auth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);

        const updateTimes = () => {
            const now = new Date();

            // Format JJ/MM/AAAA/ HH:MM:SS for QR
            const day = String(now.getUTCDate()).padStart(2, "0");
            const month = String(now.getUTCMonth() + 1).padStart(2, "0");
            const year = now.getUTCFullYear();
            const hours = String(now.getUTCHours()).padStart(2, "0");
            const minutes = String(now.getUTCMinutes()).padStart(2, "0");
            const seconds = String(now.getUTCSeconds()).padStart(2, "0");

            setCurrentTime(`${day}/${month}/${year}/ ${hours}:${minutes}:${seconds}`);

            // Universal Digital Clock (Local)
            setGmtTime(now.toLocaleTimeString("fr-FR", { hour12: false }));
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);

        // Boot animation simulation
        const bootTimer = setTimeout(() => setBooting(false), 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(bootTimer);
        };
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (username === "aikarangue" && password === "aikarangue.SECURITY2025") {
            setBooting(true);
            setTimeout(() => {
                setIsAuthenticated(true);
                localStorage.setItem("aikarangue_auth", "true");
                setBooting(false);
            }, 1500);
        } else {
            setError("ACCÈS REFUSÉ : IDENTIFIANTS INVALIDES");
        }
    };

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <main className="fixed inset-0 h-screen w-screen overflow-hidden flex items-center justify-center font-geist bg-black">
                {/* Immersive N2M Background */}
                <div className="absolute inset-0 z-0 scale-105">
                    <Image
                        src="/n2m-background.jpg"
                        alt="N2M Background"
                        fill
                        className="object-cover opacity-60 grayscale-[0.3] blur-[2px]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-black/80" />
                    {/* Technical Noise/Scanline Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full max-w-lg px-6"
                >
                    <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-14 border border-white/10 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                        {/* Interactive glow */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#F2A028]/10 blur-[60px] group-focus-within:bg-[#F2A028]/20 transition-all duration-700" />

                        <div className="text-center mb-12 relative z-10">
                            <h1 className="text-4xl font-black text-white tracking-[0.15em] mb-4 uppercase italic">SECURITY<span className="text-[#F2A028]">HUB</span></h1>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-0.5 w-12 bg-[#F2A028]" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Portail de Supervision N2M</span>
                                <div className="h-0.5 w-12 bg-[#F2A028]" />
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                            <div className="space-y-4">
                                <div className="relative group/field">
                                    <div className="absolute inset-y-0 left-6 flex items-center">
                                        <User className="w-5 h-5 text-white/30 group-focus-within/field:text-[#F2A028] transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-white font-bold text-lg focus:bg-white/10 focus:border-[#F2A028]/50 outline-none transition-all placeholder:text-white/10"
                                        placeholder="IDENTIFIANT"
                                        required
                                    />
                                </div>

                                <div className="relative group/field">
                                    <div className="absolute inset-y-0 left-6 flex items-center">
                                        <Lock className="w-5 h-5 text-white/30 group-focus-within/field:text-[#F2A028] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-16 text-white font-bold text-lg focus:bg-white/10 focus:border-[#F2A028]/50 outline-none transition-all placeholder:text-white/10"
                                        placeholder="MOT DE PASSE"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#F2A028] transition-colors p-2"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center gap-3 text-red-500 text-[11px] font-black bg-red-500/10 p-5 rounded-2xl border border-red-500/20 uppercase tracking-widest text-center justify-center"
                                    >
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={booting}
                                className="w-full h-20 bg-[#F2A028] hover:bg-white hover:text-black text-black rounded-2xl font-black uppercase tracking-[0.4em] text-sm shadow-[0_20px_40px_-10px_rgba(242,160,40,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-5 group disabled:opacity-50"
                            >
                                {booting ? (
                                    <span className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 animate-pulse" />
                                        SYNCHRONISATION...
                                    </span>
                                ) : (
                                    <>
                                        <span>ENTRER</span>
                                        <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-12 text-center text-white/20 text-[9px] font-black uppercase tracking-[0.8em] flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-current" />
                        CRYPTO PROTOCOL 256-BIT
                        <div className="h-px w-8 bg-current" />
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="fixed inset-0 h-screen w-screen bg-[#050505] text-white font-geist overflow-hidden flex flex-col">
            {/* WHITE HEADER BAR */}
            <header className="h-20 bg-white flex items-center px-12 justify-between border-b-2 border-[#F2A028] z-50 shrink-0">
                <div className="relative w-40 h-12">
                    <Image
                        src="/n2m-logo.png"
                        alt="N2M Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="flex items-center gap-3 text-black font-black uppercase text-[10px] tracking-[0.2em] bg-[#F2A028]/10 px-6 py-2 rounded-full border border-[#F2A028]">
                    <div className="w-2 h-2 rounded-full bg-[#F2A028] animate-pulse" />
                    TERMINAL D'ACCÈS ACTIF
                </div>
            </header>

            {/* SPLIT SCREEN CONTENT - FLEX-1 TO FILL SPACE BETWEEN HEADER AND FOOTER */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT SIDE: SLOGAN & CLOCK */}
                <div className="w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative border-r border-white/5 bg-gradient-to-b from-[#080808] to-black overflow-hidden">
                    <div className="max-w-xl space-y-12 md:space-y-16 relative z-10 w-full flex flex-col items-center py-8">
                        {/* SLOGAN */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-4 text-center md:text-left w-full"
                        >
                            <div className="h-1 w-16 bg-[#F2A028] mx-auto md:mx-0" />
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase italic text-white">
                                SÉCURISEZ CE QUI COMPTE <br />
                                <span className="text-[#F2A028]">LE PLUS</span> AVEC <br />
                                N2M SÉCURITÉ
                            </h2>
                        </motion.div>

                        {/* REDESIGNED UNIVERSAL CLOCK - NO OVERFLOW */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full"
                        >
                            <div className="flex flex-col gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] items-center justify-center min-h-[160px]">
                                <div className="relative w-full flex justify-center items-center">
                                    <span className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] tabular-nums leading-none font-mono text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center">
                                        {gmtTime}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Subtle Background Markings */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
                    <div className="absolute left-1/2 top-0 h-full w-px bg-white/5 -translate-x-1/2" />
                </div>

                {/* RIGHT SIDE: FULL QR CODE */}
                <div className="w-1/2 flex items-center justify-center p-8 md:p-16 bg-black relative overflow-hidden">
                    <div className="relative group w-full max-w-lg lg:max-w-xl aspect-square flex items-center justify-center">
                        {/* Immersive Scanner Corners - Smaller for better fit */}
                        <div className="absolute -top-6 -left-6 w-16 h-16 border-t-4 border-l-4 border-[#F2A028] rounded-tl-[2rem] z-20" />
                        <div className="absolute -top-6 -right-6 w-16 h-16 border-t-4 border-r-4 border-[#F2A028] rounded-tr-[2rem] z-20" />
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-4 border-l-4 border-[#F2A028] rounded-bl-[2rem] z-20" />
                        <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-4 border-r-4 border-[#F2A028] rounded-br-[2rem] z-20" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_80px_160px_-40px_rgba(242,160,40,0.2)] relative overflow-hidden w-full h-full flex items-center justify-center"
                        >
                            {/* Scanning line effect */}
                            <motion.div
                                animate={{ y: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-[#F2A028]/30 blur-md z-10"
                            />

                            <div className="w-full h-full flex items-center justify-center">
                                <QRCodeSVG
                                    value={currentTime}
                                    size={1024}
                                    className="w-full h-full p-2"
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* WHITE FOOTER BAR - REFINED */}
            <footer className="h-10 bg-white flex justify-center items-center px-12 border-t border-[#F2A028]/30 z-50 shrink-0">
                <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.6em] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Powered by AI-Karangué
                </span>
            </footer>

            {/* GLOBAL SCANNER TEXTURE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />
        </main>
    );
}
