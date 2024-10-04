const db = require('../db'); // Import the db connection

// Function to get donation details by ID
exports.getDonationById = (req, res) => {
    const donationId = req.params.id;

    // Query to get the donation details
    const donationQuery = 'SELECT * FROM Donations WHERE DonationID = ?';

    // Query to get the related in-kind donations
    const inKindQuery = 'SELECT * FROM InkindDonations WHERE DonationID = ?';

    // Execute the first query to get the donation details
    db.query(donationQuery, [donationId], (err, donationResults) => {
        if (err) {
            console.error('Error fetching donation details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (donationResults.length === 0) {
            res.status(404).send('Donation not found');
            return;
        }

        // Execute the second query to get the related in-kind donations
        db.query(inKindQuery, [donationId], (err, inKindResults) => {
            if (err) {
                console.error('Error fetching in-kind donation details:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Combine the results
            const donation = donationResults[0];
            donation.InKindDonations = inKindResults.length ? inKindResults : [];

            // Return the combined response
            res.json(donation);
        });
    });
};