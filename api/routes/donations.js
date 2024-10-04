const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

// Define routes for donations
router.get('/:id', donationsController.getDonationById);

module.exports = router;