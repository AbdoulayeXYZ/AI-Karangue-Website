"use client";

import React from "react";
import { Linkedin, Facebook } from "lucide-react";

interface ShareButtonsProps {
    title: string;
}

export const ShareButtons = ({ title }: ShareButtonsProps) => {
    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    };

    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnWhatsApp = () => {
        const url = window.location.href;
        const text = encodeURIComponent(`${title} ${url}`);
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    return (
        <aside className="lg:w-20 flex lg:flex-col gap-6 sticky top-40 h-fit order-2 lg:order-1">
            <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 vertical-text hidden lg:block mb-4">SHARE</div>

            <button
                onClick={shareOnLinkedIn}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group"
                title="Partager sur LinkedIn"
            >
                <Linkedin className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            </button>

            <button
                onClick={shareOnFacebook}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group"
                title="Partager sur Facebook"
            >
                <Facebook className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            </button>

            <button
                onClick={shareOnWhatsApp}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-teal hover:border-teal transition-all duration-500 group"
                title="Partager sur WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/40 group-hover:text-white transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 8.39c-2.003 0-3.96-.539-5.673-1.56L3 22.1l1.281-4.685c-1.113-1.613-1.699-3.52-1.699-5.464 0-5.513 4.486-10 10-10 2.67 0 5.181 1.04 7.07 2.93 1.89 1.89 2.93 4.401 2.93 7.07 0 5.513-4.486 10-10 10M12.355 0C5.54 0 0 5.54 0 12.355c0 2.181.571 4.31 1.655 6.193L0 24l5.594-1.467c1.802 1.026 3.844 1.567 5.923 1.567 6.815 0 12.355-5.54 12.355-12.355 0-3.284-1.278-6.37-3.6-8.692C17.95 1.278 14.864 0 12.355 0" />
                </svg>
            </button>
        </aside>
    );
};
