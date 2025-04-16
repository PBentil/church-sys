const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authMiddleware.verifyToken, userController.getUserProfile);

module.exports = router;
