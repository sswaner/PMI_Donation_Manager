// models/Contact.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import Sequelize instance

const Contact = sequelize.define('Contact', {
    ContactID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    LastName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    OfficialEmailAddress: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    PersonalEmailAddress: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    OfficialPhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    PersonalPhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Role: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    AssociatedAccount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Accounts', // References the `Accounts` table
            key: 'AccountID'
        }
    },
    ContactChannel: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    IsActive: {
        type: DataTypes.BOOLEAN, // `tinyint(1)` maps to BOOLEAN in Sequelize
        allowNull: true
    },
    LastContactDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    PreferredLanguage: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DoNotContact: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    RecordCreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    RecordLastModifiedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CreatedTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    ModifiedTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    ExternalSystemID: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false, // Disable automatic timestamps, as we use custom timestamps
    tableName: 'Contacts', // Explicitly define the table name
    underscored: false
});

module.exports = Contact;