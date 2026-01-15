import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, Calendar, User, MessageCircle, Share2, Linkedin, Facebook, Calculator, Mail } from "lucide-react";
import Link from "next/link";
import { getBlogPostBySlug, getCommentsByPostId } from "@/lib/db";
import { getContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { CommentSection } from "@/components/blog/CommentSection";

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
                        {/* Sidebar Share */}
                        <aside className="lg:w-20 flex lg:flex-col gap-6 sticky top-40 h-fit order-2 lg:order-1">
                            <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 vertical-text hidden lg:block mb-4">SHARE</div>
                            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group">
                                <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group">
                                <Facebook className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                            </button>
                            <button
                                onClick={() => {
                                    if (typeof window !== "undefined") {
                                        window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank");
                                    }
                                }}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/40 group-hover:text-white transition-colors"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 8.39c-2.003 0-3.96-.539-5.673-1.56L3 22.1l1.281-4.685c-1.113-1.613-1.699-3.52-1.699-5.464 0-5.513 4.486-10 10-10 2.67 0 5.181 1.04 7.07 2.93 1.89 1.89 2.93 4.401 2.93 7.07 0 5.513-4.486 10-10 10M12.355 0C5.54 0 0 5.54 0 12.355c0 2.181.571 4.31 1.655 6.193L0 24l5.594-1.467c1.802 1.026 3.844 1.567 5.923 1.567 6.815 0 12.355-5.54 12.355-12.355 0-3.284-1.278-6.37-3.6-8.692C17.95 1.278 14.864 0 12.355 0"></path></svg>
                            </button>
                        </aside>

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
