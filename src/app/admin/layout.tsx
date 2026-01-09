"use client";

import React from "react";
import { LayoutDashboard, Mail, Users, BarChart3, LogOut, Menu, X, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Contenu", href: "/admin/content", icon: FileText },
    { name: "Newsletters", href: "/admin/newsletters", icon: Mail },
    { name: "Contacts", href: "/admin/contacts", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-navy-dark border-r border-white/10">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logoaikarangue.png"
                                alt="AI-Karangué"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                        <div>
                            <h2 className="text-white font-black text-lg tracking-tight">AI-Karangué</h2>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Admin</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
                                    isActive
                                        ? "bg-teal text-white shadow-lg shadow-teal/20"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-navy-dark rounded-xl flex items-center justify-center text-white"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
                    <aside className="w-64 h-full bg-navy-dark" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/logoaikarangue.png"
                                        alt="AI-Karangué"
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-white font-black text-lg tracking-tight">AI-Karangué</h2>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Admin</p>
                                </div>
                            </div>
                        </div>

                        <nav className="p-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
                                            isActive
                                                ? "bg-teal text-white shadow-lg shadow-teal/20"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                Déconnexion
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
