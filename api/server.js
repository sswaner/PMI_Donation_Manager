const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the React app, unsure how this will react with the above .use()
app.use(express.static(path.join(__dirname, 'client/build')));


// Import and use the routes
const contactsRoutes = require('./routes/contacts');
const accountsRoutes = require('./routes/accounts');
const donationsRoutes = require('./routes/donations');
const campaignsRoutes = require('./routes/campaigns');

app.use('/contacts', contactsRoutes);
app.use('/accounts', accountsRoutes);
app.use('/donations', donationsRoutes);
app.use('/campaigns', campaignsRoutes);

// Any request that doesn't match your API routes will serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
