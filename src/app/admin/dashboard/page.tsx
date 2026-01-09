"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, TrendingUp, Eye, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
    {
        name: "Visiteurs (30j)",
        value: "12,458",
        change: "+12.5%",
        trend: "up",
        icon: Eye,
        color: "bg-blue-500",
    },
    {
        name: "Abonnés Newsletter",
        value: "1,247",
        change: "+8.2%",
        trend: "up",
        icon: Mail,
        color: "bg-teal",
    },
    {
        name: "Demandes Démo",
        value: "89",
        change: "+23.1%",
        trend: "up",
        icon: Users,
        color: "bg-purple-500",
    },
    {
        name: "Taux Conversion",
        value: "3.2%",
        change: "-0.3%",
        trend: "down",
        icon: TrendingUp,
        color: "bg-orange-500",
    },
];

const recentContacts = [
    { name: "Amadou Diallo", company: "TransDakar", email: "a.diallo@transdakar.sn", date: "Il y a 2h", status: "new" },
    { name: "Fatou Sall", company: "LogiSénégal", email: "f.sall@logisenegal.sn", date: "Il y a 5h", status: "new" },
    { name: "Moussa Kane", company: "BTP Services", email: "m.kane@btpservices.sn", date: "Il y a 1j", status: "in-progress" },
    { name: "Aïcha Ndiaye", company: "Assur Auto", email: "a.ndiaye@assurauto.sn", date: "Il y a 2j", status: "completed" },
];

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const isAuth = localStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-navy-dark mb-2 tracking-tight">Dashboard</h1>
                <p className="text-navy/60 font-medium">Vue d'ensemble de votre plateforme AI-Karangué</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;

                    return (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-zinc-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                    <TrendIcon className="w-4 h-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-navy-dark mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-navy/60">{stat.name}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Contacts */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="p-6 border-b border-zinc-200">
                    <h2 className="text-2xl font-black text-navy-dark">Demandes Récentes</h2>
                    <p className="text-sm text-navy/60 font-medium mt-1">Dernières demandes de démonstration</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Entreprise</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {recentContacts.map((contact, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-zinc-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-navy-dark">{contact.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-navy/80">{contact.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-navy/60">{contact.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-navy/60">{contact.date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${contact.status === "new" ? "bg-blue-100 text-blue-700" :
                                                contact.status === "in-progress" ? "bg-orange-100 text-orange-700" :
                                                    "bg-green-100 text-green-700"
                                            }`}>
                                            {contact.status === "new" ? "Nouveau" :
                                                contact.status === "in-progress" ? "En cours" :
                                                    "Traité"}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
