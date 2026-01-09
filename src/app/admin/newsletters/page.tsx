"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Download, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NewslettersPage = () => {
    const router = useRouter();
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await fetch("/api/newsletter/subscribe");
                if (response.ok) {
                    const data = await response.json();
                    setSubscribers(data);
                }
            } catch (error) {
                console.error("Failed to fetch subscribers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const isAuth = localStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            fetchSubscribers();
        }
    }, [router]);

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const csv = [
            ["Email", "Date d'inscription", "Statut", "Source"],
            ...subscribers.map(sub => [
                sub.email,
                new Date(sub.subscribedAt).toLocaleDateString("fr-FR"),
                sub.status,
                sub.source
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `newsletters_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-navy-dark mb-2 tracking-tight">Newsletters</h1>
                <p className="text-navy/60 font-medium">Gestion des abonnés à la newsletter</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{subscribers.length}</h3>
                            <p className="text-sm font-medium text-navy/60">Total Abonnés</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{subscribers.filter(s => s.status === "active").length}</h3>
                            <p className="text-sm font-medium text-navy/60">Actifs</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">+{subscribers.filter(s => {
                                const date = new Date(s.subscribedAt);
                                const now = new Date();
                                const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                                return date > oneWeekAgo;
                            }).length}</h3>
                            <p className="text-sm font-medium text-navy/60">Cette semaine</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                        <input
                            type="text"
                            placeholder="Rechercher par email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-navy-dark placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium"
                        />
                    </div>

                    {/* Export Button */}
                    <Button
                        onClick={handleExport}
                        className="h-12 px-6 bg-navy-dark hover:bg-navy text-white rounded-xl font-bold flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Exporter CSV
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Date d'inscription</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-right text-xs font-black text-navy/60 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {filteredSubscribers.map((subscriber, index) => (
                                <motion.tr
                                    key={subscriber.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="hover:bg-zinc-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-navy-dark">{subscriber.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-navy/80">
                                            {new Date(subscriber.subscribedAt).toLocaleDateString("fr-FR", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                                            {subscriber.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                                            {subscriber.status === "active" ? "Actif" : "Inactif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-red-600 hover:text-red-700 transition-colors">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSubscribers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-navy/60 font-medium">{isLoading ? "Chargement..." : "Aucun abonné trouvé"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewslettersPage;
