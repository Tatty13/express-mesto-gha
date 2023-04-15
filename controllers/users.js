const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
}

function getUser(req, res) {
  const { id } = req.params;
  User.findById({ _id: id })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
}

async function updateUser(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;

  try {
    if (!(name && about)) throw new Error('Данные не переданы');
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true, upsert: true },
    );
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
  }
}

async function updateAvatar(req, res) {
  const { avatar } = req.body;
  const { _id } = req.user;

  try {
    if (!avatar) throw new Error('Данные не переданы');
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true, runValidators: true, upsert: true },
    );
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
