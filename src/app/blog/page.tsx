"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Calendar, Clock, ChevronRight, Search, Hash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getContent } from "@/lib/content";

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>(null);
    const [activeCategory, setActiveCategory] = useState("Tous");

    useEffect(() => {
        const load = async () => {
            try {
                // Load content first or in parallel, but handle separately
                const contentData = await getContent();
                setContent(contentData);

                const postsRes = await fetch("/api/blog");
                if (postsRes.ok) {
                    const postsData = await postsRes.json();
                    if (Array.isArray(postsData)) {
                        setPosts(postsData);
                    } else {
                        console.error("Blog API error:", postsData.error || postsData);
                        setPosts([]);
                    }
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Failed to load blog:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const categories = ["Tous", ...new Set(posts.map(p => p.category))];
    const filteredPosts = activeCategory === "Tous"
        ? posts
        : posts.filter(p => p.category === activeCategory);

    const featuredPost = posts[0];

    if (loading) return null;

    return (
        <main className="min-h-screen bg-navy text-white selection:bg-teal selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy-dark via-navy to-navy pointer-events-none" />
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 text-teal text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-teal/20">
                                AI-Karangué Insights
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                                Explorer le futur de la <span className="text-teal">Mobilité Intelligente.</span>
                            </h1>
                            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                                Analyses de pointe, études de cas et innovations technologiques pour transformer la sécurité routière et la gestion de flotte en Afrique.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && activeCategory === "Tous" && (
                <section className="pb-20">
                    <div className="container mx-auto px-6">
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group relative aspect-[21/9] md:aspect-[25/9] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl"
                            >
                                <img
                                    src={featuredPost.cover_image}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-80"
                                    alt={featuredPost.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full max-w-4xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1.5 bg-teal text-white text-[10px] font-black uppercase tracking-widest rounded-lg">À la une</span>
                                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> {new Date(featuredPost.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight group-hover:text-teal transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-white/60 text-lg font-medium line-clamp-2 max-w-2xl mb-8 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-teal font-black text-[10px] uppercase tracking-widest group-hover:gap-6 transition-all">
                                        Lire l'article <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Categories & Search */}
            <section className="sticky top-20 z-50 bg-navy/80 backdrop-blur-2xl border-y border-white/5 py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat
                                    ? "bg-teal text-white border-teal shadow-lg shadow-teal/20"
                                    : "bg-white/5 text-white/40 border-transparent hover:bg-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-teal transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher un sujet..."
                            className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-teal/10 focus:bg-white/10 transition-all placeholder:text-white/20"
                        />
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-white/5">
                                        <img
                                            src={post.cover_image}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90"
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-x-4 bottom-4 p-4 bg-navy-dark/60 backdrop-blur-xl rounded-2xl border border-white/5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-teal">{post.category}</span>
                                                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3 text-teal" /> 5 min read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black mb-3 leading-tight group-hover:text-teal transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                                        L'article complet <ChevronRight className="w-4 h-4 text-teal" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    {filteredPosts.length === 0 && (
                        <div className="py-20 text-center">
                            <Hash className="w-16 h-16 text-white/5 mx-auto mb-6" />
                            <h3 className="text-2xl font-black mb-2 opacity-20">Aucun article dans cette catégorie</h3>
                            <button onClick={() => setActiveCategory("Tous")} className="text-teal font-black text-xs uppercase tracking-widest">Voir tout le blog</button>
                        </div>
                    )}
                </div>
            </section>

            <Footer content={content} />
        </main>
    );
}
