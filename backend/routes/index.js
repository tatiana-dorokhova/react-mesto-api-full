const router = require('express').Router(); // создали роутер
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../utils/validateRequestsData');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signin',
  validateSignIn,
  login,
);
router.post(
  '/signup',
  validateSignUp,
  createUser,
);

// в случае успеха добавляет в каждый запрос свойство req.user
// с записанным в него токеном
router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// если обращение происходит к ресурсу, не описанному выше в роутах, то выдавать ошибку 404
router.all('*', (req, res, next) => next(new NotFoundError('Запрошена несуществующая страница')));

module.exports = router;
