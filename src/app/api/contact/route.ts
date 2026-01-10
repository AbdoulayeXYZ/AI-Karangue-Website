import { NextResponse } from "next/server";
import { createContact, getAllContacts } from "@/lib/db";

// GET: Retrieve all contacts
export async function GET() {
    try {
        const contacts = await getAllContacts();
        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
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

        const newContact = await createContact({
            firstName,
            lastName,
            email,
            company,
            fleetSize,
            message
        });

        return NextResponse.json(newContact, { status: 201 });
    } catch (error) {
        console.error("Error saving contact:", error);
        return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 });
    }
}
