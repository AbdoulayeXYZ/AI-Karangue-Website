"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



export default function AnalyticsPage() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isAuth = sessionStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            fetchStats();
        }
    }, [router]);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/analytics/stats");
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !stats) {
        return (
            <div className="p-10 flex items-center justify-center min-h-[60vh]">
                <p className="text-navy/60 font-medium animate-pulse">Chargement des données...</p>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-navy-dark mb-2 tracking-tight">Analytics</h1>
                <p className="text-navy/60 font-medium">Statistiques et performance du site</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.kpis.totalVisitors}</h3>
                            <p className="text-sm font-medium text-navy/60">Visiteurs</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center">
                            <MousePointerClick className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.kpis.totalPageViews}</h3>
                            <p className="text-sm font-medium text-navy/60">Pages vues</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.kpis.totalConversions}</h3>
                            <p className="text-sm font-medium text-navy/60">Conversions</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.kpis.conversionRate}</h3>
                            <p className="text-sm font-medium text-navy/60">Taux conversion</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Traffic Chart */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-6">
                <h2 className="text-2xl font-black text-navy-dark mb-6">Évolution du Trafic (7 derniers jours)</h2>
                <div className="h-[300px] w-full">
                    {stats.trafficData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.trafficData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="date" stroke="#64748B" style={{ fontSize: "12px", fontWeight: "600" }} />
                                <YAxis stroke="#64748B" style={{ fontSize: "12px", fontWeight: "600" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "12px",
                                        fontWeight: "600"
                                    }}
                                />
                                <Legend wrapperStyle={{ fontWeight: "600" }} />
                                <Line type="monotone" dataKey="visitors" stroke="#008080" strokeWidth={3} name="Visiteurs" />
                                <Line type="monotone" dataKey="pageViews" stroke="#003366" strokeWidth={3} name="Pages vues" />
                                <Line type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={3} name="Conversions" />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-navy/40 font-medium">
                            Pas assez de données pour afficher le graphique
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pages Chart */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                    <h2 className="text-2xl font-black text-navy-dark mb-6">Pages les Plus Visitées</h2>
                    <div className="h-[300px] w-full">
                        {stats.pageData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.pageData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="name" stroke="#64748B" style={{ fontSize: "12px", fontWeight: "600" }} />
                                    <YAxis stroke="#64748B" style={{ fontSize: "12px", fontWeight: "600" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #E5E7EB",
                                            borderRadius: "12px",
                                            fontWeight: "600"
                                        }}
                                    />
                                    <Bar dataKey="visits" fill="#008080" radius={[8, 8, 0, 0]} name="Vues" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-navy/40 font-medium">
                                Aucune donnée de page vue
                            </div>
                        )}
                    </div>
                </div>

                {/* Sources Chart */}
                <div className="bg-white rounded-2xl border border-zinc-200 p-8">
                    <h2 className="text-2xl font-black text-navy-dark mb-6">Sources de Trafic (Estimé)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.sourceData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {stats.sourceData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#FFFFFF",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "12px",
                                        fontWeight: "600"
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
