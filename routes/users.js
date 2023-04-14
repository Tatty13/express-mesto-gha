const router = require('express').Router();
const { getUsers, createUser, getUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = {
  router,
};
