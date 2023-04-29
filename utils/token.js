const jwt = require('jsonwebtoken');

const { jwtSecter } = require('./constants');

const { JWT_SECRET = jwtSecter } = process.env;

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateToken,
  verifyToken,
};
