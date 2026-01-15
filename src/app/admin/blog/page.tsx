"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, MessageSquare, Check, X, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function BlogAdminPage() {
    const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
    const [posts, setPosts] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // In a real implementation, these would be fetch calls to the API routes we'll create
                const postsRes = await fetch("/api/blog?admin=true");
                const postsData = await postsRes.json();
                setPosts(postsData);

                const commentsRes = await fetch("/api/blog/comments?pending=true");
                const commentsData = await commentsRes.json();
                setComments(commentsData);
            } catch (error) {
                console.error("Failed to load blog data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [activeTab]);

    const handleDeletePost = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            alert("Erreur lors de la suppression");
        }
    };

    const handleCommentAction = async (id: string, action: "approved" | "rejected") => {
        try {
            const res = await fetch(`/api/blog/comments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: action })
            });
            if (res.ok) {
                setComments(comments.filter(c => c.id !== id));
                alert(action === "approved" ? "Commentaire approuvé !" : "Commentaire rejeté.");
            }
        } catch (error) {
            alert("Erreur lors de la modération");
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-navy-dark tracking-tight">Gestion du Blog</h1>
                    <p className="text-navy/50 font-medium text-sm">Créez du contenu et gérez les interactions de votre communauté.</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="bg-teal hover:bg-teal-light text-white h-12 px-8 rounded-2xl font-black uppercase tracking-wider text-xs shadow-xl shadow-teal/20 transition-all active:scale-95">
                        <Plus className="w-5 h-5 mr-2" /> Nouvel Article
                    </Button>
                </Link>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex p-1 bg-zinc-100 rounded-xl">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "posts" ? "bg-white text-teal shadow-sm" : "text-navy/40 hover:text-navy/60"
                            }`}
                    >
                        Articles ({posts.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("comments")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "comments" ? "bg-white text-teal shadow-sm" : "text-navy/40 hover:text-navy/60"
                            }`}
                    >
                        Modération ({comments.length})
                        {comments.length > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" />}
                    </button>
                </div>

                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/20" />
                    <input
                        type="text"
                        placeholder={activeTab === "posts" ? "Rechercher un article..." : "Rechercher un commentaire..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-transparent border-none text-sm font-bold text-navy-dark placeholder:text-navy/20 focus:outline-none"
                    />
                </div>
            </div>

            {/* List View */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "posts" ? (
                        <div className="grid grid-cols-1 gap-4">
                            {loading ? (
                                <div className="h-64 flex items-center justify-center text-navy/20 font-bold uppercase tracking-widest animate-pulse">
                                    Chargement des articles...
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="h-64 bg-white rounded-3xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4">
                                        <AlertCircle className="w-8 h-8 text-navy/10" />
                                    </div>
                                    <h3 className="text-navy-dark font-black text-lg mb-2">Aucun article trouvé</h3>
                                    <p className="text-navy/40 text-sm max-w-xs font-medium">Commencez par créer votre premier article pour alimenter votre blog.</p>
                                </div>
                            ) : (
                                filteredPosts.map((post) => (
                                    <div key={post.id} className="group bg-white p-4 rounded-3xl border border-zinc-100 hover:border-teal/20 transition-all hover:shadow-xl hover:shadow-teal/5 flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="w-full md:w-32 h-24 rounded-2xl bg-zinc-100 overflow-hidden flex-shrink-0 relative">
                                            {post.cover_image && (
                                                <img src={post.cover_image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-1 rounded-md bg-teal/5 text-teal text-[10px] font-black uppercase tracking-wider">{post.category}</span>
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-zinc-100 text-zinc-500'
                                                    }`}>
                                                    {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-black text-navy-dark leading-snug group-hover:text-teal transition-colors mb-1">{post.title}</h3>
                                            <p className="text-navy/40 text-xs font-medium line-clamp-1">{post.excerpt}</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:border-l border-zinc-100 md:pl-6">
                                            <Link href={`/admin/blog/${post.id}`}>
                                                <button className="w-10 h-10 rounded-xl bg-zinc-50 hover:bg-teal hover:text-white transition-all flex items-center justify-center text-navy/40">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="w-10 h-10 rounded-xl bg-zinc-50 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center text-navy/40"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {comments.length === 0 ? (
                                <div className="h-64 bg-white rounded-3xl border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4">
                                        <MessageSquare className="w-8 h-8 text-navy/10" />
                                    </div>
                                    <h3 className="text-navy-dark font-black text-lg mb-2">Aucun commentaire en attente</h3>
                                    <p className="text-navy/40 text-sm max-w-xs font-medium">Tous les commentaires ont été traités. Beau travail de modération !</p>
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-white p-6 rounded-3xl border border-zinc-100 flex flex-col gap-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-navy-dark flex items-center justify-center text-white text-xs font-black">
                                                    {comment.author_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-navy-dark text-sm leading-none mb-1">{comment.author_name}</h4>
                                                    <p className="text-navy/40 text-[10px] font-bold uppercase tracking-wider">sur <span className="text-teal">{comment.post_title}</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleCommentAction(comment.id, 'approved')}
                                                    className="h-9 px-4 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-wider flex items-center gap-2"
                                                >
                                                    <Check className="w-3 h-3" /> Approuver
                                                </button>
                                                <button
                                                    onClick={() => handleCommentAction(comment.id, 'rejected')}
                                                    className="h-9 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-wider flex items-center gap-2"
                                                >
                                                    <X className="w-3 h-3" /> Rejeter
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-navy/60 text-sm font-medium italic leading-relaxed pl-13">
                                            "{comment.content}"
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
