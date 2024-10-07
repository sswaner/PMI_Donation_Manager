const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Define routes for contacts
router.get('/:id', contactsController.getContactById);
router.get('/', contactsController.getAllContacts);

// Add new contact (POST)
router.post('/', contactsController.addContact);

// Update existing contact by ID (PUT)
router.put('/:id', contactsController.updateContact);

module.exports = router;