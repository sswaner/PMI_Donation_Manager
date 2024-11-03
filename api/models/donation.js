// models/donation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Donation = sequelize.define('Donation', {
  DonationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  Currency: {
    type: DataTypes.ENUM('IDR', 'USD'),
    defaultValue: 'IDR',
    allowNull: false,
  },
  DonationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  DonationStatus: {
    type: DataTypes.ENUM('Solicited', 'Committed', 'Received'),
    allowNull: false,
  },
  DonationSource: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Designation: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  InKind: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PendingAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
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
}, {
  tableName: 'Donations',
  timestamps: false,
});

// Define associations in an `associate` function
Donation.associate = (models) => {
  Donation.belongsTo(models.Account, { as: 'Account', foreignKey: 'AccountID' });
  Donation.belongsTo(models.Contact, { as: 'Contact', foreignKey: 'ContactID' });
  Donation.belongsTo(models.Campaign, { as: 'Campaign', foreignKey: 'CampaignID' });
  Donation.belongsTo(models.User, { as: 'AccountManager', foreignKey: 'AccountManagerID' });
  Donation.belongsTo(models.User, { as: 'CreatedBy', foreignKey: 'RecordCreatedBy' });
  Donation.belongsTo(models.User, { as: 'LastModifiedBy', foreignKey: 'RecordLastModifiedBy' });
};

module.exports = Donation;

// // models/donation.js
// const { DataTypes } = require('sequelize');

// const sequelize = require('../config/database');

// const Account = require('./account');
// const Contact = require('./contact');
// const Campaign = require('./campaign');
// const User = require('./user');

// const Donation = sequelize.define('Donation', {
//   DonationID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   AccountID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: Account,
//       key: 'AccountID',
//     },
//   },
//   ContactID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: Contact,
//       key: 'ContactID',
//     },
//   },
//   CampaignID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: Campaign,
//       key: 'CampaignID',
//     },
//   },
//   Amount: {
//     type: DataTypes.DECIMAL(15, 2),
//     allowNull: false,
//   },
//   Currency: {
//     type: DataTypes.ENUM('IDR', 'USD'),
//     defaultValue: 'IDR',
//     allowNull: false,
//   },
//   DonationDate: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   DonationStatus: {
//     type: DataTypes.ENUM('Solicited', 'Committed', 'Received'),
//     allowNull: false,
//   },
//   DonationSource: {
//     type: DataTypes.STRING(50),
//     allowNull: true,
//   },
//   Designation: {
//     type: DataTypes.STRING(50),
//     allowNull: true,
//   },
//   Notes: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   InKind: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
//   PendingAmount: {
//     type: DataTypes.DECIMAL(15, 2),
//     allowNull: true,
//   },
//   AccountManagerID: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: User,
//       key: 'UserID',
//     },
//   },
//   RecordCreatedBy: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'UserID',
//     },
//   },
//   RecordLastModifiedBy: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'UserID',
//     },
//   },
//   CreatedTimestamp: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   ModifiedTimestamp: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   ExternalSystemID: {
//     type: DataTypes.STRING(50),
//     allowNull: true,
//   },
// }, {
//   tableName: 'Donations',
//   timestamps: false,
// });

// // models/donation.js (continued)

// Donation.associate = (models) => {
//     Donation.belongsTo(models.Account, { as: 'Account', foreignKey: 'AccountID' });
//     Donation.belongsTo(models.Contact, { as: 'Contact', foreignKey: 'ContactID' });
//     Donation.belongsTo(models.Campaign, { as: 'Campaign', foreignKey: 'CampaignID' });
//     Donation.belongsTo(models.User, { as: 'AccountManager', foreignKey: 'AccountManagerID' });
//     Donation.belongsTo(models.User, { as: 'CreatedBy', foreignKey: 'RecordCreatedBy' });
//     Donation.belongsTo(models.User, { as: 'LastModifiedBy', foreignKey: 'RecordLastModifiedBy' });
//   };


// module.exports = Donation;

// // // Donation.belongsTo(Account, { as: 'Account', foreignKey: 'AccountID' });
// // // Donation.belongsTo(Contact, { as: 'Contact', foreignKey: 'ContactID' });
// // Donation.belongsTo(Campaign, { as: 'Campaign', foreignKey: 'CampaignID' });
// // // Donation.belongsTo(User, { as: 'AccountManager', foreignKey: 'AccountManagerID' });
// // Donation.belongsTo(User, { as: 'CreatedBy', foreignKey: 'RecordCreatedBy' });
// // Donation.belongsTo(User, { as: 'LastModifiedBy', foreignKey: 'RecordLastModifiedBy' });

