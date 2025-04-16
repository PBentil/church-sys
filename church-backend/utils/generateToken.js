const jwt = require('jsonwebtoken');

exports.generateToken = (userId, roleId) => {
    const payload = { userId, roleId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
