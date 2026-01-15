"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, Calendar, User, MessageCircle, Share2, Linkedin, Facebook, Send, CheckCircle2, Calculator, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContent } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>(null);
    const [commentUser, setCommentUser] = useState({ name: "", email: "", content: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const contentData = await getContent();
                setContent(contentData);

                const postRes = await fetch(`/api/blog/${params.slug}`);
                if (postRes.ok) {
                    const postData = await postRes.json();
                    if (postData && postData.id) {
                        setPost(postData);

                        const commentsRes = await fetch(`/api/blog/comments?postId=${postData.id}`);
                        if (commentsRes.ok) {
                            const commentsData = await commentsRes.json();
                            setComments(Array.isArray(commentsData) ? commentsData : []);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load post:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [params.slug]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/blog/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...commentUser, postId: post.id })
            });
            if (res.ok) {
                setSubmitted(true);
                setCommentUser({ name: "", email: "", content: "" });
            }
        } catch (error) {
            alert("Erreur lors de l'envoi du commentaire");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return null;
    if (!post) return (
        <div className="min-h-screen bg-navy flex items-center justify-center font-black uppercase tracking-[0.3em] text-white/20">
            Article introuvable
        </div>
    );

    return (
        <main className="min-h-screen bg-navy text-white selection:bg-teal selection:text-white">
            <Navbar />

            {/* Post Header */}
            <header className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark pointer-events-none" />
                <div className="absolute inset-0 opacity-40">
                    <img src={post.cover_image} alt="" className="w-full h-full object-cover blur-3xl scale-125" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-navy pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/blog" className="inline-flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:gap-4 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Retour au Blog
                        </Link>

                        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                            <span className="px-4 py-1.5 rounded-lg bg-teal text-white text-[10px] font-black uppercase tracking-widest border border-teal/20">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                <Calendar className="w-3 h-3 text-teal" /> {new Date(post.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                <User className="w-3 h-3 text-teal" /> {post.author}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter max-w-5xl mx-auto">
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </header>

            <section className="pb-32 relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Cover Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-video rounded-[3rem] overflow-hidden -mt-20 border border-white/10 shadow-3xl shadow-navy-dark/50 mb-20"
                        >
                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Article Content */}
                        <article className="prose prose-invert prose-lg max-w-none prose-p:text-white/60 prose-p:font-medium prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tighter prose-strong:text-white prose-strong:font-black prose-teal prose-blockquote:border-teal prose-blockquote:bg-teal/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-img:rounded-3xl">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
                        </article>

                        {/* Sharing & Keywords */}
                        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Partager</span>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-teal hover:text-white transition-all flex items-center justify-center text-white/40">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-teal hover:text-white transition-all flex items-center justify-center text-white/40">
                                        <Facebook className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-teal hover:text-white transition-all flex items-center justify-center text-white/40">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Integrated CTA Section */}
                        <div className="mt-32 p-10 md:p-16 rounded-[4rem] bg-gradient-to-br from-teal via-teal-dark to-navy relative overflow-hidden group border border-white/10">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full -mr-40 -mt-40 animate-pulse" />
                            <div className="relative z-10 text-center">
                                <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter italic">Optimisez votre sécurité avec l'IA.</h3>
                                <p className="text-white/80 font-bold max-w-xl mx-auto mb-10 uppercase tracking-widest text-[10px]">Prêt à transformer la gestion de votre flotte ?</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href="/offres#calculator">
                                        <Button className="bg-white text-navy hover:scale-105 h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all">
                                            <Calculator className="w-4 h-4 mr-2 text-teal" /> Calculateur ROI
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button className="bg-navy-dark text-white border border-white/10 hover:bg-navy h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                                            <Mail className="w-4 h-4 mr-2 text-teal" /> Nous Contacter
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-32">
                            <div className="flex items-center gap-4 mb-12">
                                <MessageCircle className="w-8 h-8 text-teal" />
                                <h3 className="text-3xl font-black tracking-tighter">Réactions de la communauté</h3>
                            </div>

                            {/* Comment Form */}
                            <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] mb-16">
                                {submitted ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                                        <CheckCircle2 className="w-16 h-16 text-teal mb-4" />
                                        <h4 className="text-2xl font-black mb-2">Merci pour votre réaction !</h4>
                                        <p className="text-white/40 font-medium">Votre commentaire a été envoyé pour modération et apparaîtra bientôt.</p>
                                        <button onClick={() => setSubmitted(false)} className="mt-6 text-teal font-black text-[10px] uppercase tracking-widest">En laisser un autre</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleCommentSubmit} className="space-y-6 text-white">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Votre Nom</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={commentUser.name}
                                                    onChange={(e) => setCommentUser({ ...commentUser, name: e.target.value })}
                                                    className="w-full h-14 px-6 bg-white/5 border border-white/5 focus:border-teal/30 rounded-2xl outline-none text-sm font-bold placeholder:text-white/10 focus:bg-white/10 transition-all font-sans"
                                                    placeholder="Jean Dupont"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">E-mail</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={commentUser.email}
                                                    onChange={(e) => setCommentUser({ ...commentUser, email: e.target.value })}
                                                    className="w-full h-14 px-6 bg-white/5 border border-white/5 focus:border-teal/30 rounded-2xl outline-none text-sm font-bold placeholder:text-white/10 focus:bg-white/10 transition-all font-sans"
                                                    placeholder="jean@exemple.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Votre Commentaire</label>
                                            <textarea
                                                required
                                                value={commentUser.content}
                                                onChange={(e) => setCommentUser({ ...commentUser, content: e.target.value })}
                                                rows={5}
                                                className="w-full p-6 bg-white/5 border border-white/5 focus:border-teal/30 rounded-3xl outline-none text-sm font-bold placeholder:text-white/10 focus:bg-white/10 transition-all resize-none font-sans"
                                                placeholder="Partagez vos réflexions avec nous..."
                                            />
                                        </div>
                                        <Button
                                            disabled={isSubmitting}
                                            className="w-full h-14 bg-teal hover:bg-teal-light text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal/10 transition-all"
                                        >
                                            {isSubmitting ? "Envoi en cours..." : <><Send className="w-4 h-4 mr-2" /> Publier mon commentaire</>}
                                        </Button>
                                    </form>
                                )}
                            </div>

                            {/* Comment List */}
                            <div className="space-y-8">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-6 p-2 group">
                                        <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal font-black text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {comment.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-black text-white leading-none">{comment.author_name}</h4>
                                                <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-white/60 text-sm font-medium leading-relaxed italic">
                                                "{comment.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {comments.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-white/20 font-black text-[10px] uppercase tracking-widest">Soyez le premier à réagir !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer content={content?.footer} />
        </main>
    );
}
