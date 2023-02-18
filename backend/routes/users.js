const router = require('express').Router(); // создали роутер
const { validateUserId, validateUserData, validateUserAvatar } = require('../utils/validateRequestsData');

const {
  getUsers,
  getUserById,
  getUserMe,
  updateUserData,
} = require('../controllers/users');

router.get('/', getUsers);
// этот роут должен идти раньше, чем следующий, чтобы /me не посчиталось за /:userId
router.get('/me', getUserMe);

router.get(
  '/:userId',
  validateUserId,
  getUserById,
);

router.patch(
  '/me',
  validateUserData,
  updateUserData, // обновляет профиль
);

router.patch(
  '/me/avatar',
  validateUserAvatar,
  updateUserData, // обновляет аватар
);

module.exports = router;
