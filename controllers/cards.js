const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { handleError } = require('../utils');
const { CREATED_201 } = require('../utils/constants');

async function getCards(_, res) {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    handleError(err, res);
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
    handleError(err, res);
  }
}

async function deleteCard(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(id);
    if (!card) throw new NotFoundError('Карточка не найдена');

    if (card.owner._id.toString() !== userId) throw new ForbiddenError('Недостаточно прав для удаления карточки');

    await Card.findByIdAndRemove(id);

    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    handleError(err, res);
  }
}

// не уверена, что стоит выносить код снятия/постановки лайка в отдельную функцию
async function toogleLike(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    const card = await Card.findByIdAndUpdate(
      id,
      req.method === 'PUT' ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) throw new NotFoundError('Карточка не найдена');

    res.send(card);
  } catch (err) {
    handleError(err, res);
  }
}

function putLike(req, res) {
  toogleLike(req, res);
}

function deleteLike(req, res) {
  toogleLike(req, res);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
