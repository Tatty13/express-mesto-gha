const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecter } = require('../utils/constants');

const { JWT_SECRET = jwtSecter } = process.env;

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');

const { CREATED_201 } = require('../utils/constants');

function getUsers(_, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  const { password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hash });

    res.status(CREATED_201).send({ user });
  } catch (err) {
    next(err);
  }
}

/**
 * @param {Object} req - Request
 * @param {Object} res - Responce
 * @param {Object} userInfo - user info to be updated
 */
async function updateUserInfo(req, res, next, userInfo) {
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
    next(err);
  }
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  updateUserInfo(req, res, next, { name, about });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  updateUserInfo(req, res, next, { avatar });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const { _id } = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });

    res.send(token);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
