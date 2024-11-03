// models/user.js
const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Adjust the path as needed to connect to your DB
const sequelize = require('../config/database');  // Import Sequelize instance

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  UserRole: {
    type: DataTypes.ENUM('Admin', 'Fundraising Admin', 'Staff'),
    allowNull: false,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  LastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  AssociatedAccountID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  CampaignAccess: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'Users',
  timestamps: false, // Disable timestamps if the table doesn't have `createdAt` and `updatedAt`
});

module.exports = User;