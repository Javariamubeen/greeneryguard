// "use strict";;
const config = require("../config/environment");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const compose = require("composable-middleware");
const User = require("../models").users;
const validateJwt = expressJwt({ secret: config.secrets.session });
let tokensBlackList = [];

/**
 * Returns a jwt token signed by the app secret
 */
const signToken = id => {
  return jwt.sign({ id: id }, config.secrets.session, {
    expiresIn: '60m'
  });
};

/**
 * Attaches the user object to the request if authenticated
 */
const isAuthenticated = () => {
  return (
    compose()
      // Validate jwt
      .use((req, res, next) => {

        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty("access_token")
          && (tokensBlackList.length == 0 || tokensBlackList.length > 0 && CONSTANTS.FILTER_LIST(tokensBlackList, "access_token", req.query.access_token).length == 0) &&
          jwt.verify(req.query.access_token, CONSTANTS.SECRET_KEY) != undefined
        ) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }
        validateJwt(req, res, next);
      })

      // Attach user to request
      .use((req, res, next) => {
        console.log("User info",req.user);
        User.findOne({where:{id:req.user.id}}, (err, user) => {
          if (err) return next(err);
          if (!user) return res.sendStatus(401);
          req.user = user;
          next();
        });
      })
  );
};

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
