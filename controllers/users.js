const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');

const { handleError } = require('../utils');
const { CREATED_201 } = require('../utils/constants');

function getUsers(_, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(res, err));
}

async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

async function createUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) { throw new ValidationError('Некорректный email или пароль'); }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hash });

    res.status(CREATED_201).send({ user });
  } catch (err) {
    handleError(res, err);
  }
}

/**
 * @param {Object} req - Request
 * @param {Object} res - Responce
 * @param {Object} userInfo - user info to be updated
 */
async function updateUserInfo(req, res, userInfo) {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      userInfo,
      { new: true, runValidators: true },
    );

    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

function updateUser(req, res) {
  const { name, about } = req.body;
  updateUserInfo(req, res, { name, about });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  updateUserInfo(req, res, { avatar });
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const { _id } = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id }, 'secret-code', { expiresIn: '7d' });

    res.send(token);
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
