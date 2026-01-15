"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Image as ImageIcon, Globe, FileText, Layout, Key, Type } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function BlogPostEditor() {
    const router = useRouter();
    const params = useParams();
    const isNew = params.id === "new";

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [post, setPost] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        category: "Technologie",
        status: "draft"
    });

    useEffect(() => {
        if (!isNew) {
            const loadPost = async () => {
                try {
                    const res = await fetch(`/api/blog/${params.id}`);
                    const data = await res.json();
                    setPost(data);
                } catch (error) {
                    console.error("Failed to load post:", error);
                } finally {
                    setLoading(false);
                }
            };
            loadPost();
        }
    }, [isNew, params.id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = isNew ? "/api/blog" : `/api/blog/${params.id}`;
            const method = isNew ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
            });

            if (res.ok) {
                alert("✅ Article enregistré avec succès !");
                router.push("/admin/blog");
            } else {
                alert("❌ Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("❌ Erreur technique lors de l'enregistrement");
        } finally {
            setSaving(false);
        }
    };

    const updatePost = (field: string, value: string) => {
        setPost(prev => {
            const newPost = { ...prev, [field]: value };
            // Auto-generate slug from title if it's new
            if (field === "title" && isNew) {
                newPost.slug = value.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
            }
            return newPost;
        });
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black text-navy/20 uppercase tracking-[0.2em] animate-pulse">
            Chargement de l'éditeur...
        </div>
    );

    return (
        <div className="pb-20">
            {/* Header Sticky */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sticky top-4 z-40 bg-[#F0F2F5]/80 backdrop-blur-xl p-4 -mx-4 rounded-3xl border border-white/20 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy/40 hover:text-teal hover:shadow-md transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-navy-dark tracking-tight">
                            {isNew ? "Nouvel Article" : "Éditer l'Article"}
                        </h1>
                        <p className="text-navy/40 font-medium text-xs uppercase tracking-widest">
                            {post.status === 'published' ? 'En ligne' : 'Mode Brouillon'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <select
                        value={post.status}
                        onChange={(e) => updatePost('status', e.target.value)}
                        className="h-12 px-6 bg-white border-none rounded-2xl text-xs font-black uppercase tracking-wider text-navy-dark focus:ring-4 focus:ring-teal/5 outline-none shadow-sm cursor-pointer"
                    >
                        <option value="draft">Brouillon</option>
                        <option value="published">Publier</option>
                    </select>
                    <Button
                        onClick={handleSave}
                        disabled={saving || !post.title}
                        className="bg-teal hover:bg-teal-light text-white h-12 px-8 rounded-2xl text-xs font-black uppercase tracking-wider shadow-xl shadow-teal/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? "Enregistrement..." : <><Save className="w-4 h-4 mr-2" /> Enregistrer</>}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1">Titre de l'article</label>
                            <input
                                type="text"
                                value={post.title}
                                onChange={(e) => updatePost("title", e.target.value)}
                                placeholder="Entrez un titre percutant..."
                                className="w-full text-3xl font-black text-navy-dark placeholder:text-navy/10 border-none bg-transparent focus:ring-0 p-0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Contenu de l'article
                            </label>
                            <textarea
                                value={post.content}
                                onChange={(e) => updatePost("content", e.target.value)}
                                rows={20}
                                placeholder="Rédigez votre contenu ici (supporte le Markdown)..."
                                className="w-full p-4 bg-zinc-50 border border-transparent focus:border-teal/20 rounded-2xl text-navy/80 font-medium leading-relaxed focus:bg-white focus:ring-4 focus:ring-teal/5 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 space-y-8">
                        {/* URL Slug */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                                <Globe className="w-3 h-3" /> Permalien (Slug)
                            </label>
                            <div className="flex items-center gap-2 p-2 px-3 bg-zinc-50 rounded-xl border border-transparent focus-within:border-teal/20 transition-all">
                                <span className="text-[10px] font-bold text-navy/20">/blog/</span>
                                <input
                                    type="text"
                                    value={post.slug}
                                    onChange={(e) => updatePost("slug", e.target.value)}
                                    className="flex-1 bg-transparent border-none text-xs font-bold text-navy-dark focus:ring-0 p-0"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                                <Type className="w-3 h-3" /> Catégorie
                            </label>
                            <select
                                value={post.category}
                                onChange={(e) => updatePost("category", e.target.value)}
                                className="w-full h-11 px-4 bg-zinc-50 rounded-xl border-none text-xs font-bold text-navy-dark focus:ring-4 focus:ring-teal/5 outline-none"
                            >
                                <option>Technologie</option>
                                <option>Intelligence Artificielle</option>
                                <option>Sécurité Routière</option>
                                <option>IoT & Transport</option>
                                <option>Actualités</option>
                            </select>
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" /> Image de couverture (URL)
                            </label>
                            <input
                                type="text"
                                value={post.coverImage}
                                onChange={(e) => updatePost("coverImage", e.target.value)}
                                placeholder="https://..."
                                className="w-full h-11 px-4 bg-zinc-50 rounded-xl border-none text-xs font-bold text-navy-dark placeholder:text-navy/20 focus:ring-4 focus:ring-teal/5 outline-none"
                            />
                            {post.coverImage && (
                                <div className="relative mt-4 rounded-2xl overflow-hidden border border-zinc-100 aspect-video">
                                    <img src={post.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-navy/40 uppercase tracking-widest flex items-center gap-2">
                                <Layout className="w-3 h-3" /> Extrait (Résumé)
                            </label>
                            <textarea
                                value={post.excerpt}
                                onChange={(e) => updatePost("excerpt", e.target.value)}
                                rows={4}
                                placeholder="Un court résumé pour les cartes d'aperçu..."
                                className="w-full p-4 bg-zinc-50 rounded-xl border-none text-xs font-bold text-navy-dark placeholder:text-navy/20 focus:ring-4 focus:ring-teal/5 outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
