const bcrypt = require('bcryptjs');

const AuthError = require('../errors/auth-error');

/**
 * @param {String} email
 * @param {String} password
 */
async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw new AuthError('Неправильные почта или пароль');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AuthError('Неправильные почта или пароль');

  return user;
}

module.exports = {
  findUserByCredentials,
};
