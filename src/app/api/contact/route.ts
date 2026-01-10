
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/contacts.json");
const IS_PRODUCTION = process.env.VERCEL || process.env.NETLIFY;

interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    fleetSize: string;
    message?: string;
    submittedAt: string;
    status: "new" | "in-progress" | "completed";
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

// GET: Retrieve all contacts
export async function GET() {
    // In production, return empty array (no persistent storage)
    if (IS_PRODUCTION) {
        console.log("[Contacts] Production mode - returning empty contacts");
        return NextResponse.json([]);
    }

    await ensureDataFile();
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const contacts: Contact[] = JSON.parse(data);
        // Sort by newest first
        contacts.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}

// POST: Submit a new contact form
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, company, fleetSize, message } = body;

        if (!firstName || !lastName || !email || !company) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContact: Contact = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            company,
            fleetSize,
            message,
            submittedAt: new Date().toISOString(),
            status: "new"
        };

        // In production, just return success without saving
        // TODO: Send email notification or save to external service
        if (IS_PRODUCTION) {
            console.log("[Contacts] Production mode - contact received but not saved:", { email, company });
            // TODO: Implement email notification here
            return NextResponse.json(newContact, { status: 201 });
        }

        // Local development: save to file
        await ensureDataFile();
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        const contacts: Contact[] = JSON.parse(data);
        contacts.unshift(newContact);
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(contacts, null, 2));

        return NextResponse.json(newContact, { status: 201 });
    } catch (error) {
        console.error("Error saving contact:", error);
        return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
    }
}
