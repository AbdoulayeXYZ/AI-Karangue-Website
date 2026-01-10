import { NextResponse } from "next/server";
import { trackPageView } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path: pagePath, isNewVisitor } = body;

        if (!pagePath) {
            return NextResponse.json({ error: "Path is required" }, { status: 400 });
        }

        await trackPageView(pagePath, isNewVisitor || false);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics track error:", error);
        return NextResponse.json({ error: "Failed to track" }, { status: 500 });
    }
}
