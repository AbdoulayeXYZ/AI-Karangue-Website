
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { defaultContent, SiteContent } from "@/lib/content";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/content.json");

// Helper to ensure data file exists
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        // Initialize with default content if not exists
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(defaultContent, null, 2));
    }
}

export async function GET() {
    await ensureDataFile();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const content: SiteContent = JSON.parse(data);
        return NextResponse.json(content);
    } catch (error) {
        console.error("Failed to read content file:", error);
        return NextResponse.json(defaultContent); // Fallback
    }
}

export async function POST(request: Request) {
    await ensureDataFile();
    try {
        const body = await request.json();
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save content:", error);
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
