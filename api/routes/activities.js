const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController'); // Adjust the path if necessary

// Route to get an activity by ID
router.get('/:id', activitiesController.getActivityById);

// Route to get all activities
router.get('/', activitiesController.getAllActivities);

// Route to add a new activity
router.post('/', activitiesController.addActivity);

// Route to update an existing activity
router.put('/:id', activitiesController.updateActivity);

module.exports = router;