const express = require('express');
const mysql = require('mysql2');
const path = require('path');

require('dotenv').config();

// Database connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: 'FKY5g8z>diX1ia8zikV#St~%VI:Z', //process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
console.log(process.env.DB_PASSWORD);

const app = express();
const port = process.env.PORT || 3000;


// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the React app, unsure how this will react with the above .use()
app.use(express.static(path.join(__dirname, 'client/build')));

// Route to get contact details by ContactID
app.get('/contacts/:id', (req, res) => {
    const contactID = req.params.id;
    const query = 'SELECT * FROM Contacts WHERE ContactID = ?';

    db.query(query, [contactID], (err, results) => {
        if (err) {
            console.error('Error fetching contact details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Contact not found');
            return;
        }

        res.json(results[0]);
    });
});

app.get('/contacts/', (req, res) => {
    const query = 'SELECT * FROM Contacts';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contact details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Contact not found');
            return;
        }

        res.json(results);
    });
});

app.get('/accounts/:id', (req, res) => {
    const accountID = req.params.id;
    const query = 'SELECT * FROM Accounts WHERE AccountID = ?';

    db.query(query, [accountID], (err, results) => {
        if (err) {
            console.error('Error fetching account details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Account not found');
            return;
        }

        res.json(results[0]);
    });
});

app.get('/accounts/', (req, res) => {   
    const query = 'SELECT * FROM Accounts';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching account details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Account not found');
            return;
        }

        res.json(results);
    });
});

app.get('/donations/:id', (req, res) => {
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
});

// Function to get all campaigns
app.get('/campaigns', (req, res) => {
    const query = 'SELECT * FROM Campaigns';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching campaigns:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.get('/campaigns/:id', (req, res) => {
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
});

// Function to get account overview by AccountID
app.get('/accounts/overview/:id', (req, res) => {
    const accountId = req.params.id;

    // Query 1: Get the account details and the account manager's name
    const accountQuery = `
        SELECT 
            a.*,
            u.Username AS AccountManagerName
        FROM 
            Accounts a
        LEFT JOIN 
            Users u ON a.AccountManagerID = u.UserID
        WHERE 
            a.AccountID = ?
    `;

    // Query 2: Get the contacts associated with the account
    const contactsQuery = `
        SELECT 
            c.*
        FROM 
            Contacts c
        WHERE 
            c.AssociatedAccount = ?
    `;

    // Query 3: Get the donations associated with the account
    const donationsQuery = `
        SELECT 
            d.*
        FROM 
            Donations d
        WHERE 
            d.AccountID = ?
    `;

    const activityQuery = `
        SELECT 
            a.*
        FROM
            Activities a
        WHERE
            a.AccountID = ?     
    `;

    const addressQuery = `
        SELECT
            ad.*        
        FROM
            Addresses ad
        WHERE   
            ad.AccountID = ?
    `;

    // Execute the queries and compose the results
    db.query(accountQuery, [accountId], (err, accountResults) => {
        if (err) {
            console.error('Error fetching account details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (accountResults.length === 0) {
            res.status(404).send('Account not found');
            return;
        }

        const accountOverview = accountResults[0]; // Get the account details

        // Fetch contacts
        db.query(contactsQuery, [accountId], (err, contactsResults) => {
            if (err) {
                console.error('Error fetching contacts:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            accountOverview.Contacts = contactsResults; // Add contacts to the account overview

            // Fetch donations
            db.query(donationsQuery, [accountId], (err, donationsResults) => {
                if (err) {
                    console.error('Error fetching donations:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                accountOverview.Donations = donationsResults; // Add donations to the account overview
           // Fetch addresses
            db.query(addressQuery, [accountId], (err, addressResults) => {
                if (err) {
                    console.error('Error fetching addresses:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                accountOverview.Addresses = addressResults; // Add addresses to the account overview
            // Fetch activities
            db.query(activityQuery, [accountId], (err, activityResults) => {
                if (err) {
                    console.error('Error fetching activities:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                accountOverview.Activities = activityResults; // Add activities to the account overview

                // Send the composed JSON response
                res.json(accountOverview);
            });
        });
        });
    });
    });
});

// Any request that doesn't match your API routes will serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

1