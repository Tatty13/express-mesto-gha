const CustomError = require('../errors/custom-error');
const {
  BAD_REQUEST_400,
  INTERNAL_SERVER_ERROR_500,
} = require('./constants');

/**
 * @param {Object} res - Responce
 * @param {Object} err - Error
 * @param {String} errDesc - error description before error message;
 * @returns
 */
function handleError(res, err, errDesc = 'Произошла ошибка') {
  const resData = { message: `${errDesc}: ${err.message}` };

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(BAD_REQUEST_400).send(resData);
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).send(resData);
  } else {
    res.status(INTERNAL_SERVER_ERROR_500).send(resData);
  }
}

module.exports = {
  handleError,
};
