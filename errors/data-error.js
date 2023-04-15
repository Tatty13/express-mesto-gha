const CustomError = require('./custom-error');

class DataError extends CustomError {
  constructor(message = 'Данные не переданы или переданы не корректно') {
    super(message, 400, 'DataError');
  }
}

module.exports = DataError;
