const db = require('../db'); // Assuming the db connection is in a separate file

// Get Activity by ID
exports.getActivityById = (req, res) => {
    const activityID = req.params.id;
    const query = 'SELECT * FROM Activities WHERE ActivityID = ?';
    db.query(query, [activityID], (err, results) => {
        if (err) {
            console.error('Error fetching activity details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Activity not found');
            return;
        }
        res.json(results[0]);
    });
};

// Get All Activities
exports.getAllActivities = (req, res) => {
    const query = 'SELECT * FROM Activities';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching activities:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

// Add Activity
exports.addActivity = (req, res) => {
    const {
        AccountID, ContactID, ActivityType, ActivityDate, CreatedBy, Description
    } = req.body; // Destructuring the activity data from the request body

    // Validation for required fields
    if (!AccountID || !ActivityType || !CreatedBy) {
        return res.status(400).send('Missing required fields: AccountID, ActivityType, CreatedBy');
    }

    const query = `
        INSERT INTO Activities 
        (AccountID, ContactID, ActivityType, ActivityDate, CreatedBy, Description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        AccountID, ContactID, ActivityType, ActivityDate || new Date(), CreatedBy, Description
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error adding activity:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send({ message: 'Activity added successfully', activityID: result.insertId });
    });
};

// Update Activity
exports.updateActivity = (req, res) => {
    const activityID = req.params.id;
    let {
        AccountID, ContactID, ActivityType, ActivityDate, CreatedBy, Description
    } = req.body;

    // Set default value for ActivityDate if not provided
    ActivityDate = ActivityDate || new Date();

    if (!AccountID) {
        return res.status(400).send('Missing required field: AccountID');
    }

    // Validation for required fields
    if (!ActivityType || !CreatedBy) {
        return res.status(400).send('Missing required fields: AccountID, ActivityType, CreatedBy');
    }

    const query = `
        UPDATE Activities 
        SET AccountID = ?, ContactID = ?, ActivityType = ?, ActivityDate = ?, CreatedBy = ?, Description = ?
        WHERE ActivityID = ?
    `;

    const values = [
        AccountID, ContactID, ActivityType, ActivityDate || new Date(), CreatedBy, Description, activityID
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating activity:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Activity not found');
        }

        res.send({ message: 'Activity updated successfully' });
    });
};