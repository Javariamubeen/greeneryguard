// "use strict";;

const express = require("express");
const controller = require("./sentEmails.controller");
const router = express.Router();

router.post("/mail", controller.sendEmail);
router.post("/contactUs", controller.contactUs);


module.exports = router;
