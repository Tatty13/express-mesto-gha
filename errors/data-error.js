const CustomError = require('./custom-error');

class DataError extends CustomError {
  constructor(message) {
    super(message, 400, 'DataError');
  }
}

module.exports = DataError;
