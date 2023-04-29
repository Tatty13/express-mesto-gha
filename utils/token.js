const jwt = require('jsonwebtoken');

const { jwtSecter } = require('./constants');

const { JWT_SECRET = jwtSecter } = process.env;

/**
 * @typedef {(String | Object | Buffer)} Payload
 */

/**
 * @param {Payload} payload
 * @returns {string} token
 */
const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

/**
 * @param {string} token
 * @returns { Payload | Error} token payload or Error
 */
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateToken,
  verifyToken,
};
