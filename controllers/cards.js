const Card = require('../models/card');

function getCards(_, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

function deleteCard(req, res) {
  const { id } = req.params;

  Card.findByIdAndRemove({ _id: id })
    .then(() => res.send('Карточка успешно удалена'))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
