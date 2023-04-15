class CustomError extends Error {
  constructor(message, code, name) {
    super(message);
    this.statusCode = code;
    this.name = name;
  }
}

module.exports = CustomError;
