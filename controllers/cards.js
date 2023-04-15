const Card = require('../models/card');
const DataError = require('../errors/data-error');
const NotFoundError = require('../errors/not-found-error');
const { handleError } = require('../utils');

function getCards(_, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleError(res, err));
}

async function createCard(req, res) {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    if (!(name && link)) throw new DataError('Данные не переданы или переданы не корректно');

    const newCard = await Card.create({ name, link, owner: _id });
    const card = await Card.findById(newCard._id).populate('owner').exec();
    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
}

async function deleteCard(req, res) {
  const { id } = req.params;

  try {
    const card = await Card.findByIdAndRemove({ _id: id });
    if (!card) throw new NotFoundError('Карточка не найдена');

    res.send('Карточка успешно удалена');
  } catch (err) {
    handleError(res, err);
  }
}

async function putLike(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
    );

    if (!updatedCard) throw new NotFoundError('Карточка не найдена');

    const card = await Card
      .findById({ _id: id })
      .populate(['owner', 'likes']).exec();

    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
}

async function deleteLike(req, res) {
  const { id } = req.params;
  const { _id: userId } = req.user;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
    );

    if (!updatedCard) throw new NotFoundError('Карточка не найдена');

    const card = await Card
      .findById({ _id: id })
      .populate(['owner', 'likes']).exec();

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
