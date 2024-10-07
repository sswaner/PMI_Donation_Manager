const db = require('../db'); // Assuming you extract the db connection into a separate file

exports.getContactById = (req, res) => {
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
};

exports.getAllContacts = (req, res) => {
    const query = 'SELECT * FROM Contacts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contact details:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

exports.addContact = (req, res) => {
    const {
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress, 
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount,
        ContactChannel, IsActive, LastContactDate, PreferredLanguage,
        DoNotContact, RecordCreatedBy, ExternalSystemID, Notes
    } = req.body; // Destructuring the contact data from the request body

    const query = `
        INSERT INTO Contacts 
        (FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress, 
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount, 
        ContactChannel, IsActive, LastContactDate, PreferredLanguage, 
        DoNotContact, RecordCreatedBy, ExternalSystemID, Notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress,
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount,
        ContactChannel, IsActive, LastContactDate, PreferredLanguage,
        DoNotContact, RecordCreatedBy, ExternalSystemID, Notes
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error adding contact:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(201).send({ message: 'Contact added successfully', contactID: result.insertId });
    });
};

exports.updateContact = (req, res) => {
    const contactID = req.params.id;
    const {
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress, 
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount, 
        ContactChannel, IsActive, LastContactDate, PreferredLanguage, 
        DoNotContact, RecordLastModifiedBy, ExternalSystemID, Notes
    } = req.body;

    const query = `
        UPDATE Contacts 
        SET FirstName = ?, LastName = ?, OfficialEmailAddress = ?, PersonalEmailAddress = ?, 
        OfficialPhoneNumber = ?, PersonalPhoneNumber = ?, Role = ?, AssociatedAccount = ?, 
        ContactChannel = ?, IsActive = ?, LastContactDate = ?, PreferredLanguage = ?, 
        DoNotContact = ?, RecordLastModifiedBy = ?, ExternalSystemID = ?, Notes = ?
        WHERE ContactID = ?
    `;

    const values = [
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress,
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount,
        ContactChannel, IsActive, LastContactDate, PreferredLanguage,
        DoNotContact, RecordLastModifiedBy, ExternalSystemID, Notes, contactID
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating contact:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Contact not found');
        }

        res.send({ message: 'Contact updated successfully' });
    });
};