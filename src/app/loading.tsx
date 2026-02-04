"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
            <div className="relative">
                {/* Logo or Branded Loader */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 relative"
                >
                    <div className="absolute inset-0 border-4 border-teal/10 rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-t-teal rounded-full"
                    />
                </motion.div>

                {/* Text hint */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-navy/20">
                        Chargement
                    </span>
                </motion.div>
            </div>

            {/* Minimalist Progress Bar at Top */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 h-1 bg-teal origin-left"
            />
        </div>
    );
}
