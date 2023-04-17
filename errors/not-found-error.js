const CustomError = require('./custom-error');
const { HTTP_STATUS_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends CustomError {
  /**
   * @param {String} message - error message
   */
  constructor(message) {
    super(message, HTTP_STATUS_NOT_FOUND, 'NotFoundError');
  }
}

module.exports = NotFoundError;
