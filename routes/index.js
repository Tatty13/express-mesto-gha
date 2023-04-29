const router = require('express').Router();
const { errors } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const handleUnknownRoute = require('../controllers/notFound');
const auth = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { validateUserCredential } = require('../middlewares/validators/user-validators');

const { login, createUser } = require('../controllers/users');

router.post('/signin', validateUserCredential, login);
router.post('/signup', validateUserCredential, createUser);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, handleUnknownRoute);

/**
 * @todo remove line: router.use(errors())
 * @todo use custom handleError middleware function to catch Joi errors
 */
router.use(errors()); // add line to pass github tests
router.use(handleError);

module.exports = router;
