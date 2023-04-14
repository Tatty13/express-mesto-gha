const usersRouter = require('express').Router();
const { getUsers, createUser, getUser } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', createUser);

module.exports = {
  usersRouter,
};
