const User = require('../models/user');
const DataError = require('../errors/data-error');
const NotFoundError = require('../errors/not-found-error');
const { handleError } = require('../utils');

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
    if (!(name && about && avatar)) throw new DataError();

    const user = await User.create({ name, about, avatar });

    res.send({ user });
  } catch (err) {
    handleError(res, err);
  }
}

async function updateUser(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;

  try {
    if (!(name || about)) throw new DataError();

    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true, upsert: true },
    );

    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const { _id } = req.user;

  try {
    if (!avatar) throw new DataError();

    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true, runValidators: true, upsert: true },
    );

    if (!user) throw new NotFoundError('Пользователь не найден');

    res.send(user);
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
};
