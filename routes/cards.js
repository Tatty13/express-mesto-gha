const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:id/likes', putLike);
cardsRouter.delete('/:id/likes', deleteLike);

module.exports = {
  cardsRouter,
};
