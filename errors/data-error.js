const CustomError = require('./custom-error');

class DataError extends CustomError {
  /**
   * @param {String} message - error message, default value:
   * 'Данные не переданы или переданы не корректно'
   */
  constructor(message = 'Данные не переданы или переданы не корректно') {
    super(message, 400, 'DataError');
  }
}

module.exports = DataError;
