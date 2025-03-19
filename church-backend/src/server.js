import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv"; // ✅ Import dotenv

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "Bentil",
    password: "Ben142536%", // Change to your MySQL password
    database: "church_sys", // Change to your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

// ✅ Member Registration Route
app.post("/api/members", async (req, res) => {
    const { name, contact, gender, employment_status, marital_status, circuit, diocese } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ message: "❌ Name and Contact are required" });
    }

    try {
        const [result] = await db.promise().query(
            `INSERT INTO members (name, contact, gender, employment_status, marital_status, circuit, diocese) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, contact, gender, employment_status, marital_status, circuit, diocese]
        );

        res.status(201).json({
            message: "✅ Member added successfully",
            data: { id: result.insertId, ...req.body }
        });
    } catch (error) {
        console.error("❌ Error saving member:", error);
        res.status(500).json({ message: "❌ Failed to add member", error });
    }
});

// ✅ Fetch All Members
app.get("/api/members", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM members");
        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Error fetching members:", error);
        res.status(500).json({ message: "❌ Failed to fetch members", error });
    }
});

// ✅ Diocese API Endpoints
app.get("/api/dioceses", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM dioceses");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get analytics for a diocese (Total circuits & members count)
app.get("/api/dioceses/:dioceseId/analytics", async (req, res) => {
    try {
        const { dioceseId } = req.params;

        // Get total circuits
        const [circuits] = await db.promise().query(
            "SELECT COUNT(*) AS totalCircuits FROM circuits WHERE diocese_id = ?",
            [dioceseId]
        );

        // Get total members
        const [members] = await db.promise().query(
            "SELECT COUNT(*) AS totalMembers FROM members WHERE diocese_id = ?",
            [dioceseId]
        );

        res.json({
            totalCircuits: circuits[0].totalCircuits,
            totalMembers: members[0].totalMembers,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all circuits under a diocese
app.get("/api/dioceses/:dioceseId/circuits", async (req, res) => {
    try {
        const { dioceseId } = req.params;
        const [rows] = await db.promise().query(
            "SELECT * FROM circuits WHERE diocese_id = ?",
            [dioceseId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all members under a diocese
app.get("/api/dioceses/:dioceseId/members", async (req, res) => {
    try {
        const { dioceseId } = req.params;
        const [rows] = await db.promise().query(
            "SELECT * FROM members WHERE diocese_id = ?",
            [dioceseId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
