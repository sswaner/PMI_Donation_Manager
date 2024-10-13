const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

// Define routes for donations
router.get('/:id', donationsController.getDonationById);
router.get('/account/:accountId', donationsController.getDonationsByAccountId); // Get donations by account ID
router.post('/', donationsController.createDonation);               // Create a new donation
router.put('/:id', donationsController.updateDonation);             // Update donation by ID

module.exports = router;