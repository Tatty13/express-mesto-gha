const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login } = require('../controllers/users');
const { NOT_FOUND_404 } = require('../utils/constants');

router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (_, res) => {
  res.status(NOT_FOUND_404).send({ message: 'page not found' });
});

module.exports = router;
