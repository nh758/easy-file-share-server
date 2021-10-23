const dotenv = require("dotenv");
const express = require("express");
const WebLoader = require("./loaders/website.js");
const DBLoader = require("./loaders/database.js");

// Config
if (process.env.NODE_ENV !== "production") dotenv.config();

// Website
const app = express();
WebLoader.init(app);

// Database
DBLoader.init();
// DBLoader.db.sequelize.sync();
