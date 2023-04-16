const CustomError = require('../errors/custom-error');

/**
 * @param {Object} res - Responce
 * @param {Object} err - Error
 * @param {String} errDesc - error description before error message;
 * @returns
 */
function handleError(res, err, errDesc = 'Произошла ошибка') {
  const resData = { message: `${errDesc}: ${err.message}` };

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send(resData);
    return;
  }

  if (err instanceof CustomError) {
    res.status(err.statusCode).send(resData);
  } else {
    res.status(500).send(resData);
  }
}

module.exports = {
  handleError,
};
