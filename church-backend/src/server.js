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

//api for members page 
// app.get("/api/members/:circuitId", (req, res) => {
//     const { circuitId } = req.params;
//     const { search, gender, employment_status, marital_status } = req.query;

//     let query = "SELECT * FROM members WHERE circuit_id = ?";
//     let params = [circuitId];

//     if (search) {
//         query += " AND name LIKE ?";
//         params.push(`%${search}%`);
//     }
//     if (gender) {
//         query += " AND gender = ?";
//         params.push(gender);
//     }
//     if (employment_status) {
//         query += " AND employment_status = ?";
//         params.push(employment_status);
//     }
//     if (marital_status) {
//         query += " AND marital_status = ?";
//         params.push(marital_status);
//     }

//     db.query(query, params, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });

app.use(express.json()); // Ensure you can parse JSON

app.post("/api/members", (req, res) => {
    const { name, gender, employment_status, marital_status, contact, circuit, diocese } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ message: "Name and Contact are required" });
    }

    // Simulate database insert (replace this with actual DB logic)
    console.log("Received data:", req.body);

    res.status(201).json({ message: "Member added successfully", data: req.body });
});

router.post("/members", async (req, res) => {
    try {
        const newMember = await Member.create(req.body);
        res.status(201).json({ message: "Member added successfully", data: newMember });
    } catch (error) {
        console.error("Error saving member:", error);
        res.status(500).json({ message: "Failed to add member", error });
    }
});




// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
