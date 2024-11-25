const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const fs = require("fs");
const yaml = require("js-yaml"); // Install this package if needed: npm install js-yaml

// updated swagger hosting
const swaggerDocument = yaml.load(
  fs.readFileSync("./api-docs/swagger.yaml", "utf8"),
);

//const sequelize = require('./models').sequelize;
const { sequelize } = require("./db"); // Import from the correct file location
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Sync Sequelize Database
sequelize
  .sync({ force: false }) // Set `force: true` only for initial testing
  .then(() => {
    console.log("Database synced with Sequelize.");
  })
  .catch((err) => {
    console.error("Error syncing Sequelize database:", err);
  });

// Middleware
app.use(express.json());

// Serve the Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import and use the routes
const contactsRoutes = require("./routes/contacts");
const accountsRoutes = require("./routes/accounts");
const donationsRoutes = require("./routes/donations");
const campaignsRoutes = require("./routes/campaigns");
const activitiesRoutes = require("./routes/activities");
const userRoutes = require("./routes/user");
const dropdownRoutes = require("./routes/dropdowns");

app.use("/user", userRoutes);
app.use("/contacts", contactsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/donations", donationsRoutes);
app.use("/campaigns", campaignsRoutes);
app.use("/activities", activitiesRoutes);
app.use("/dropdowns", dropdownRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
