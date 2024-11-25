const db = require('../config/database');

const { formatAccountResponse, formatContactResponse } = require('../utils/formatters');

// const { Account, Contact, Donation, Activity, Address, User } = require('../models');

const Account = require('../models/account');
const User = require('../models/user');
const Contact = require('../models/contact');
const Donation = require('../models/donation');
const Activity = require('../models/activity');
const Address = require('../models/address');

exports.getAccountById = async (req, res) => {
    try {
        const accountID = req.params.id;
        const account = await Account.findOne({ where: { AccountID: accountID } });
        if (!account) {
            return res.status(404).send('Account not found');
        }
        res.json(account); // Send the account data
    } catch (err) {
        console.error('Error fetching account details:', err);
        res.status(500).send('Internal Server Error');
    }
};


exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll(); // Fetches all records from the Accounts table
        res.json(accounts); // Sends the result as JSON
    } catch (err) {
        console.error('Error fetching account details:', err);
        res.status(500).send('Internal Server Error');
    }
};



exports.getAccountOverview = async (req, res) => {
    try {
        const accountId = req.params.id;

        const accountOverview = await Account.findOne({
            where: { AccountID: accountId },
            include: [
                {
                    model: User,
                    as: 'AccountManager', // Matches the alias in `Account.belongsTo(User, { as: 'AccountManager' })`
                    attributes: ['Username'],
                  },
                  {
                    model: User,
                    as: 'CreatedBy', // Matches the alias for `RecordCreatedBy`
                    attributes: ['Username'],
                  },
                  {
                    model: User,
                    as: 'LastModifiedBy', // Matches the alias for `RecordLastModifiedBy`
                    attributes: ['Username'],
                  },
                {
                    model: Contact,
                    as: 'Contacts', // Assuming `Account.hasMany(Contact, { as: 'Contacts' })`
                    where: { AssociatedAccount: accountId },
                    required: false, // Set to false to allow Accounts without Contacts
                },
                {
                    model: Donation,
                    as: 'Donations', // Assuming `Account.hasMany(Donation, { as: 'Donations' })`
                    where: { AccountID: accountId },
                    required: false,
                },
                {
                    model: Activity,
                    as: 'Activities', // Assuming `Account.hasMany(Activity, { as: 'Activities' })`
                    where: { AccountID: accountId },
                    required: false,
                },
                {
                    model: Address,
                    as: 'Addresses', // Assuming `Account.hasMany(Address, { as: 'Addresses' })`
                    where: { AccountID: accountId },
                    required: false,
                }
            ]
        });

        if (!accountOverview) {
            return res.status(404).send('Account not found');
        }

        res.json(accountOverview); // Send the aggregated account data
    } catch (err) {
        console.error('Error fetching account overview:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.createAccount = async (req, res) => {
    const {
        OrganizationName, AccountType, AccountSize, GivingPotential, AccountLocation,
        AccountChannel, Segment , PriorDonations, AccountManagerID, RecordCreatedBy,
        ExternalSystemID, Notes
    } = req.body;

    // Validation for required fields
    if (!OrganizationName || !AccountType || !AccountManagerID || !RecordCreatedBy) {
        return res.status(400).send('Missing required fields: OrganizationName, AccountType, AccountManagerID, RecordCreatedBy');
    }

    try {
        // Create a new account using Sequelize's `create` method
        const newAccount = await Account.create({
            OrganizationName,
            AccountType,
            AccountSize,
            GivingPotential,
            AccountLocation,
            AccountChannel,
            SegmentID,
            PriorDonations,
            AccountManagerID,
            RecordCreatedBy,
            RecordLastModifiedBy: RecordCreatedBy, // Assuming initial creator is also the last modifier
            CreatedTimestamp: new Date(), // Sequelize will set current timestamp if fields use default values
            ModifiedTimestamp: new Date(),
            ExternalSystemID,
            Notes
        });

        res.status(201).send({ message: 'Account created successfully', AccountID: newAccount.AccountID });
    } catch (err) {
        console.error('Error creating account:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateAccount = async (req, res) => {
    const accountID = req.params.id;
    const {
        OrganizationName, AccountType, AccountSize, GivingPotential, AccountLocation,
        AccountChannel, SegmentID, PriorDonations, AccountManagerID, RecordLastModifiedBy,
        ExternalSystemID, Notes
    } = req.body;

    // Validation for required fields
    if (!OrganizationName || !AccountType || !AccountManagerID || !RecordLastModifiedBy) {
        return res.status(400).send('Missing required fields: OrganizationName, AccountType, AccountManagerID, RecordLastModifiedBy');
    }

    try {
        const [updatedRowCount] = await Account.update(
            {
                OrganizationName,
                AccountType,
                AccountSize,
                GivingPotential,
                AccountLocation,
                AccountChannel,
                SegmentID,
                PriorDonations,
                AccountManagerID,
                RecordLastModifiedBy,
                ModifiedTimestamp: new Date(),
                ExternalSystemID,
                Notes
            },
            {
                where: { AccountID: accountID }
            }
        );

        if (updatedRowCount === 0) {
            return res.status(404).send('Account not found');
        }

        res.send({ message: 'Account updated successfully' });
    } catch (err) {
        console.error('Error updating account:', err);
        res.status(500).send('Internal Server Error');
    }
};


exports.getContactsByAccountID = async (req, res) => {
    const accountID = req.params.AccountID;

    try {
        const contacts = await Contact.findAll({
            where: { AssociatedAccount: accountID },
            order: [['LastName', 'ASC'], ['FirstName', 'ASC']]
        });

        if (contacts.length === 0) {
            return res.status(404).send('No contacts found for this account');
        }

        const formattedContacts = contacts.map(formatContactResponse); // Assuming a contact formatter exists
        res.json(formattedContacts); // Return the formatted contacts
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Internal Server Error');
    }
};