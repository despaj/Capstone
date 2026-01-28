import { Pool } from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);


// Test connection ONCE
pool.query('SELECT NOW()')
    .then(() => console.log('Database connected successfully ✅'))
    .catch(err => console.error('Database connection error:', err));
