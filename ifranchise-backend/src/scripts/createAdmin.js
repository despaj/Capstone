import 'dotenv/config';
import { pool } from '../config/db.js';

async function createAdmin() {
    const adminEmail = 'admin@ifranchise.com';
    const adminPassword = 'admin123'; // CHANGE THIS AFTER FIRST LOGIN
    const adminName = 'System Admin';
    const adminRole = 'admin';
    const adminBranch = 'HQ';

    try {
        // Check if admin already exists
        const existing = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [adminEmail]
        );

        if (existing.rows.length > 0) {
            console.log('⚠️ Admin account already exists. Skipping creation.');
            process.exit(0);
        }

        // Insert admin
        await pool.query(
            `
      INSERT INTO users (name, email, password, role, branch)
      VALUES ($1, $2, $3, $4, $5)
      `,
            [
                adminName,
                adminEmail,
                adminPassword,
                adminRole,
                adminBranch,
            ]
        );

        console.log('✅ Admin account created successfully!');
        console.log('📧 Email:', adminEmail);
        console.log('🔑 Password:', adminPassword);
    } catch (err) {
        console.error('❌ Failed to create admin:', err);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

createAdmin();
