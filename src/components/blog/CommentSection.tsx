"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CommentSectionProps {
    postId: string;
    initialComments: any[];
}

export const CommentSection = ({ postId, initialComments }: CommentSectionProps) => {
    const [comments, setComments] = useState(initialComments);
    const [commentUser, setCommentUser] = useState({ name: "", email: "", content: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/blog/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...commentUser, postId })
            });
            if (res.ok) {
                setSubmitted(true);
                setCommentUser({ name: "", email: "", content: "" });
            }
        } catch (error) {
            alert("Erreur lors de l''envoi du commentaire");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-32 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
                <MessageCircle className="w-8 h-8 text-teal" />
                <h3 className="text-3xl font-black uppercase tracking-widest">Commentaires ({comments.length})</h3>
            </div>

            {/* Comment List */}
            <div className="space-y-12 mb-24">
                {comments.length > 0 ? (
                    comments.map((comment, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-navy/[0.02] border border-navy/5">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-black text-teal uppercase tracking-widest text-xs">{comment.author_name}</h4>
                                <span className="text-[9px] font-bold text-navy/20 uppercase tracking-[0.2em]">
                                    {new Date(comment.created_at).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                            <p className="text-navy/60 leading-relaxed font-medium text-sm">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center rounded-3xl border border-dashed border-navy/10 bg-navy/[0.01]">
                        <p className="text-navy/20 font-black text-[10px] uppercase tracking-[0.3em]">Soyez le premier à commenter cet article</p>
                    </div>
                )}
            </div>

            {/* Comment Form */}
            <div className="relative p-12 rounded-[40px] bg-navy-dark border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent pointer-events-none" />

                {submitted ? (
                    <div className="py-20 text-center relative z-10">
                        <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-8 animate-bounce" />
                        <h4 className="text-3xl font-black mb-4">MERCI POUR VOTRE MESSAGE</h4>
                        <p className="text-white/40 font-medium">Votre commentaire est en cours de modération et sera visible prochainement.</p>
                        <Button
                            onClick={() => setSubmitted(false)}
                            className="mt-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] px-10 h-14 rounded-2xl"
                        >
                            Écrire un autre commentaire
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleCommentSubmit} className="relative z-10">
                        <h4 className="text-3xl font-black mb-12 uppercase tracking-tight">Rejoindre la discussion</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Votre Nom</label>
                                <input
                                    type="text"
                                    required
                                    value={commentUser.name}
                                    onChange={(e) => setCommentUser({ ...commentUser, name: e.target.value })}
                                    className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-teal/50 transition-all font-medium"
                                    placeholder="Nom complet"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Votre E-mail</label>
                                <input
                                    type="email"
                                    required
                                    value={commentUser.email}
                                    onChange={(e) => setCommentUser({ ...commentUser, email: e.target.value })}
                                    className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-teal/50 transition-all font-medium"
                                    placeholder="email@entreprise.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 mb-10">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Votre Message</label>
                            <textarea
                                required
                                value={commentUser.content}
                                onChange={(e) => setCommentUser({ ...commentUser, content: e.target.value })}
                                className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-[32px] text-white placeholder:text-white/20 focus:outline-none focus:border-teal/50 transition-all font-medium resize-none"
                                placeholder="Partagez vos réflexions..."
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto h-16 px-12 bg-teal hover:bg-teal-light text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-4 group"
                        >
                            {isSubmitting ? "ENVOI EN COURS..." : "PUBLIER LE COMMENTAIRE"}
                            {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};
