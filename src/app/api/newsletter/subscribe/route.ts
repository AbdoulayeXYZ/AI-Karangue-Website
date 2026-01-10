
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/subscribers.json");
const IS_PRODUCTION = process.env.VERCEL || process.env.NETLIFY;

interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: "active" | "inactive";
    source: string;
}

// Helper to ensure data file exists
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2));
    }
}

// GET: Retrieve all subscribers
export async function GET() {
    // In production, return empty array (no persistent storage)
    if (IS_PRODUCTION) {
        console.log("[Newsletter] Production mode - returning empty subscribers");
        return NextResponse.json([]);
    }

    await ensureDataFile();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const subscribers: Subscriber[] = JSON.parse(data);
        return NextResponse.json(subscribers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}

// POST: Add a new subscriber
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, source = "website" } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const newSubscriber: Subscriber = {
            id: uuidv4(),
            email,
            subscribedAt: new Date().toISOString(),
            status: "active",
            source
        };

        // In production, just return success without saving
        // TODO: Send to email service or external database
        if (IS_PRODUCTION) {
            console.log("[Newsletter] Production mode - subscriber received but not saved:", { email, source });
            // TODO: Implement email service integration here
            return NextResponse.json(newSubscriber, { status: 201 });
        }

        // Local development: save to file
        await ensureDataFile();
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const subscribers: Subscriber[] = JSON.parse(data);

        // Check if already subscribed
        if (subscribers.some(sub => sub.email === email)) {
            return NextResponse.json({ message: "Already subscribed" }, { status: 200 }); // Return 200 to avoid UI errors, just idempotent
        }

        subscribers.unshift(newSubscriber); // Add to top
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(subscribers, null, 2));

        return NextResponse.json(newSubscriber, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}
