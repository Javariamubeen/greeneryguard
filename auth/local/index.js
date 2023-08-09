// "use strict";;

const express = require("express");
const passport = require("passport");
const auth = require("../auth.service");
const router = express.Router();
console.log("ffffdsaffa")
router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    const error = err || info;
    if (error) return res.sendStatus(401);
    if (!user) return res.sendStatus(404);
console.log(token,"sdsadsd")
    const token = auth.signToken(user._id, user.primary_role);
    res.json({
      user: {email: user.email, role: user.primary_role,id:user.id},
      access_token: token,
      expires_in: '60m',
      permissions: user.permissions,
      _id: user.id
    });
  })(req, res, next);
});

module.exports = router;
