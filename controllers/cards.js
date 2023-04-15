const Card = require('../models/card');

function getCards(_, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

async function createCard(req, res) {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    const newCard = await Card.create({ name, link, owner: _id });
    const card = await Card.findById(newCard._id).populate('owner').exec();
    res.send(card);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
  }
}

async function deleteCard(req, res) {
  const { id } = req.params;

  try {
    const card = await Card.findByIdAndRemove({ _id: id });

    if (!card) throw new Error('Карточка не найдена');
    res.send('Карточка успешно удалена');
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
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

    if (!updatedCard) throw new Error('Карточка не найдена');

    const card = await Card
      .findById({ _id: id })
      .populate(['owner', 'likes']).exec();

    res.send(card);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
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

    if (!updatedCard) throw new Error('Карточка не найдена');

    const card = await Card
      .findById({ _id: id })
      .populate(['owner', 'likes']).exec();

    res.send(card);
  } catch (err) {
    res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
