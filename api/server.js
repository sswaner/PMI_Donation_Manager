const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

// Database connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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
    const query = 'SELECT * FROM Donations WHERE DonationID = ?';

    db.query(query, [donationId], (err, results) => {
        if (err) {
            console.error('Error fetching donation details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Donation not found');
            return;
        }

        res.json(results[0]);
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

// Function to get a specific campaign by CampaignID with total donations sum
app.get('/campaigns/:id', (req, res) => {
    const campaignId = req.params.id;
    const query = `
        SELECT 
            c.*,
            IFNULL(SUM(d.Amount), 0) AS TotalDonations
        FROM 
            Campaigns c
        LEFT JOIN 
            Donations d ON c.CampaignID = d.CampaignID
        WHERE 
            c.CampaignID = ?
        GROUP BY 
            c.CampaignID
    `;

    db.query(query, [campaignId], (err, results) => {
        if (err) {
            console.error('Error fetching campaign:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Campaign not found');
            return;
        }

        res.json(results[0]);
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

                // Send the composed JSON response
                res.json(accountOverview);
            });
        });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

