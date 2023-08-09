// "use strict";;

const path = require("path");
const _ = require("lodash");

// All configurations will extend these options
const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + "/../../.."),

  // Server port
  port: process.env.PORT || 5000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: "zo-secrets"
  }
};

// Export the config object based on the NODE_ENV
module.exports = _.merge(
  all,
  require("./" + process.env.NODE_ENV + ".js") || {}
);
