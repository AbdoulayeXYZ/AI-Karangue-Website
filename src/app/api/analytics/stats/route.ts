
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ANALYTICS_FILE = path.join(process.cwd(), "src/data/analytics.json");
const CONTACTS_FILE = path.join(process.cwd(), "src/data/contacts.json");
const SUBSCRIBERS_FILE = path.join(process.cwd(), "src/data/subscribers.json");

async function readJsonFile(filePath: string, defaultValue: any) {
    try {
        await fs.access(filePath);
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}

export async function GET() {
    try {
        const [analyticsData, contactsData, subscribersData] = await Promise.all([
            readJsonFile(ANALYTICS_FILE, []),
            readJsonFile(CONTACTS_FILE, []),
            readJsonFile(SUBSCRIBERS_FILE, [])
        ]);

        // Calculate totals
        const totalVisitors = analyticsData.reduce((acc: number, day: any) => acc + day.visitors, 0);
        const totalPageViews = analyticsData.reduce((acc: number, day: any) => acc + day.pageViews, 0);

        // Conversions = Contacts + Subscribers
        const totalConversions = contactsData.length + subscribersData.length;

        // Conversion Rate (Conversions / Visitors * 100) - Avoid division by zero
        const conversionRate = totalVisitors > 0
            ? ((totalConversions / totalVisitors) * 100).toFixed(1)
            : "0.0";

        // Aggregate Pages Data (All time)
        const pagesMap: Record<string, number> = {};
        analyticsData.forEach((day: any) => {
            Object.entries(day.pages || {}).forEach(([page, count]) => {
                pagesMap[page] = (pagesMap[page] || 0) + (count as number);
            });
        });

        // Format Page Data for simple bar chart
        // Map common paths to readable names
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

        // Format Traffic Data (Last 7 days or all available)
        // Ensure we have entries for days with no traffic if we wanted to be perfect, 
        // but for now just returning what we have is fine.
        const trafficData = analyticsData.slice(-7).map((day: any) => {
            // Count conversions for this specific day
            const dayConversions =
                contactsData.filter((c: any) => c.submittedAt.startsWith(day.date)).length +
                subscribersData.filter((s: any) => s.subscribedAt && s.subscribedAt.startsWith(day.date)).length;

            return {
                date: new Date(day.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                visitors: day.visitors,
                pageViews: day.pageViews,
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
            // Mock source data as we can't easily track referrer without more complex logic
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
