const express = require('express'),
      router = express.Router(),
      usersController = require('../controllers/users');

router.post('/auth', usersController.loginUser);
router.post('/create', usersController.createUser);
router.post('/logout', usersController.logoutUser);
router.delete('/:id', usersController.deleteUser);
router.get('/', usersController.getUser);

module.exports = router;
