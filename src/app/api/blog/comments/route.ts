import { NextResponse } from "next/server";
import { createComment, getCommentsByPostId, getPendingComments } from "@/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const isPendingOnly = searchParams.get("pending") === "true";

    try {
        if (isPendingOnly) {
            const comments = await getPendingComments();
            return NextResponse.json(comments);
        }

        if (!postId) return NextResponse.json({ error: "postId is required" }, { status: 400 });
        const comments = await getCommentsByPostId(postId);
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const comment = await createComment(data);
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 });
    }
}
