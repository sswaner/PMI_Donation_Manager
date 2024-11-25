// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Account = require('./account');
const Contact = require('./contact');
const Activity = require('./activity');
const User = require('./user');
const Address = require('./address');
const Donation = require('./donation');
const Campaign = require('./campaign');  
const DropdownOption = require('./dropdown');

const models = {
  Account,
  Contact,
  Activity,
  User,
  Address,
  Donation,
  Campaign,
    DropdownOption,
};

// Initialize associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  ...models,
  sequelize,
};