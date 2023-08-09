const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("/list/:buyerId?", controller.OrderList);
router.get("/listByDate", controller.OrdersByDate);
router.get("/listAll", controller.OrderListAll);
router.post("/countByStatus", controller.OrdersCountByStatus);
router.get("/recentDepositsAmount", controller.RecentDepositsAmount);
router.put("/updateOrder", controller.UpdateOrder);


module.exports = router;
