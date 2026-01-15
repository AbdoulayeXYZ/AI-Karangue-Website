import { NextResponse } from "next/server";
import { updateCommentStatus } from "@/lib/db";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();
        const comment = await updateCommentStatus(id, status);
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to moderate comment" }, { status: 500 });
    }
}
