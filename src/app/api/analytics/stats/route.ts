import { NextResponse } from "next/server";
import { getAnalyticsStats } from "@/lib/db";

export async function GET() {
    try {
        const { analytics, contacts, subscribers } = await getAnalyticsStats();

        // Calculate totals
        const totalVisitors = analytics.reduce((acc: number, day: any) => acc + (day.visitors || 0), 0);
        const totalPageViews = analytics.reduce((acc: number, day: any) => acc + (day.page_views || 0), 0);

        // Conversions = Contacts + Subscribers
        const totalConversions = contacts.length + subscribers.length;

        // Conversion Rate (Conversions / Visitors * 100) - Avoid division by zero
        const conversionRate = totalVisitors > 0
            ? ((totalConversions / totalVisitors) * 100).toFixed(1)
            : "0.0";

        // Aggregate Pages Data (All time)
        const pagesMap: Record<string, number> = {};
        analytics.forEach((day: any) => {
            const pages = day.pages || {};
            Object.entries(pages).forEach(([page, count]) => {
                pagesMap[page] = (pagesMap[page] || 0) + (count as number);
            });
        });

        // Format Page Data for simple bar chart
        const getPageName = (path: string) => {
            if (path === "/") return "Accueil";
            if (path === "/offres") return "Offres";
            if (path === "/solutions") return "Solutions";
            if (path === "/industries") return "Industries";
            if (path === "/contact") return "Contact";
            return path;
        };

        const pageData = Object.entries(pagesMap)
            .map(([path, count]) => ({ name: getPageName(path), visits: count }))
            .sort((a, b) => b.visits - a.visits)
            .slice(0, 5); // Top 5

        // Format Traffic Data (Last 7 days)
        const trafficData = analytics.slice(0, 7).reverse().map((day: any) => {
            // Count conversions for this specific day
            const dayDate = day.date;
            const dayConversions =
                contacts.filter((c: any) => c.submitted_at?.toString().startsWith(dayDate)).length +
                subscribers.filter((s: any) => s.subscribed_at?.toString().startsWith(dayDate)).length;

            return {
                date: new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                visitors: day.visitors || 0,
                pageViews: day.page_views || 0,
                conversions: dayConversions
            };
        });

        return NextResponse.json({
            kpis: {
                totalVisitors,
                totalPageViews,
                totalConversions,
                conversionRate: `${conversionRate}%`
            },
            trafficData,
            pageData,
            sourceData: [
                { name: "Direct", value: 65, color: "#008080" },
                { name: "Google", value: 15, color: "#003366" },
                { name: "LinkedIn", value: 10, color: "#0077B5" },
                { name: "Autres", value: 10, color: "#94A3B8" },
            ]
        });

    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
