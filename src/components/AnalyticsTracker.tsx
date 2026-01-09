
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Debounce or simple check to avoid double counting in strict mode dev if needed, 
        // but for this MVP direct call is fine.
        const trackView = async () => {
            try {
                // Simple unique visitor check (session-based)
                let isNewSession = false;
                if (!sessionStorage.getItem("visited")) {
                    sessionStorage.setItem("visited", "true");
                    isNewSession = true;
                }

                await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: pathname,
                        isNewVisitor: isNewSession
                    }),
                });
            } catch (err) {
                console.error("Analytics error", err);
            }
        };

        trackView();
    }, [pathname]);

    return null;
}
