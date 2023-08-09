const Shipping = require("../../../models").shipping;
const {
  validationError,
} = require("../../../components/errors");
const Order = require("../../../models").order;
const OrdersDetail = require("../../../models").ordersdetail;
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_TEST_KEY);
exports.createCustomer = async (req, res) => {
  try {
    const {
      source, email } = req.body;
    const customer = await stripe.customers.create({
      source,
      email,
    });
    if (!customer) throw new Error("Customer unsuccessful");
    res.status(200).json({
      message: "Customer Created successfully successfully",
      customer,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getShippingInfo = (req, res) => {
  let UserId = req.params.id;
  console.log(UserId);
  Shipping.findOne({where:{ userId: UserId }},).then ((data) => {
    console.log(data);
    return res.status(200).json(data);
  });
};

exports.saveShipping = (req, res) => {
  req.body.userId = req.params.id;
  Shipping.findOne({
    where:{userId: req.params.id}
  }).then((shipping) => {
    if (shipping) {
      shipping.update(req.body)
        .then(() => res.status(200).json({
          message: "Record updated successfully successfully",
        }))  // Send back the updated todo.
        .catch((error) => { console.log("Error",error);
          res.status(400).send(error)});
        } 
        else {
          Shipping.create(req.body)
      .then(shipping => res.status(201).send(shipping))
      .catch(error => res.status(400).send(error)); 
    }
  });
};

exports.postCharge = async (req, res) => {
  console.log(req.body);
  try {
    let UserId = req.params.id;
    await Shipping.findOne({
      where:{userId: UserId},
    }).then(async (shipping) => {
      let { amount } = req.body;
      customer = customer = shipping.customer;
      const charge = await stripe.charges.create({
        amount:amount*100,
        currency: "USD",
        customer,
      });

      if (!charge) throw new Error("charge unsuccessful");
      res.status(200).json({
        message: "charge posted successfully",
        charge,
      });
    });
  }catch(error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const bodyOrder = req.body.Order;
    bodyOrder.status = "Pending";
    const bodyOrderDetail = req.body.OrderDetail;
    bodyOrder.customerId = req.params.id;
    bodyOrder.totalProducts = req.body.OrderDetail.length;
    bodyOrder.orderDate = new Date();
    bodyOrder.shipeDate = new Date();
    bodyOrder.requireDate = new Date();
    await Order.create(bodyOrder).then((order) => {
      {
        bodyOrderDetail.forEach((element) => {
          element.orderId = order.id;
          element.orderDate = new Date();
          console.log(element);
          OrdersDetail.create(element).then(orderDetail => {
            return res.status(200).json({
              message: "Record saved successfully"
            });
          });
        });
      }
    });
  }catch(error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
