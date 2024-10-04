const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Define routes for contacts
router.get('/:id', contactsController.getContactById);
router.get('/', contactsController.getAllContacts);

module.exports = router;