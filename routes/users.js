const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = {
  router,
};
