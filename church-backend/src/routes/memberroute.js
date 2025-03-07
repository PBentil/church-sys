const express = require("express");
const router = express.Router();
const { Member } = require("../models"); // Import your Sequelize model

// Add new member
router.post("/members", async (req, res) => {
    const { name, contact, gender, employment_status, marital_status, circuit, diocese } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ message: "Name and Contact are required" });
    }

    try {
        const newMember = await Member.create({
            name,
            contact,
            gender,
            employment_status,
            marital_status,
            circuit,
            diocese
        });

        res.status(201).json({ message: "Member added successfully", data: newMember });
    } catch (error) {
        console.error("Error saving member:", error);
        res.status(500).json({ message: "Failed to add member", error });
    }
});

module.exports = router;
