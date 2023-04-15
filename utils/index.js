const CustomError = require('../errors/custom-error');

function handleError(res, err, errDesc = 'Произошла ошибка') {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ message: `${errDesc}: ${err.message}` });
  } else {
    res.status(500).send({ message: `${errDesc}: ${err.message}` });
  }
}

module.exports = {
  handleError,
};
