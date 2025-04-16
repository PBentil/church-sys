const pool = require('../config/db');

// Get a user by ID
exports.getUserById = async (userId) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        return user.rows[0];
    } catch (err) {
        throw new Error('Error fetching user');
    }
};
