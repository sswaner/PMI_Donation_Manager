const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Contact = require('./contact');
const Donation = require('./donation');
const Activity = require('./activity');
const Address = require('./address');
const DropdownOption = require('./dropdown'); // Add the DropdownOption model

const Account = sequelize.define('Account', {
  AccountID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  OrganizationName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  AccountType: {
    type: DataTypes.ENUM('Corporation', 'Governmental Department', 'Aid Agency', 'Grant Foundation', 'Retail (3rd Party Fundraising)'),
    allowNull: false,
  },
  AccountSize: {
    type: DataTypes.ENUM('Small', 'Medium', 'Large'),
    allowNull: true,
  },
  GivingPotential: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  AccountLocation: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  AccountChannel: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  SegmentID: { // Updated field to reference DropdownOptions table
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: DropdownOption,
      key: 'ID',
    },
  },
  PriorDonations: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  AccountManagerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserID',
    },
  },
  RecordCreatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserID',
    },
  },
  RecordLastModifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserID',
    },
  },
  CreatedTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ModifiedTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ExternalSystemID: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Accounts',
  timestamps: false,
});

// Associations
Account.associate = function(models) {
  Account.belongsTo(models.User, { as: 'AccountManager', foreignKey: 'AccountManagerID' });
  Account.belongsTo(models.User, { as: 'CreatedBy', foreignKey: 'RecordCreatedBy' });
  Account.belongsTo(models.User, { as: 'LastModifiedBy', foreignKey: 'RecordLastModifiedBy' });
  Account.belongsTo(models.DropdownOption, { as: 'Segment', foreignKey: 'SegmentID' }); // New association
  Account.hasMany(models.Contact, { as: 'Contacts', foreignKey: 'AssociatedAccount' });
  Account.hasMany(models.Donation, { as: 'Donations', foreignKey: 'AccountID' });
  Account.hasMany(models.Activity, { as: 'Activities', foreignKey: 'AccountID' });
  Account.hasMany(models.Address, { as: 'Addresses', foreignKey: 'AccountID' });
};

module.exports = Account;