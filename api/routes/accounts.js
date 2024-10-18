const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// Define routes for accounts
router.get('/:id', accountsController.getAccountById);
router.get('/', accountsController.getAllAccounts);
router.get('/overview/:id', accountsController.getAccountOverview);

// Add new routes for creating and updating accounts
router.post('/', accountsController.createAccount);        // Create new account
router.put('/:id', accountsController.updateAccount);      // Update existing account by ID

module.exports = router;