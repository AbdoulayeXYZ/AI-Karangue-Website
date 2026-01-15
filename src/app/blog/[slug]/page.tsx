import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, Calendar, User, MessageCircle, Share2, Linkedin, Facebook, Calculator, Mail } from "lucide-react";
import Link from "next/link";
import { getBlogPostBySlug, getCommentsByPostId } from "@/lib/db";
import { getContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { CommentSection } from "@/components/blog/CommentSection";

import { ShareButtons } from "@/components/blog/ShareButtons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "Article introuvable" };

    return {
        title: `${post.title} | Blog AI-Karangué`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.cover_image],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Server-side data fetching
    const [post, content] = await Promise.all([
        getBlogPostBySlug(slug),
        getContent()
    ]);

    if (!post) {
        return (
            <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black mb-8 uppercase tracking-widest text-white/20">Article introuvable</h1>
                <Link href="/blog">
                    <Button className="bg-teal text-white font-black px-12 h-14 rounded-2xl">
                        RETOUR AU BLOG
                    </Button>
                </Link>
            </div>
        );
    }

    const comments = await getCommentsByPostId(post.id);
    const date = new Date(post.created_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <main className="min-h-screen bg-navy text-white selection:bg-teal selection:text-white">
            <Navbar />

            {/* Immersive Header */}
            <header className="relative pt-48 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

                {/* Background image blur */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover blur-[120px] scale-150" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-teal font-black text-[10px] uppercase tracking-[0.4em] mb-16 hover:gap-6 transition-all duration-500">
                        <ArrowLeft className="w-4 h-4" /> RETOUR AU BLOG
                    </Link>

                    <div className="max-w-5xl">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="px-4 py-1.5 rounded-full bg-teal/20 backdrop-blur-md border border-teal/20 text-teal text-[10px] font-black uppercase tracking-[0.2em]">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <User className="w-5 h-5 text-teal" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-teal/40" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Image Section */}
            <section className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Content Body */}
            <article className="py-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Sidebar Share (Client Component) */}
                        <ShareButtons title={post.title} />

                        {/* Text Content */}
                        <div className="flex-1 order-1 lg:order-2">
                            <div className="max-w-3xl">
                                <div
                                    className="blog-content text-xl md:text-2xl text-white/70 leading-relaxed font-medium space-y-12"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content
                                            .replace(/^# (.*$)/gim, '<h1 class="text-6xl font-black mb-16 uppercase tracking-tighter text-white">$1</h1>')
                                            .replace(/^## (.*$)/gim, '<h2 class="text-4xl font-black mt-24 mb-10 uppercase tracking-tight text-white">$1</h2>')
                                            .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-black mt-16 mb-8 uppercase text-teal">$1</h3>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>')
                                            .replace(/^\s*\n/gm, '<br/>')
                                            .replace(/\n\d\. (.*)/g, '<li class="ml-6 list-decimal font-bold">$1</li>')
                                            .replace(/\n- (.*)/g, '<li class="ml-6 list-disc font-bold">$1</li>')
                                    }}
                                />

                                {/* Interactive Comments */}
                                <CommentSection postId={post.id} initialComments={JSON.parse(JSON.stringify(comments))} />
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related/Final CTA */}
            <section className="py-40 bg-navy-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter leading-tight">
                        PRÊT À RÉVOLUTIONNER <br />
                        <span className="text-teal underline decoration-white/10 underline-offset-8">VOTRE FLOTTE ?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link href="/solutions">
                            <Button className="h-16 px-12 bg-teal hover:bg-teal-light text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-teal/30">
                                DÉCOUVRIR NOS SOLUTIONS
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button className="h-16 px-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]">
                                NOUS CONTACTER
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer content={content.footer} />
        </main>
    );
}
