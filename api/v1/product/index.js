const express = require("express");
const controller = require("./product.controller");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (request, file, callBack) {
    callBack(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });
router.get("/mostSold", controller.mostSold);

router.post("/", upload.array('productImages', 1), controller.create);

router.get("/", controller.list);

router.post("/filter", controller.listByFilter);

router.get("/:id", controller.byId);

router.delete("/:id", controller.remove);

router.put("/update", upload.array('productImages', 1), controller.update);

module.exports = router;
