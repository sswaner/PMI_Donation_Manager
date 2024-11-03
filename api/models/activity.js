// models/Activity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import Sequelize instance

const Activity = sequelize.define('Activity', {
    ActivityID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AccountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Accounts', // References `Accounts` table
            key: 'AccountID'
        }
    },
    ContactID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Contacts', // References `Contacts` table
            key: 'ContactID'
        },
        onDelete: 'SET NULL' // Matches the foreign key constraint in SQL
    },
    ActivityType: {
        type: DataTypes.ENUM('Email', 'Meeting', 'Phone Call', 'Note'),
        allowNull: false
    },
    ActivityDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // References `Users` table
            key: 'UserID'
        }
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false, // Disable automatic timestamps, as we're using custom ones
    tableName: 'Activities', // Explicitly define table name
    underscored: false
});

module.exports = Activity;