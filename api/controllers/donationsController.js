const db = require('../db'); // Import the db connection
const { formatDonationResponse } = require('../utils/formatters'); // Import the formatter
const { errorResponse } = require('../utils/errorHandler');

exports.getDonationById = (req, res) => {
    const donationId = req.params.id;

    db.query('SELECT * FROM Donations WHERE DonationID = ?', [donationId], (err, donationResults) => {
        if (err) {
            return errorResponse(res, 'Error fetching donation details');
        }

        if (donationResults.length === 0) {
            return errorResponse(res, 'Donation not found', 404);
        }

        const donation = formatDonationResponse(donationResults[0]);
        res.json(donation); // Send the formatted response
    });
};
exports.createDonation = (req, res) => {
    const {
        AccountID, ContactID, CampaignID, Amount, Currency, DonationDate,
        DonationStatus, DonationSource, Designation, Notes, InKind, PendingAmount,
        AccountManagerID, RecordCreatedBy, ExternalSystemID
    } = req.body;

    // Validation for required fields
    if (!Amount || !Currency || !DonationDate || !DonationStatus || !RecordCreatedBy) {
        return res.status(400).send('Missing required fields: Amount, Currency, DonationDate, DonationStatus, RecordCreatedBy');
    }

    const query = `
        INSERT INTO Donations 
        (AccountID, ContactID, CampaignID, Amount, Currency, DonationDate, DonationStatus, 
        DonationSource, Designation, Notes, InKind, PendingAmount, AccountManagerID, RecordCreatedBy, 
        RecordLastModifiedBy, CreatedTimestamp, ModifiedTimestamp, ExternalSystemID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
    `;

    const values = [
        AccountID, ContactID, CampaignID, Amount, Currency, DonationDate, DonationStatus,
        DonationSource, Designation, Notes, InKind, PendingAmount, AccountManagerID, RecordCreatedBy,
        RecordCreatedBy, ExternalSystemID
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating donation:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send({ message: 'Donation created successfully', DonationID: result.insertId });
    });
};
exports.updateDonation = (req, res) => {
    const donationID = req.params.id;
    const {
        AccountID, ContactID, CampaignID, Amount, Currency, DonationDate,
        DonationStatus, DonationSource, Designation, Notes, InKind, PendingAmount,
        AccountManagerID, RecordLastModifiedBy, ExternalSystemID
    } = req.body;

    // Validation for required fields
    if (!Amount || !Currency || !DonationDate || !DonationStatus || !RecordLastModifiedBy) {
        return res.status(400).send('Missing required fields: Amount, Currency, DonationDate, DonationStatus, RecordLastModifiedBy');
    }

    const query = `
        UPDATE Donations 
        SET AccountID = ?, ContactID = ?, CampaignID = ?, Amount = ?, Currency = ?, DonationDate = ?, 
            DonationStatus = ?, DonationSource = ?, Designation = ?, Notes = ?, InKind = ?, 
            PendingAmount = ?, AccountManagerID = ?, RecordLastModifiedBy = ?, 
            ModifiedTimestamp = NOW(), ExternalSystemID = ?
        WHERE DonationID = ?
    `;

    const values = [
        AccountID, ContactID, CampaignID, Amount, Currency, DonationDate, DonationStatus,
        DonationSource, Designation, Notes, InKind, PendingAmount, AccountManagerID, 
        RecordLastModifiedBy, ExternalSystemID, donationID
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating donation:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Donation not found');
        }

        res.send({ message: 'Donation updated successfully' });
    });
};


exports.getDonationsByAccountId = (req, res) => {
    const accountId = req.params.accountId;

    const query = 'SELECT * FROM Donations WHERE AccountID = ?';

    db.query(query, [accountId], (err, results) => {
        if (err) {
            console.error('Error fetching donations by account ID:', err);
            return res.status(500).send('Internal Server Error');
        }

        const donations = results.map(formatDonationResponse);

        res.json(donations); // Always return an array, even if it's empty
    });
};
