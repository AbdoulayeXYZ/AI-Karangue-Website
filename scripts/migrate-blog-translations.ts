import { sql } from '@vercel/postgres';
import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

async function runMigration() {
    console.log('Running migration to add translation fields to blog_posts...');

    try {
        // Add columns if they don't exist
        await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;`;
        await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;`;
        await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en TEXT;`;

        console.log('Columns added successfully.');

        // Update the existing French post with an English translation
        const slug = 'revolutionner-la-securite-routiere-en-afrique';
        const titleEn = 'Revolutionizing Road Safety in Africa: The AI-Karangué Vision';
        const excerptEn = 'Discover how AI-Karangué uses AI and IoT to transform road safety and fleet management on the African continent.';
        const contentEn = `# Revolutionizing Road Safety in Africa: The AI-Karangué Vision

Africa faces a significant challenge: despite having a proportionally smaller vehicle fleet than other regions of the world, the continent records the highest road fatality rates. At **AI-Karangué**, we believe that technology is not just a luxury, but a vital necessity to reverse this trend.

## AI at the Service of Life

Our approach is based on an innovative fusion between **Artificial Intelligence** (AI) and the **Internet of Things** (IoT). By installing our smart devices in vehicles, we don't just collect data; we give the vehicle a "conscience".

### The pillars of our innovation:

1. **Real-time Behavioral Monitoring**: Our algorithms analyze fatigue, distractions, and risky driving to intervene before an accident occurs.
2. **Predictive Maintenance**: By anticipating critical breakdowns, we ensure every vehicle on the road is in an optimal state of safety.
3. **Data-Driven Fleet Analytics**: For businesses, Karangué transforms logistics management into a lever of efficiency and profitability.

## A Solution Tailored to Local Realities

Unlike standardized solutions, **AI-Karangué** was designed for the African ecosystem. Our systems are resilient, connected, and built to operate where connectivity and infrastructure may be inconsistent.

## Toward a Safer Future

Our mission goes beyond business. Every deployment of our solution is one step closer to a road where every passenger, driver, and pedestrian can travel with complete **peace of mind**.

Join us in this technological revolution. Together, let's make road safety a tangible reality for all.`;

        await sql`
      UPDATE blog_posts 
      SET 
        title_en = ${titleEn},
        excerpt_en = ${excerptEn},
        content_en = ${contentEn}
      WHERE slug = ${slug};
    `;

        console.log('Existing post translated successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

runMigration();
