function handleError(res, err, errDesc = 'Произошла ошибка') {
  res.status(err.statusCode).send({ message: `${errDesc}: ${err.message}` });
}

module.exports = {
  handleError,
};
