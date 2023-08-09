// "use strict";;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const express = require("express");
const config = require("./config/environment");
require('dotenv').config();
// Setup server
const app = express();
const server = require("http").createServer(app);
var Sequelize = require('sequelize')
    , sequelize = new Sequelize ('mydb', 'myuser', '123456', {
    dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb
    port:5432,
    host:'127.0.0.1'
    // , sequelize = new Sequelize( process.env.database, process.env.username,process.env.password, {
    // "postgresql://localhost:5432/mydb"
    //   port:    process.env.port, // or 5432 (for postgres),
    // host: process.env.host
    });
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });
require("./config/express")(app);
require("./routes")(app);

// Start server
server.listen(config.port, config.ip, () => {
  console.log(
    "Express server listening on %d, in %s mode",
    config.port,
    app.get("env")
  );
});

process.on('uncaughtException', function (error, req, res) {
  console.log(error.stack);
  process.exit(1);
})

// Expose app
exports = module.exports = app;
