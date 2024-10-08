const db = require('../db');

exports.getAccountById = (req, res) => {
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
};

exports.getAllAccounts = (req, res) => {
    const query = 'SELECT * FROM Accounts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching account details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

exports.getAccountOverview = (req, res) => {
    const accountId = req.params.id;
    const accountQuery = 'SELECT a.*, u.Username AS AccountManagerName FROM Accounts a LEFT JOIN Users u ON a.AccountManagerID = u.UserID WHERE a.AccountID = ?';
    const contactsQuery = 'SELECT * FROM Contacts WHERE AssociatedAccount = ?';
    const donationsQuery = 'SELECT * FROM Donations WHERE AccountID = ?';
    const activityQuery = 'SELECT * FROM Activities WHERE AccountID = ?';
    const addressQuery = 'SELECT * FROM Addresses WHERE AccountID = ?';

    db.query(accountQuery, [accountId], (err, accountResults) => {
        if (err) return res.status(500).send('Error fetching account details');
        if (accountResults.length === 0) return res.status(404).send('Account not found');
        const accountOverview = accountResults[0];
        
        db.query(contactsQuery, [accountId], (err, contactsResults) => {
            if (err) return res.status(500).send('Error fetching contacts');
            accountOverview.Contacts = contactsResults;
            
            db.query(donationsQuery, [accountId], (err, donationsResults) => {
                if (err) return res.status(500).send('Error fetching donations');
                accountOverview.Donations = donationsResults;
                
                db.query(activityQuery, [accountId], (err, activityResults) => {
                    if (err) return res.status(500).send('Error fetching activities');
                    accountOverview.Activities = activityResults;
                    
                    db.query(addressQuery, [accountId], (err, addressResults) => {
                        if (err) return res.status(500).send('Error fetching addresses');
                        accountOverview.Addresses = addressResults;
                        res.json(accountOverview);
                    });
                });
            });
        });
    });
};