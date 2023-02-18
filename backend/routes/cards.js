const router = require('express').Router(); // создали роутер
const { validateCardId, validateCardData } = require('../utils/validateRequestsData');

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards); // возвращает все карточки

router.delete(
  '/:cardId',
  validateCardId,
  deleteCardById,
); // удаляет карточку по идентификатору

router.post(
  '/',
  validateCardData,
  createCard,
); // создаёт карточку

router.put(
  '/:cardId/likes',
  validateCardId,
  likeCard,
); // поставить лайк карточке

router.delete(
  '/:cardId/likes',
  validateCardId,
  dislikeCard,
); // убрать лайк с карточки

module.exports = router;
