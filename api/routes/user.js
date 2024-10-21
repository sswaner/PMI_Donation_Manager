const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/user/userAccountController');

// Route to get accounts assigned to a user
router.get('/:UserID/accounts', userAccountController.getAccountsByUserId);

module.exports = router;