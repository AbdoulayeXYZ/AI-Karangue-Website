import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getAllBlogPosts } from "@/lib/db";
import { getContent } from "@/lib/content";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const metadata = {
    title: "Blog | AI-Karangué - Intelligence Artificielle et Sécurité Routière",
    description: "Découvrez nos derniers articles sur l'IA, l'IoT et le futur de la mobilité intelligente en Afrique."
};

export default async function BlogPage() {
    // Fetch data directly on the server for maximum speed
    const [posts, content] = await Promise.all([
        getAllBlogPosts(true),
        getContent()
    ]);

    return (
        <main className="min-h-screen bg-navy text-white selection:bg-teal selection:text-white">
            <Navbar />

            {/* Hero Section - Professional & Minimalist */}
            <header className="relative pt-48 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-px bg-teal" />
                            <span className="text-teal font-black text-[10px] uppercase tracking-[0.4em]">Insights & Vision</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter">
                            NOTRE <br />
                            <span className="text-teal">PERSPECTIVE.</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl leading-relaxed font-medium">
                            Analyses, innovations et visions sur la transformation de la mobilité en Afrique par l'intelligence artificielle.
                        </p>
                    </div>
                </div>

                {/* Atmospheric elements */}
                <div className="absolute -right-24 top-1/4 w-96 h-96 bg-teal/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -left-24 bottom-0 w-72 h-72 bg-navy-light/20 blur-[100px] rounded-full pointer-events-none" />
            </header>

            {/* Main Content Component (Client-side for interactivity) */}
            <BlogGrid initialPosts={JSON.parse(JSON.stringify(posts))} />

            <Footer content={content.footer} />
        </main>
    );
}
