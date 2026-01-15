"use client";

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { BlogCard } from "./BlogCard";

interface BlogGridProps {
    initialPosts: any[];
}

export const BlogGrid = ({ initialPosts }: BlogGridProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");

    const categories = ["Tous", ...Array.from(new Set(initialPosts.map(p => p.category)))];

    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                {/* Search & Filter Bar */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 mb-20 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                    <div className="flex flex-wrap items-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 h-11 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${selectedCategory === cat
                                        ? "bg-teal border-teal text-white shadow-lg shadow-teal/20"
                                        : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-teal transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher un sujet..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-12 pr-4 bg-white/5 border border-white/5 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal/30 transition-all font-medium text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-4 h-4 text-white/20 hover:text-white transition-colors" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map((post, i) => (
                            <BlogCard key={post.id} post={post} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center rounded-[40px] border border-dashed border-white/10 bg-white/[0.01]">
                        <p className="text-white/20 font-black text-xs uppercase tracking-[0.5em]">
                            Aucun article trouvé pour votre recherche
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
