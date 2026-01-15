import { NextResponse } from "next/server";
import { updateBlogPost, deleteBlogPost, getBlogPostBySlug, sql } from "@/lib/db";

// Helper to get by ID instead of slug for admin
async function getBlogPostById(id: string) {
    const result = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;
    return result.rows[0];
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Decide if we search by ID (admin) or SLUG (public)
        // For simplicity in this route, we try ID first then SLUG
        let post = await getBlogPostById(id);
        if (!post) {
            post = await getBlogPostBySlug(id);
        }

        if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();
        const post = await updateBlogPost(id, data);
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteBlogPost(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
