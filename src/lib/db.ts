import { sql } from '@vercel/postgres';
export { sql };

/**
 * Database utility functions for Vercel Postgres
 */

// Analytics functions
export async function trackPageView(path: string, isNewVisitor: boolean) {
    const today = new Date().toISOString().split('T')[0];

    try {
        // Try to update existing record
        const result = await sql`
      INSERT INTO analytics (date, visitors, page_views, pages)
      VALUES (${today}, ${isNewVisitor ? 1 : 0}, 1, ${JSON.stringify({ [path]: 1 })}::jsonb)
      ON CONFLICT (date) 
      DO UPDATE SET
        visitors = analytics.visitors + ${isNewVisitor ? 1 : 0},
        page_views = analytics.page_views + 1,
        pages = jsonb_set(
          COALESCE(analytics.pages, '{}'::jsonb),
          ARRAY[${path}],
          to_jsonb(COALESCE((analytics.pages->>${path})::int, 0) + 1)
        ),
        updated_at = NOW()
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error tracking page view:', error);
        throw error;
    }
}

export async function getAnalyticsStats() {
    try {
        // Get last 7 days of analytics
        const analytics = await sql`
      SELECT * FROM analytics 
      ORDER BY date DESC 
      LIMIT 7;
    `;

        // Get all contacts
        const contacts = await sql`
      SELECT * FROM contacts;
    `;

        // Get all subscribers
        const subscribers = await sql`
      SELECT * FROM subscribers 
      WHERE status = 'active';
    `;

        return {
            analytics: analytics.rows,
            contacts: contacts.rows,
            subscribers: subscribers.rows
        };
    } catch (error) {
        console.error('Error getting analytics stats:', error);
        throw error;
    }
}

// Contact functions
export async function createContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    fleetSize?: string;
    message?: string;
}) {
    try {
        const result = await sql`
      INSERT INTO contacts (first_name, last_name, email, company, fleet_size, message)
      VALUES (${data.firstName}, ${data.lastName}, ${data.email}, ${data.company}, ${data.fleetSize || null}, ${data.message || null})
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
}

export async function getAllContacts() {
    try {
        const result = await sql`
      SELECT * FROM contacts 
      ORDER BY submitted_at DESC;
    `;
        return result.rows;
    } catch (error) {
        console.error('Error getting contacts:', error);
        throw error;
    }
}

export async function updateContactStatus(id: string, status: string) {
    try {
        const result = await sql`
      UPDATE contacts 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error updating contact status:', error);
        throw error;
    }
}

// Newsletter functions
export async function createSubscriber(email: string, source: string = 'website') {
    try {
        const result = await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${email}, ${source})
      ON CONFLICT (email) 
      DO UPDATE SET 
        status = 'active',
        subscribed_at = NOW()
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating subscriber:', error);
        throw error;
    }
}

export async function getAllSubscribers() {
    try {
        const result = await sql`
      SELECT * FROM subscribers 
      WHERE status = 'active'
      ORDER BY subscribed_at DESC;
    `;
        return result.rows;
    } catch (error) {
        console.error('Error getting subscribers:', error);
        throw error;
    }
}

// Blog functions
export async function createBlogPost(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author?: string;
    status?: 'draft' | 'published';
}) {
    try {
        const result = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, author, status)
      VALUES (${data.title}, ${data.slug}, ${data.excerpt}, ${data.content}, ${data.coverImage}, ${data.category}, ${data.author || 'Admin'}, ${data.status || 'draft'})
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
}

export async function getAllBlogPosts(onlyPublished: boolean = true) {
    try {
        const result = onlyPublished
            ? await sql`SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC;`
            : await sql`SELECT * FROM blog_posts ORDER BY created_at DESC;`;
        return result.rows;
    } catch (error) {
        console.error('Error getting blog posts:', error);
        throw error;
    }
}

export async function getBlogPostBySlug(slug: string) {
    try {
        const result = await sql`
      SELECT * FROM blog_posts 
      WHERE slug = ${slug} AND status = 'published';
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error getting blog post by slug:', error);
        throw error;
    }
}

export async function updateBlogPost(id: string, data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    status: 'draft' | 'published';
}>) {
    try {
        // Simple manual building of update since @vercel/postgres doesn't have a query builder
        const result = await sql`
            UPDATE blog_posts 
            SET 
                title = COALESCE(${data.title}, title),
                slug = COALESCE(${data.slug}, slug),
                excerpt = COALESCE(${data.excerpt}, excerpt),
                content = COALESCE(${data.content}, content),
                cover_image = COALESCE(${data.coverImage}, cover_image),
                category = COALESCE(${data.category}, category),
                status = COALESCE(${data.status}, status),
                updated_at = NOW()
            WHERE id = ${id}
            RETURNING *;
        `;
        return result.rows[0];
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }
}

export async function deleteBlogPost(id: string) {
    try {
        await sql`DELETE FROM blog_posts WHERE id = ${id};`;
        return true;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}

// Comment functions
export async function createComment(data: {
    postId: string;
    authorName: string;
    authorEmail: string;
    content: string;
}) {
    try {
        const result = await sql`
      INSERT INTO comments (post_id, author_name, author_email, content, status)
      VALUES (${data.postId}, ${data.authorName}, ${data.authorEmail}, ${data.content}, 'pending')
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export async function getCommentsByPostId(postId: string) {
    try {
        const result = await sql`
      SELECT * FROM comments 
      WHERE post_id = ${postId} AND status = 'approved'
      ORDER BY created_at ASC;
    `;
        return result.rows;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
}

export async function getPendingComments() {
    try {
        const result = await sql`
            SELECT c.*, p.title as post_title 
            FROM comments c
            JOIN blog_posts p ON c.post_id = p.id
            WHERE c.status = 'pending'
            ORDER BY c.created_at DESC;
        `;
        return result.rows;
    } catch (error) {
        console.error('Error getting pending comments:', error);
        throw error;
    }
}

export async function updateCommentStatus(id: string, status: 'approved' | 'rejected') {
    try {
        const result = await sql`
      UPDATE comments 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;
        return result.rows[0];
    } catch (error) {
        console.error('Error updating comment status:', error);
        throw error;
    }
}
