import { NextResponse } from "next/server";
import { createSubscriber, getAllSubscribers } from "@/lib/db";

// GET: Retrieve all subscribers
export async function GET() {
    try {
        const subscribers = await getAllSubscribers();
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error("Error fetching subscribers:", error);
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

        const newSubscriber = await createSubscriber(email, source);

        return NextResponse.json(newSubscriber, { status: 201 });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
}
