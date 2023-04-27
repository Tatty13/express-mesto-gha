const mongooseError = require('mongoose').Error;
const { isCelebrateError } = require('celebrate');
const { JsonWebTokenError } = require('jsonwebtoken');

const CustomError = require('../errors/custom-error');

const {
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
} = require('../utils/constants');

/**
 * @param {Object} err - Error
 * @param {*} req - Request
 * @param {Object} res - Responce
 * @param {Function} next
 * @returns
 */
function handleError(err, req, res, next) {
  if (isCelebrateError(err)) {
    const [errData] = err.details.values().next().value.details;
    res.status(BAD_REQUEST_400).send({ message: errData.message });
    return;
  }

  if (err instanceof mongooseError.ValidationError) {
    const errMessage = Object.values(err.errors).map((e) => e.message).join('. ');
    const resMessage = { message: errMessage };
    res.status(BAD_REQUEST_400).send(resMessage);
    return;
  }

  if (err instanceof mongooseError.CastError) {
    const errMessage = `"${err.value}" incorrect. ${err.reason.message}`;
    const resMessage = { message: errMessage };
    res.status(BAD_REQUEST_400).send(resMessage);
    return;
  }

  if (err.code === 11000) {
    res.status(CONFLICT_409).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(UNAUTHORIZED_401).send({ message: 'Передан невалидный токен' });
    return;
  }

  const resMessage = { message: err.message };

  if (err instanceof CustomError) {
    res.status(err.statusCode).send(resMessage);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR_500).send(resMessage);
  next();
}

module.exports = handleError;
