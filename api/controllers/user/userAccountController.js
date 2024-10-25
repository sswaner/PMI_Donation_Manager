const db = require('../../db'); // Assuming db connection is in a separate file


// Get accounts assigned to a user by UserID
exports.getAccountsByUserId = (req, res) => {
    const userID = req.params.UserID;
    
    // Query to fetch accounts assigned to the specific user (AccountManagerID = userID)
    const query = `
        SELECT AccountID, OrganizationName, AccountType, AccountSize, GivingPotential, Segment, AccountLocation 
        FROM Accounts 
        WHERE AccountManagerID = ? 
        ORDER BY OrganizationName;
    `;

    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error('Error fetching accounts:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No accounts found for this user.');
            return;
        }

        res.json(results); // Return the results in JSON format
    });
};