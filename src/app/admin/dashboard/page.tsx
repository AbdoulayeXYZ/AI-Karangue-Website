"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, TrendingUp, Eye, Activity, Calendar, Zap, ArrowRight, MousePointer2, Search, User } from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface DashboardStats {
    kpis: {
        totalVisitors: number;
        totalPageViews: number;
        totalConversions: number;
        conversionRate: string;
    };
    trafficData: Array<{
        date: string;
        visitors: number;
        pageViews: number;
        conversions: number;
    }>;
}

interface ContactRequest {
    id: string;
    fullName: string;
    email: string;
    company: string;
    submittedAt: string;
    status: "new" | "in-progress" | "completed" | "archived";
}

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentContacts, setRecentContacts] = useState<ContactRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const isAuth = sessionStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch("/api/analytics/stats");
                const statsData = await statsRes.json();

                // Fetch Contacts for recent list
                const contactsRes = await fetch("/api/contact");
                const contactsData = await contactsRes.json();

                if (statsRes.ok) setStats(statsData);
                if (contactsRes.ok) {
                    // Sort by date desc and take top 5
                    const sorted = contactsData.sort((a: any, b: any) =>
                        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                    ).slice(0, 5);
                    setRecentContacts(sorted);
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-teal/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-teal border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-navy/40 font-bold uppercase tracking-widest text-xs">Chargement</p>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    const cards = [
        {
            name: "Visiteurs Totaux",
            value: stats.kpis.totalVisitors,
            icon: Users,
            color: "from-blue-400 to-blue-600",
            shadow: "shadow-blue-500/30",
            subtext: "Depuis le début"
        },
        {
            name: "Vues de Page",
            value: stats.kpis.totalPageViews,
            icon: Eye,
            color: "from-purple-400 to-purple-600",
            shadow: "shadow-purple-500/30",
            subtext: "Pages consultées"
        },
        {
            name: "Conversions",
            value: stats.kpis.totalConversions,
            icon: Zap,
            color: "from-teal to-emerald-500",
            shadow: "shadow-teal/30",
            subtext: "Leads & Abonnés"
        },
        {
            name: "Taux de Conversion",
            value: stats.kpis.conversionRate,
            icon: TrendingUp,
            color: "from-orange-400 to-red-500",
            shadow: "shadow-orange-500/30",
            subtext: "Performance globale"
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-navy-dark tracking-tight mb-2">
                        Dashboard <span className="text-teal">Karangué</span>
                    </h1>
                    <p className="text-navy/50 font-medium text-lg">
                        Vue d'ensemble de vos performances en temps réel.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-zinc-200">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div className="pr-4">
                        <p className="text-xs font-bold text-navy/40 uppercase tracking-wider">Aujourd'hui</p>
                        <p className="text-sm font-bold text-navy-dark">
                            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                        >
                            {/* Decorative Background */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-500`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white ${card.shadow} shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
                                        <TrendingUp className="w-3 h-3 text-teal inline mr-1" />
                                        <span className="text-[10px] font-bold text-navy/60">+12%</span>
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black text-navy-dark mb-1 tracking-tight">{card.value}</h3>
                                <p className="font-bold text-navy/40 text-xs uppercase tracking-widest mb-1">{card.name}</p>
                                <p className="text-xs text-navy/30 font-medium">{card.subtext}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Traffic Chart */}
                <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-navy-dark tracking-tight mb-2">Trafic & Engagement</h2>
                            <p className="text-navy/50 font-medium">Analyse des visites sur les 7 derniers jours</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-teal bg-teal/5 px-4 py-2 rounded-xl border border-teal/10">
                                <div className="w-2 h-2 rounded-full bg-teal animate-pulse" /> Visiteurs
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Pages Vues
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#008080" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#008080" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={15}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                                        padding: '12px 16px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    itemStyle={{ fontSize: '13px', fontWeight: 700, padding: '2px 0' }}
                                    labelStyle={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#008080"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVisitors)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#008080' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pageViews"
                                    stroke="#3b82f6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorPageViews)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-navy-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
                    {/* Dynamic Background */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-teal/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20">
                                <Activity className="w-6 h-6 text-teal" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight">Espace Admin</h2>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Contrôle Rapide</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: "Éditer le Contenu", desc: "Modifier textes & images", href: "/admin/content", color: "bg-teal", icon: MousePointer2 },
                                { title: "Gérer les Contacts", desc: "Suivre les demandes", href: "/admin/contacts", color: "bg-orange-500", icon: Users },
                                { title: "Base Abonnés", desc: "Inscriptions newsletter", href: "/admin/newsletters", color: "bg-blue-500", icon: Search },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} className="block group">
                                    <div className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:translate-x-1">
                                        <div className={`w-10 h-10 rounded-xl ${action.color} bg-opacity-20 flex items-center justify-center`}>
                                            <action.icon className={`w-5 h-5 text-white`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-white group-hover:text-teal transition-colors">{action.title}</h4>
                                            <p className="text-xs text-white/40">{action.desc}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-8">
                            <div className="bg-gradient-to-r from-teal/20 to-blue-500/20 rounded-2xl p-6 border border-white/10">
                                <p className="text-xs font-bold text-teal uppercase tracking-widest mb-2">Conseil du jour</p>
                                <p className="text-sm font-medium text-white/80 leading-relaxed">
                                    Pensez à vérifier régulièrement les nouvelles demandes de contact pour optimiser votre taux de conversion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Contacts Table */}
            <div className="bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden shadow-xl">
                <div className="p-8 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-navy-dark tracking-tight">Demandes Récentes</h2>
                        <p className="text-navy/50 font-medium text-sm mt-1">Les 5 dernières prises de contact</p>
                    </div>
                    <Link href="/admin/contacts">
                        <Button variant="outline" className="rounded-xl border-zinc-200 hover:bg-zinc-50 text-xs font-black uppercase tracking-wider h-12 px-6">
                            Tout voir <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="overflow-x-auto p-2">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Contact</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Entreprise</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentContacts.length > 0 ? (
                                recentContacts.map((contact, index) => (
                                    <tr key={index} className="group hover:scale-[1.01] transition-transform duration-200">
                                        <td className="px-6 py-4 bg-zinc-50/50 group-hover:bg-white rounded-l-2xl group-hover:shadow-lg border-y border-l border-transparent group-hover:border-zinc-100 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-dark to-navy-light text-white flex items-center justify-center text-xs font-bold">
                                                    {contact.fullName?.charAt(0) || <User className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-navy-dark text-sm">{contact.fullName || "Utilisateur inconnu"}</div>
                                                    <div className="text-xs text-navy/40 font-medium">{contact.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 bg-zinc-50/50 group-hover:bg-white border-y border-transparent group-hover:border-zinc-100 group-hover:shadow-lg transition-all">
                                            <div className="text-sm font-bold text-navy/70">{contact.company || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 bg-zinc-50/50 group-hover:bg-white border-y border-transparent group-hover:border-zinc-100 group-hover:shadow-lg transition-all">
                                            <div className="flex items-center gap-2 text-xs font-bold text-navy/50">
                                                <Calendar className="w-3 h-3 text-teal" />
                                                {new Date(contact.submittedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 bg-zinc-50/50 group-hover:bg-white rounded-r-2xl group-hover:shadow-lg border-y border-r border-transparent group-hover:border-zinc-100 transition-all">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border ${contact.status === "new" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                contact.status === "in-progress" ? "bg-orange-50 text-orange-600 border-orange-100" :
                                                    "bg-green-50 text-green-600 border-green-100"
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${contact.status === "new" ? "bg-blue-600" :
                                                    contact.status === "in-progress" ? "bg-orange-600" : "bg-green-600"
                                                    }`} />
                                                {contact.status === "new" ? "Nouveau" :
                                                    contact.status === "in-progress" ? "En cours" : "Traité"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-3">
                                                <Search className="w-5 h-5" />
                                            </div>
                                            <p className="text-navy/30 font-bold text-sm">Aucune demande récente</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
