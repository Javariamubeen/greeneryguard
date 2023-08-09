const express = require("express");
const controller = require("./role.controller");
const router = express.Router();

router.post("/", controller.create);

router.get("/", controller.listRoles);

router.get("/:id", controller.byId);

router.delete("/:id", controller.remove);

router.put("/", controller.updateRole);


module.exports = router;
