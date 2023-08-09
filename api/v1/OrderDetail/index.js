const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("/list/:id/:sellerId?", controller.list);

module.exports = router;
