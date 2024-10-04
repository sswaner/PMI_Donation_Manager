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