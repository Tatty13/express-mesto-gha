class DataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'DataError';
  }
}

module.exports = DataError;
