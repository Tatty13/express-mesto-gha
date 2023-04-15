const CustomError = require('../errors/custom-error');

function handleError(res, err, errDesc = 'Произошла ошибка') {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: `${errDesc}: ${err.message}` });
    return;
  }
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ message: `${errDesc}: ${err.message}` });
  } else {
    res.status(500).send({ message: `${errDesc}: ${err.message}` });
  }
}

module.exports = {
  handleError,
};
