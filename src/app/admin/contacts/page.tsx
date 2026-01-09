"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Eye, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";



export default function ContactsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const response = await fetch("/api/contact");
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            }
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const isAuth = sessionStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            fetchContacts();
        }
    }, [router]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                // Optimistic update
                setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
                if (selectedContact && selectedContact.id === id) {
                    setSelectedContact({ ...selectedContact, status: newStatus });
                }
                // If we marked as completed from modal, maybe close modal or show success feedback
                if (newStatus === 'completed') {
                    // alert("Marqué comme traité !");
                }
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch =
            contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || contact.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-700";
            case "in-progress": return "bg-orange-100 text-orange-700";
            case "completed": return "bg-green-100 text-green-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "new": return "Nouveau";
            case "in-progress": return "En cours";
            case "completed": return "Traité";
            default: return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "new": return XCircle;
            case "in-progress": return Clock;
            case "completed": return CheckCircle2;
            default: return XCircle;
        }
    };

    const stats = {
        total: contacts.length,
        new: contacts.filter(c => c.status === "new").length,
        inProgress: contacts.filter(c => c.status === "in-progress").length,
        completed: contacts.filter(c => c.status === "completed").length,
    };

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-black text-navy-dark mb-2 tracking-tight">Contacts</h1>
                <p className="text-navy/60 font-medium">Gestion des demandes de démonstration</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-navy-dark rounded-xl flex items-center justify-center">
                            <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.total}</h3>
                            <p className="text-sm font-medium text-navy/60">Total</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.new}</h3>
                            <p className="text-sm font-medium text-navy/60">Nouveaux</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.inProgress}</h3>
                            <p className="text-sm font-medium text-navy/60">En cours</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-navy-dark">{stats.completed}</h3>
                            <p className="text-sm font-medium text-navy/60">Traités</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/40" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-navy-dark placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-all font-medium"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        {["all", "new", "in-progress", "completed"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${statusFilter === status
                                    ? "bg-teal text-white"
                                    : "bg-zinc-100 text-navy/60 hover:bg-zinc-200"
                                    }`}
                            >
                                {status === "all" ? "Tous" : getStatusLabel(status)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Entreprise</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Flotte</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-navy/60 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-right text-xs font-black text-navy/60 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {filteredContacts.map((contact, index) => {
                                const StatusIcon = getStatusIcon(contact.status);

                                return (
                                    <motion.tr
                                        key={contact.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="hover:bg-zinc-50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedContact(contact)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-navy-dark">{contact.firstName} {contact.lastName}</div>
                                            <div className="text-sm font-medium text-navy/60">{contact.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-navy-dark">{contact.company}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-navy/80">{contact.fleetSize}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-navy/60">
                                                {new Date(contact.submittedAt).toLocaleDateString("fr-FR", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(contact.status)}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {getStatusLabel(contact.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-teal hover:text-teal-light transition-colors">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredContacts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-navy/60 font-medium">{isLoading ? "Chargement..." : "Aucun contact trouvé"}</p>
                    </div>
                )}
            </div>

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setSelectedContact(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-black text-navy-dark">Détails de la demande</h2>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(selectedContact.status)}`}>
                                {getStatusLabel(selectedContact.status)}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Contact</label>
                                <p className="text-lg font-bold text-navy-dark">{selectedContact.firstName} {selectedContact.lastName}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Email</label>
                                <p className="text-lg font-medium text-navy-dark">{selectedContact.email}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Entreprise</label>
                                <p className="text-lg font-medium text-navy-dark">{selectedContact.company}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Taille de flotte</label>
                                <p className="text-lg font-medium text-navy-dark">{selectedContact.fleetSize}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Message</label>
                                <p className="text-base font-medium text-navy/80 leading-relaxed">{selectedContact.message}</p>
                            </div>

                            <div>
                                <label className="text-xs font-black text-navy/60 uppercase tracking-wider">Date de soumission</label>
                                <p className="text-base font-medium text-navy-dark">
                                    {new Date(selectedContact.submittedAt).toLocaleString("fr-FR")}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            {selectedContact.status !== 'completed' && (
                                <Button
                                    onClick={() => handleUpdateStatus(selectedContact.id, 'completed')}
                                    className="flex-1 h-12 bg-teal hover:bg-teal-light text-white rounded-xl font-bold"
                                >
                                    Marquer comme traité
                                </Button>
                            )}
                            {selectedContact.status === 'new' && (
                                <Button
                                    onClick={() => handleUpdateStatus(selectedContact.id, 'in-progress')}
                                    className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold"
                                >
                                    Marquer comme en cours
                                </Button>
                            )}
                            <Button
                                onClick={() => setSelectedContact(null)}
                                className="h-12 px-6 bg-zinc-200 hover:bg-zinc-300 text-navy-dark rounded-xl font-bold"
                            >
                                Fermer
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
