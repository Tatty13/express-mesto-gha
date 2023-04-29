const jwt = require('jsonwebtoken');

const { jwtSecter } = require('../utils/constants');

const { JWT_SECRET = jwtSecter } = process.env;

const AuthError = require('../errors/auth-error');

function auth(req, _, next) {
  const { token } = req.cookies;

  try {
    if (!token) { throw new AuthError('Требуется авторизация'); }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
