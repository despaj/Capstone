import { pool } from '../config/db.js';

export async function getUsers(req, res) {
    try {
        const result = await pool.query(
            'SELECT id, name, email, role, branch FROM users ORDER BY id'
        );

        const users = result.rows.map(user => ({
            ...user,
            status: 'active',
        }));

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export async function createUser(req, res) {
    try {
        const { name, email, role, branch, password } = req.body;

        const result = await pool.query(
            'INSERT INTO users (name, email, password, role, branch) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, password, role, branch]
        );

        res.json({
            success: true,
            message: 'User added successfully',
            user: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Failed to add user' });
        }
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, role, branch, password } = req.body;

        let query, params;

        if (password) {
            query = `
        UPDATE users
        SET name=$1, email=$2, role=$3, branch=$4, password=$5
        WHERE id=$6 RETURNING *
      `;
            params = [name, email, role, branch, password, id];
        } else {
            query = `
        UPDATE users
        SET name=$1, email=$2, role=$3, branch=$4
        WHERE id=$5 RETURNING *
      `;
            params = [name, email, role, branch, id];
        }

        const result = await pool.query(query, params);

        res.json({
            success: true,
            message: 'User updated successfully',
            user: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}
