const {handleError} = require("../../../components/errors");
const Order = require("../../../models").order;
const User = require("../../../models").users;
const OrderDetail = require("../../../models").ordersDetail;

exports.OrderList = (request, response) => {
  const customerId = request.params.buyerId;
  console.log("customer "+customerId);
  let whereClause = {};
  if (customerId) {
    whereClause.customerId = customerId;
  }
  Order.findAll({where: whereClause, order: [
      ['orderDate', 'DESC']
    ], include: [User, OrderDetail]})
      .then (data => {
        console.log("Data "+JSON.stringify(data));
    return response.status(200).json(data);
  });
};

exports.UpdateOrder = (request, response) => {
  Order.findOne({
    where: {id: request.body.Id}
  }).then((order) => {
    if (order != null) {
      order.status = request.body.status;
      order.isNewRecord = false;
      console.log(order.status);
      order.save().then(() => {
        const back = {
          message: "Order updated successfully",
        };
        return response.status(200).json(back);
      });
    }
  });
};

exports.OrderListAll = (request, response) => {
  try {
    Order.find({})
      .sort({ _id: -1 })
      .exec((error, data) => {
        if (error) {
          return handleError(response, error);
        }
        return response.status(200).json(data);
      });
  } catch (ex) {
    return ex;
  }
};

exports.OrdersByDate = (req, res) => {
  Order.aggregate([
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $month: "$orderDate" }, 9],
            $eq: [{ $year: "$orderDate" }, 2020],
          },
          "$$KEEP",
          "$$PRUNE",
        ],
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%m/%d", date: "$orderDate" } },
          pair: "$pair",
        },
        total: { $sum: "$total" },
      },
    },
    { $project: { date: "$_id.date", _id: 0, total: 1 } },
    { $sort: { date: 1 } },
  ]).then((values) => res.json(values));
};

exports.OrdersCountByStatus = (req, res) => {
  let date = req.body.date;
  Order.aggregate([
    {
      $group: {
        _id: "$status",
        orders: { $sum: 1 },
      },
    },
    { $project: { name: "$_id", _id: 0, orders: 1 } },
  ]).then((values) => res.json(values));
};

exports.RecentDepositsAmount = (req, res) => {
  var d = new Date();
  var currentDate = new Date(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  );

  console.log("CurrentDate", currentDate);
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  console.log("Next Date", nextDate);
  Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: currentDate,
          $lt: nextDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
    { $project: { recentDeposits: "$total", _id: 0 } },
  ]).exec((error, data) => {
    if (error) {
      return handleError(res, error);
    }
    console.log(data);
    if (data[0]) {
      return res.status(200).json({ recentDeposits: data[0].recentDeposits });
    } else {
      return res.status(200).json({ recentDeposits: 0 });
    }
  });
};
