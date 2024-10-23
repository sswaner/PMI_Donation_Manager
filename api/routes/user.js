const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/user/userAccountController');
const usersController = require('../controllers/user/usersController');

// Route to get accounts assigned to a user
router.get('/:UserID/accounts', userAccountController.getAccountsByUserId);
router.get('/', usersController.getUsers);

module.exports = router;