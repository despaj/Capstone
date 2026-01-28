import { pool } from '../config/db.js';

export async function getSales(req, res) {
    try {
        const result = await pool.query('SELECT * FROM sales');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
}
