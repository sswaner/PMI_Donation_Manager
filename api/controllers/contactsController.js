const { Contact } = require('../models'); // Assuming Contact is the Sequelize model

exports.getContactById = async (req, res) => {
    const contactID = req.params.id;

    try {
        const contact = await Contact.findOne({ where: { ContactID: contactID } });
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contact details:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contact details:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.addContact = async (req, res) => {
    const {
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress, 
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount,
        ContactChannel, IsActive, LastContactDate, PreferredLanguage,
        DoNotContact, RecordCreatedBy, ExternalSystemID, Notes
    } = req.body;

    try {
        const newContact = await Contact.create({
            FirstName,
            LastName,
            OfficialEmailAddress,
            PersonalEmailAddress,
            OfficialPhoneNumber,
            PersonalPhoneNumber,
            Role,
            AssociatedAccount,
            ContactChannel,
            IsActive,
            LastContactDate,
            PreferredLanguage,
            DoNotContact,
            RecordCreatedBy,
            ExternalSystemID,
            Notes
        });

        res.status(201).send({ message: 'Contact added successfully', contactID: newContact.ContactID });
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateContact = async (req, res) => {
    const contactID = req.params.id;
    const {
        FirstName, LastName, OfficialEmailAddress, PersonalEmailAddress, 
        OfficialPhoneNumber, PersonalPhoneNumber, Role, AssociatedAccount, 
        ContactChannel, IsActive, LastContactDate, PreferredLanguage, 
        DoNotContact, RecordLastModifiedBy, ExternalSystemID, Notes
    } = req.body;

    try {
        const [updatedRowsCount] = await Contact.update(
            {
                FirstName,
                LastName,
                OfficialEmailAddress,
                PersonalEmailAddress,
                OfficialPhoneNumber,
                PersonalPhoneNumber,
                Role,
                AssociatedAccount,
                ContactChannel,
                IsActive,
                LastContactDate,
                PreferredLanguage,
                DoNotContact,
                RecordLastModifiedBy,
                ExternalSystemID,
                Notes
            },
            { where: { ContactID: contactID } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).send('Contact not found');
        }

        res.send({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).send('Internal Server Error');
    }
};