const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post('/charge/:id', controller.postCharge);
router.post('/customer/:id', controller.createCustomer);
router.get('/shippingbyid/:id', controller.getShippingInfo);
router.post('/saveShipping/:id', controller.saveShipping);
router.post('/createOrder/:id', controller.createOrder);
module.exports = router;
