// models/campaign.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Campaign = sequelize.define('Campaign', {
  CampaignID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CampaignName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  CampaignType: {
    type: DataTypes.ENUM('Blue-Sky', 'Grey-Sky'),
    allowNull: false,
  },
  StartDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  EndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  TargetAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CampaignManagerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserID',
    },
  },
}, {
  tableName: 'Campaigns',
  timestamps: false,
});
// models/campaign.js (continued)
Campaign.belongsTo(User, { as: 'CampaignManager', foreignKey: 'CampaignManagerID' });

module.exports = Campaign;