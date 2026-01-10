#!/usr/bin/env node

/**
 * Database Initialization Script
 * Run this script to create all necessary tables in your Vercel Postgres database
 * 
 * Usage: node scripts/init-db.js
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
    console.log('🚀 Initializing Vercel Postgres database...\n');

    try {
        // Read the schema file
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf-8');

        // Split schema into individual statements
        const statements = schema
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);

            try {
                await sql.query(statement);
                console.log(`✅ Success\n`);
            } catch (error) {
                // Ignore "already exists" errors
                if (error.message.includes('already exists')) {
                    console.log(`⚠️  Already exists (skipped)\n`);
                } else {
                    throw error;
                }
            }
        }

        console.log('✨ Database initialization complete!\n');
        console.log('📊 Tables created:');
        console.log('  - analytics (page views and visitor tracking)');
        console.log('  - contacts (demo requests)');
        console.log('  - subscribers (newsletter subscriptions)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase();
