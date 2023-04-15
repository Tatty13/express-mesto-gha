const usersRouter = require('express').Router();
const {
  getUsers, createUser, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = {
  usersRouter,
};
