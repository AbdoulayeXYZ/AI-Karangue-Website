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
            <header className="relative pt-48 pb-32 overflow-hidden bg-navy-dark">
                <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-2xl z-0" />

                {/* Background image blur */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-[-1]">
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover blur-[100px] scale-125" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-teal font-black text-[9px] uppercase tracking-[0.4em] mb-12 hover:gap-6 transition-all duration-500">
                        <ArrowLeft className="w-4 h-4" /> RETOUR AU BLOG
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="px-3 py-1 rounded-full bg-teal/20 backdrop-blur-md border border-teal/20 text-teal text-[9px] font-black uppercase tracking-[0.2em]">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                    <User className="w-4 h-4 text-teal" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-teal/40" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content Section (White Background) */}
            <div className="bg-white text-navy selection:bg-teal selection:text-white">
                <section className="container mx-auto px-6 relative z-20 -mt-16">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-3xl shadow-black/20">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                </section>

                <article className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-20">
                            {/* Sidebar Share (Client Component) */}
                            <div className="lg:w-48 order-2 lg:order-1">
                                <ShareButtons title={post.title} />
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 order-1 lg:order-2">
                                <div className="max-w-3xl">
                                    <div
                                        className="blog-content text-lg text-navy/70 leading-relaxed font-medium space-y-10"
                                        dangerouslySetInnerHTML={{
                                            __html: post.content
                                                .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-black mb-12 uppercase tracking-tighter text-navy">$1</h1>')
                                                .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-black mt-20 mb-8 uppercase tracking-tight text-navy">$1</h2>')
                                                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-black mt-16 mb-6 uppercase text-teal">$1</h3>')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-navy font-black">$1</strong>')
                                                .replace(/^\s*\n/gm, '<br/>')
                                                .replace(/\n\d\. (.*)/g, '<li class="ml-6 list-decimal font-bold">$1</li>')
                                                .replace(/\n- (.*)/g, '<li class="ml-6 list-disc font-bold">$1</li>')
                                        }}
                                    />

                                    {/* Related/Final CTA */}
                                    <div className="mt-24 p-12 rounded-[40px] bg-navy text-white relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent pointer-events-none" />
                                        <div className="relative z-10 text-center">
                                            <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tighter leading-tight">
                                                PRÊT À RÉVOLUTIONNER <br />
                                                <span className="text-teal underline decoration-white/10 underline-offset-8">VOTRE FLOTTE ?</span>
                                            </h2>
                                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                                <Link href="/solutions">
                                                    <Button className="h-14 px-10 bg-teal hover:bg-teal-light text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] shadow-2xl shadow-teal/30 transition-all">
                                                        DÉCOUVRIR NOS SOLUTIONS
                                                    </Button>
                                                </Link>
                                                <Link href="/contact">
                                                    <Button className="h-14 px-10 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] transition-all">
                                                        NOUS CONTACTER
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interactive Comments */}
                                    <div className="text-navy">
                                        <CommentSection postId={post.id} initialComments={JSON.parse(JSON.stringify(comments))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <Footer content={content.footer} />
        </main>
    );
}
