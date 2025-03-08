import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv"; // ✅ Import dotenv


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



app.use(cors());
app.use(express.json());


app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "Bentil",
    password: "Ben142536%", // Change to your MySQL password
    database: "church_sys", // Change to your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database ");
    }
});

// API route to fetch dashboard stats
app.get("/api/dashboard-stats", (req, res) => {
    db.query("SELECT * FROM dashboard_stats LIMIT 1", (err, result) => {
        if (err) {
            console.error("Error fetching stats:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(result[0]); // Return first row
        }
    });
});

// ✅ Member Registration Route
app.post("/api/members", (req, res) => {
    const { name, contact, gender, employment_status, marital_status, circuit, diocese } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ message: "❌ Name and Contact are required" });
    }

    const sql = `INSERT INTO members (name, contact, gender, employment_status, marital_status, circuit, diocese) VALUES (?, ?, ?, ?, ?, ?, ?)`;


    db.query(sql, [name, contact, gender, employment_status, marital_status, circuit, diocese], (err, result) => {
        if (err) {
            console.error("❌ Error saving member:", err);
            return res.status(500).json({ message: "❌ Failed to add member", error: err });
        }

        res.status(201).json({
            message: "✅ Member added successfully",
            data: { id: result.insertId, ...req.body }
        });
    });
});
//fetch
app.get("/api/members", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM members");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: "Failed to fetch members", error });
    }
});

//diocese page 
// Fetch members for the Diocese Page (all members by default, filter by diocese if selected)
app.get("/api/members", async (req, res) => {
    try {
        const { diocese } = req.query;
        let sql = "SELECT * FROM members";
        let params: any[] = [];

        if (diocese) {
            sql += " WHERE diocese = ?";
            params.push(diocese);
        }

        const [rows] = await db.promise().query(sql, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ message: "Failed to fetch members", error });
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
