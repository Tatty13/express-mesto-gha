const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const AuthError = require('../errors/auth-error');
const { handleError } = require('../utils');

function auth(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) { throw new AuthError('Требуется авторизация'); }

    const token = authorization.replace(/Bearer\s+/, '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = auth;
