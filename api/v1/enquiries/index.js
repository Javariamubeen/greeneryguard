const express = require("express");
const controller = require("./enquiry.controller");
const router = express.Router();

router.post("/", controller.create);

router.get("/", controller.listEnquiries);

router.get("/:id", controller.byId);

router.delete("/:id", controller.remove);

router.put("/", controller.updateEnquiry);


module.exports = router;
