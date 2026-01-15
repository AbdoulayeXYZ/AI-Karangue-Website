"use client";

import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageSwitcher = () => {
    const router = useRouter();
    const [lang, setLang] = useState<"fr" | "en">("fr");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const cookies = document.cookie.split("; ");
        const langCookie = cookies.find(c => c.startsWith("app-lang="));
        if (langCookie) {
            setLang(langCookie.split("=")[1] as "fr" | "en");
        }
    }, []);

    const toggleLanguage = (newLang: "fr" | "en") => {
        if (newLang === lang) return;

        // Set cookie
        document.cookie = `app-lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setLang(newLang);
        setIsOpen(false);

        // Refresh page to trigger getServerContent with the new cookie
        router.refresh();
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
                <Globe className="w-4 h-4 text-teal" />
                <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white">
                    {lang === "fr" ? "FR" : "EN"}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-32 bg-navy-dark border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleLanguage("fr")}
                                className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${lang === "fr" ? "text-teal" : "text-white/60"}`}
                            >
                                Français
                            </button>
                            <button
                                onClick={() => toggleLanguage("en")}
                                className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${lang === "en" ? "text-teal" : "text-white/60"}`}
                            >
                                English
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
