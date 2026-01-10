
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/analytics.json");
const IS_PRODUCTION = process.env.VERCEL || process.env.NETLIFY;

interface DailyStats {
    date: string;
    visitors: number;
    pageViews: number;
    pages: Record<string, number>;
}

// Helper to ensure data file exists
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        // Initialize with empty array or object
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2));
    }
}

export async function POST(request: Request) {
    // In production (Vercel/Netlify), file system is read-only
    // Return success without actually writing to avoid errors
    if (IS_PRODUCTION) {
        console.log("[Analytics] Production mode - tracking disabled (no persistent storage)");
        return NextResponse.json({ success: true, note: "Analytics disabled in production" });
    }

    await ensureDataFile();
    try {
        const body = await request.json();
        const { path: pagePath, isNewVisitor } = body;

        // Use today's date YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        const dataContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        let stats: DailyStats[] = JSON.parse(dataContent);

        let todayStats = stats.find(s => s.date === today);

        if (!todayStats) {
            todayStats = {
                date: today,
                visitors: 0,
                pageViews: 0,
                pages: {}
            };
            stats.push(todayStats);
        }

        // Update stats
        todayStats.pageViews += 1;
        if (isNewVisitor) {
            todayStats.visitors += 1;
        }

        // Track specific page
        if (pagePath) {
            todayStats.pages[pagePath] = (todayStats.pages[pagePath] || 0) + 1;
        }

        // Keep only last 30 days to keep file size managed (optional, but good practice)
        if (stats.length > 30) {
            stats = stats.slice(-30);
        }

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(stats, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics track error:", error);
        return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }
}
