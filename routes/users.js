const usersRouter = require('express').Router();
const {
  getUsers, getUserById, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
