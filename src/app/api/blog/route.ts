import { NextResponse } from "next/server";
import { getAllBlogPosts, createBlogPost } from "@/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    try {
        const posts = await getAllBlogPosts(!isAdmin);
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const post = await createBlogPost(data);
        return NextResponse.json(post);
    } catch (error) {
        console.error("API POST Error:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
