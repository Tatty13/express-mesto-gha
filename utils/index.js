const mongooseError = require('mongoose').Error;
const bcrypt = require('bcryptjs');

const CustomError = require('../errors/custom-error');
const AuthError = require('../errors/auth-error');

const {
  BAD_REQUEST_400,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
} = require('./constants');

/**
 * @param {Object} res - Responce
 * @param {Object} err - Error
 * @param {String} errDesc - error description before error message;
 * @returns
 */
function handleError(res, err, errDesc = 'Произошла ошибка') {
  if (err instanceof mongooseError.ValidationError) {
    const errMessage = Object.values(err.errors).map((e) => e.message).join('. ');
    const resData = { message: `${errDesc}: ${errMessage}` };
    res.status(BAD_REQUEST_400).send(resData);
    return;
  }

  if (err instanceof mongooseError.CastError) {
    const errMessage = `"${err.value}" incorrect. ${err.reason.message}`;
    const resData = { message: errMessage };
    res.status(BAD_REQUEST_400).send(resData);
    return;
  }

  if (err.code === 11000) {
    res.status(CONFLICT_409).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }

  const resData = { message: `${errDesc}: ${err.message}` };
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(resData);
  } else {
    res.status(INTERNAL_SERVER_ERROR_500).send(resData);
  }
}

/**
 * @param {String} email
 * @param {String} password
 */
async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new AuthError('Неправильные почта или пароль');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AuthError('Неправильные почта или пароль');

  return user;
}

module.exports = {
  handleError,
  findUserByCredentials,
};
