// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false, // Enable console.log here for debugging if needed
    }
);

// Test Sequelize connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the MySQL database via Sequelize.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database with Sequelize:', err);
    });

// Export both `db` for legacy usage and `sequelize` for new ORM-based code
module.exports = sequelize;