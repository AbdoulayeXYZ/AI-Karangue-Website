"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay for UX
        setTimeout(() => {
            if (email === "admin@aikarangue.sn" && password === "#passer@1234") {
                sessionStorage.setItem("adminAuth", "true");
                router.push("/admin/dashboard");
            } else {
                alert("Identifiants incorrects. Veuillez réessayer.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-20 h-20">
                            <Image
                                src="/logoaikarangue.png"
                                alt="AI-Karangué"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
                        Administration
                    </h1>
                    <p className="text-white/50 text-center mb-8 font-medium">
                        Connectez-vous pour accéder au dashboard
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium"
                                    placeholder="admin@aikarangue.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-teal hover:bg-teal-light text-white rounded-xl font-black uppercase tracking-wider text-sm shadow-lg shadow-teal/20 hover:shadow-teal/40 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? "Connexion..." : "Se connecter"}
                            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-white/30 mt-8 font-medium">
                        © 2026 AI-Karangué - Administration sécurisée
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
