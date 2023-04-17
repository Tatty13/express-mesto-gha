const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
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
    const user = await User.findById({ _id: id });
    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

async function createUser(req, res) {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
