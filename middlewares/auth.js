const jwt = require('jsonwebtoken');

const { jwtSecter } = require('../utils/constants');

const { JWT_SECRET = jwtSecter } = process.env;

const AuthError = require('../errors/auth-error');

function auth(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) { throw new AuthError('Требуется авторизация'); }

    const token = authorization.replace(/Bearer\s+/, '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
