const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const { handleError } = require('../utils');
const { CREATED_201 } = require('../utils/constants');

async function getCards(_, res) {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    handleError(res, err);
  }
}

async function createCard(req, res) {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    const newCard = await Card.create({ name, link, owner: _id });
    const card = await newCard.populate('owner');
    res.status(CREATED_201).send(card);
  } catch (err) {
    handleError(res, err);
  }
}

async function deleteCard(req, res) {
  const { id } = req.params;

  try {
    const card = await Card.findByIdAndRemove({ _id: id }).populate([
      'owner',
      'likes',
    ]);

    if (!card) throw new NotFoundError('Карточка не найдена');

    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
}

async function putLike(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    const card = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) throw new NotFoundError('Карточка не найдена');

    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
}

async function deleteLike(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const card = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) throw new NotFoundError('Карточка не найдена');

    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
