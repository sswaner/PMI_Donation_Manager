const db = require('../../db'); // Assuming db connection is in a separate file

// Get accounts assigned to a user by UserID
exports.getUsers = (req, res) => {
    
    // Query to fetch accounts assigned to the specific user (AccountManagerID = userID)
    const query = `
        SELECT UserID, Username, FirstName, LastName, Email, UserRole, isActive 
        FROM Users;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching accounts:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No users found.');
            return;
        }

        res.json(results); // Return the results in JSON format
    });
};