const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'InternalServerError') {
        next(new InternalServerError('На сервере произошла ошибка'));
      } else {
        next(err);
      }
    });
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else if (err.name === 'InternalServerError') {
        next(new InternalServerError('На сервере произошла ошибка'));
      } else {
        next(err);
      }
    });
};
module.exports.deleteCards = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } if (card.owner.valueOf() !== owner) {
        throw new OwnerError('У вас недостаточно прав.');
      }
      return card.remove()
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'InternalServerError') {
        next(new InternalServerError('На сервере произошла ошибка'));
      } else {
        next(err);
      }
    });
};
module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'InternalServerError') {
        next(new InternalServerError('На сервере произошла ошибка'));
      } else {
        next(err);
      }
    });
};
