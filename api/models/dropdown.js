const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Replace with your DB connection setup

const Dropdown = sequelize.define("Dropdown", {
  ListName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Sort_Order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "DropdownOptions",
  timestamps: false,
});

module.exports = Dropdown;