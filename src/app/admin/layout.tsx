"use client";

import React, { useState, useEffect } from "react";
import { LayoutDashboard, Mail, Users, BarChart3, LogOut, Menu, X, FileText, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

    useEffect(() => {
        // Skip auth check on login page to avoid infinite redirect
        if (pathname !== "/admin/login") {
            const isAuth = sessionStorage.getItem("adminAuth");
            if (!isAuth) {
                router.push("/admin/login");
            }
        }
    }, [pathname, router]);

    const handleLogout = () => {
        sessionStorage.removeItem("adminAuth");
        router.push("/admin/login");
    };

    const SidebarContent = ({ pathname, handleLogout }: { pathname: string; handleLogout: () => void }) => (
        <div className="flex flex-col h-full text-white">
            {/* Logo Area */}
            <div className="p-8 pb-10">
                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center border border-teal/20 shadow-lg shadow-teal/5">
                        <Image
                            src="/logoaikarangue.png"
                            alt="AI-Karangué"
                            width={32}
                            height={32}
                            className="object-contain brightness-0 invert"
                        />
                    </div>
                    <div>
                        <h2 className="text-white font-black text-xl tracking-tight leading-none">AI-Karangué</h2>
                        <p className="text-teal font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Command Center</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <p className="px-4 text-xs font-black text-white/20 uppercase tracking-widest mb-4">Menu Principal</p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block relative group"
                        >
                            <div className={cn(
                                "relative z-10 flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border border-transparent",
                                isActive
                                    ? "bg-teal/10 text-teal border-teal/20 shadow-lg shadow-teal/5"
                                    : "text-white/50 hover:text-white hover:bg-white/5 group-hover:pl-5"
                            )}>
                                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-teal" : "text-white/40 group-hover:text-white")} />
                                <span>{item.name}</span>
                                {isActive && (
                                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_#008080]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 mt-auto">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Administrateur</p>
                            <p className="text-xs text-white/40 truncate">admin@aikarangue.com</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-white/60 text-xs font-bold transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex font-sans selection:bg-teal selection:text-white">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 bg-navy-dark fixed inset-y-0 left-0 z-50 overflow-y-auto border-r border-white/5 shadow-2xl shadow-navy-dark/20">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal/10 to-transparent pointer-events-none" />
                <div className="relative z-10 h-full">
                    <SidebarContent pathname={pathname} handleLogout={handleLogout} />
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-navy-dark/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src="/logoaikarangue.png"
                        alt="AI-Karangué"
                        width={28}
                        height={28}
                        className="object-contain brightness-0 invert"
                    />
                    <span className="font-bold text-white">Admin Panel</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-72 bg-navy-dark z-50 lg:hidden border-r border-white/10 shadow-2xl"
                        >
                            <SidebarContent pathname={pathname} handleLogout={handleLogout} />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
