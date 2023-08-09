// "use strict";;

var express = require("express");
var config = require("../config/environment");
var User = require("../models").users;
var Role = require("../models").roles;

// Passport Configuration
require("./local/passport").setup(User,Role, config);

var router = express.Router();
router.use("/", require("./local"));

module.exports = router;
