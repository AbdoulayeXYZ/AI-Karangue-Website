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

        // Calculate real traffic sources from referrers
        const referrersMap: Record<string, number> = {};
        analytics.forEach((day: any) => {
            const referrers = day.referrers || {};
            Object.entries(referrers).forEach(([source, count]) => {
                referrersMap[source] = (referrersMap[source] || 0) + (count as number);
            });
        });

        // Calculate total and percentages
        const totalReferrers = Object.values(referrersMap).reduce((sum, count) => sum + count, 0);

        // Define colors for each source
        const sourceColors: Record<string, string> = {
            'direct': '#008080',      // Teal
            'google': '#4285F4',      // Google Blue
            'linkedin': '#0077B5',    // LinkedIn Blue
            'facebook': '#1877F2',    // Facebook Blue
            'twitter': '#1DA1F2',     // Twitter Blue
            'instagram': '#E4405F',   // Instagram Pink
            'youtube': '#FF0000',     // YouTube Red
            'other': '#94A3B8'        // Gray
        };

        // Format source data with real percentages
        const sourceData = Object.entries(referrersMap)
            .map(([source, count]) => ({
                name: source.charAt(0).toUpperCase() + source.slice(1),
                value: totalReferrers > 0 ? Math.round((count / totalReferrers) * 100) : 0,
                color: sourceColors[source] || '#94A3B8'
            }))
            .filter(item => item.value > 0) // Only show sources with visits
            .sort((a, b) => b.value - a.value); // Sort by value descending

        return NextResponse.json({
            kpis: {
                totalVisitors,
                totalPageViews,
                totalConversions,
                conversionRate: `${conversionRate}%`
            },
            trafficData,
            pageData,
            sourceData: sourceData.length > 0 ? sourceData : [
                { name: "Direct", value: 100, color: "#008080" }
            ]
        });

    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
