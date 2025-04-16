// routes/authRoutes.js
const express = require('express');
const router = express.Router();  // Use express.Router(), not the 'router' package
const authController = require('../controllers/authController'); // Make sure the correct path is used

// Define the POST route for login
router.post('/login', authController.login);  // This line should work if authController.login is a function

module.exports = router;
