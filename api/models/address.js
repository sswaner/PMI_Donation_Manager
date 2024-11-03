// models/address.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed to connect to your DB

const Address = sequelize.define('Address', {
  AddressID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  AccountID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'AccountID',
    },
  },
  ContactID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Contacts',
      key: 'ContactID',
    },
    onDelete: 'SET NULL',
  },
  Building: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  AddressLocation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Province: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  PostalCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Indonesia',
  },
}, {
  tableName: 'Addresses',
  timestamps: false, // Disable timestamps if the table doesn't have `createdAt` and `updatedAt`
});

// Define associations in an associate function
Address.associate = (models) => {
  Address.belongsTo(models.Account, { as: 'Account', foreignKey: 'AccountID' });
  Address.belongsTo(models.Contact, { as: 'Contact', foreignKey: 'ContactID' });
};

module.exports = Address;
