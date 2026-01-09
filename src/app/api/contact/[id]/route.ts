
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/contacts.json");

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

// PATCH: Update contact status
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !["new", "in-progress", "completed"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        let contacts: Contact[] = JSON.parse(data);

        const index = contacts.findIndex((c) => c.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }

        contacts[index].status = status;

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(contacts, null, 2));

        return NextResponse.json(contacts[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
    }
}
