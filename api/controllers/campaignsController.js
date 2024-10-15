const db = require('../db'); // Import the db connection

// Function to get all campaigns
exports.getAllCampaigns = (req, res) => {
    const query = 'SELECT * FROM Campaigns';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching campaigns:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
};

// Function to get campaign details by ID, along with accounts engaged with the campaign
exports.getCampaignById = (req, res) => {
    const campaignId = req.params.id;

    // Query to get the campaign details
    const campaignQuery = 'SELECT * FROM Campaigns WHERE CampaignID = ?';

    // Query to get the list of accounts engaged with the campaign
    const engagementQuery = `
        SELECT a.OrganizationName, a.Segment AS Sector, ce.EngagementLevel 
        FROM CampaignEngagements ce
        JOIN Accounts a ON ce.AccountID = a.AccountID
        WHERE ce.CampaignID = ?
    `;

    // Execute the first query to get the campaign details
    db.query(campaignQuery, [campaignId], (err, campaignResults) => {
        if (err) {
            console.error('Error fetching campaign details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (campaignResults.length === 0) {
            res.status(404).send('Campaign not found');
            return;
        }

        // Execute the second query to get the related account engagements
        db.query(engagementQuery, [campaignId], (err, engagementResults) => {
            if (err) {
                console.error('Error fetching account engagements:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Combine the campaign details with the engagement results
            const campaign = campaignResults[0];
            campaign.AccountEngagements = engagementResults.length ? engagementResults : [];

            // Return the combined response
            res.json(campaign);
        });
    });
};