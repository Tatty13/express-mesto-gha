const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (_, res) => {
  res.status(404).send({ message: 'page not found' });
});

module.exports = router;
