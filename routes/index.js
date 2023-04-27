const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { validateUserCredential } = require('../middlewares/validators/user-validators');

const { login, createUser } = require('../controllers/users');
const { NOT_FOUND_404 } = require('../utils/constants');

router.post('/signin', validateUserCredential, login);
router.post('/signup', validateUserCredential, createUser);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (_, res) => {
  res.status(NOT_FOUND_404).send({ message: 'page not found' });
});
router.use(handleError);

module.exports = router;
