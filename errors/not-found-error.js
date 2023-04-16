const CustomError = require('./custom-error');

class NotFoundError extends CustomError {
  /**
   * @param {String} message - error message
   */
  constructor(message) {
    super(message, 404, 'NotFoundError');
  }
}

module.exports = NotFoundError;
