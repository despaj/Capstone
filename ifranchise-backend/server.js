require("dotenv").config(); // ← ADD THIS LINE

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully ✅");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Franchise Backend is Running 🚀");
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query database for user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      // Login successful
      const user = result.rows[0];
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } else {
      // Login failed
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, branch FROM users ORDER BY id");
    const users = result.rows.map(user => ({
      ...user,
      status: 'active'
    }));
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, role, branch, password } = req.body;
    
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role, branch) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, role, branch]
    );
    
    res.json({ 
      success: true, 
      message: "User added successfully",
      user: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // Unique constraint violation
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ error: "Failed to add user" });
    }
  }
});

// Update user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, branch, password } = req.body;
    
    let query, params;
    
    if (password) {
      // Update with new password
      query = "UPDATE users SET name = $1, email = $2, role = $3, branch = $4, password = $5 WHERE id = $6 RETURNING *";
      params = [name, email, role, branch, password, id];
    } else {
      // Update without changing password
      query = "UPDATE users SET name = $1, email = $2, role = $3, branch = $4 WHERE id = $5 RETURNING *";
      params = [name, email, role, branch, id];
    }
    
    const result = await pool.query(query, params);
    
    res.json({ 
      success: true, 
      message: "User updated successfully",
      user: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    
    res.json({ 
      success: true, 
      message: "User deleted successfully" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get sales from database
app.get("/sales", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sales");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});