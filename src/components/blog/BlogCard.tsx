"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        cover_image: string;
        category: string;
        author: string;
        created_at: string;
    };
    index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
    const date = new Date(post.created_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-[450px] rounded-[32px] overflow-hidden border border-white/5 bg-navy-dark/50 backdrop-blur-sm transition-all duration-500 group-hover:border-teal/30 group-hover:shadow-2xl group-hover:shadow-teal/10">
                    {/* Image Container */}
                    <div className="absolute inset-0">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/20 backdrop-blur-md border border-teal/30 text-teal text-[10px] font-black uppercase tracking-[0.2em]">
                                {post.category}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-teal transition-colors duration-300">
                            {post.title}
                        </h3>

                        <p className="text-white/50 text-sm font-medium mb-8 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {date}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-teal group-hover:border-teal transition-all duration-500">
                                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
