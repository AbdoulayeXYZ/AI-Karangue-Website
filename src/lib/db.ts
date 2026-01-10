import { sql } from '@vercel/postgres';

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
      VALUES (${today}, ${isNewVisitor ? 1 : 0}, 1, ${JSON.stringify({ [path]: 1 })})
      ON CONFLICT (date) 
      DO UPDATE SET
        visitors = analytics.visitors + ${isNewVisitor ? 1 : 0},
        page_views = analytics.page_views + 1,
        pages = jsonb_set(
          COALESCE(analytics.pages, '{}'::jsonb),
          ARRAY[${path}],
          to_jsonb(COALESCE((analytics.pages->>$1)::int, 0) + 1)
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
