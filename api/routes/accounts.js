const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// Define routes for accounts
router.get('/:id', accountsController.getAccountById);
router.get('/', accountsController.getAllAccounts);
router.get('/overview/:id', accountsController.getAccountOverview);

module.exports = router;