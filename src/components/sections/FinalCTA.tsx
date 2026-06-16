"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
    <section className="py-40 bg-navy-dark text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact">
                        <button className="inline-flex items-center gap-3 bg-teal text-white font-black text-sm px-8 py-4 rounded-xl hover:bg-teal/90 transition-colors shadow-lg shadow-teal/20">
                            Souscrire maintenant
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                    <Link href="/offres">
                        <button className="inline-flex items-center gap-3 border border-white/15 text-white/70 font-black text-sm px-8 py-4 rounded-xl hover:border-white/30 hover:text-white transition-all">
                            Voir les offres
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    </section>
);
