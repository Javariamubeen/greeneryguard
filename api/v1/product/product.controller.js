const Product = require('../../../models').products;
const User = require('../../../models').users;
const OrderDetails = require('../../../models').ordersdetail;
require('dotenv').config();
const db = require('../../../models/index')
const {
  handleError,
} = require("../../../components/errors");
var fs = require("fs");
const { split } = require("lodash");
const {ordersDetail: OrderDetail} = require("../../../models");
const getFilePaths = (files, paths) => {
  files.forEach(({ destination, filename }) => {
    let dest = destination.substring(1);
    let filePath = destination + '/' + filename;
    paths.push(filePath);
  });
  return paths;
};

exports.create = (req, res) => {
  const newProduct = req.body;
  if (req.files) {
    newProduct.productImages = []
    newProduct.productImages = getFilePaths(req.files, newProduct.productImages);
    newProduct.imageLargeUrl=newProduct.productImages[0]
    console.log("newProduct",  newProduct)
  }
  Product.create(newProduct)
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
}

exports.list = (req, res) => {
  const businessId = req.query.seller_id;
  let whereClause = {isDeleted:false};
  if (businessId) {
    whereClause.businessId = businessId;
  }
  Product.findAll({
    where:whereClause, include: [User]
  })
  .then(products => res.status(200).send(products))
  .catch(error => {
    console.log(error);
    res.status(400).send(error)
  });
}

exports.listByFilter = (req, res) => {
  const categories = req.body.categories;
  const whereClause = {isDeleted: false};
  if (categories.length) {
    whereClause.categoryId = categories;
  }
  Product.findAll({
    where: whereClause, include: [User]
  })
      .then(products => res.status(200).send(products))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
}

exports.update = (req, res) => {
  productObj = req.body;
  Product.findOne({where :{id:productObj._id}})
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return product.update(productObj)
        .then(() => res.status(200).send(product))  // Send back the updated todo.
        .catch((error) => { console.log("Error",error);
          res.status(400).send(error)});
    })
    .catch((error) =>{console.log("Error",error); res.status(400).send(error)});
}

exports.listProducts = (request, response) => {
  Product.find({isDeleted: false }, (error, products) => {
    if (error) {
      return handleError(response, error);
    }
    return response.status(200).json(products);
  });
};

exports.byId = (request, res) => {
  const productId = request.params.id;
console.log("Product Id",productId);
Product.findOne(
    {
      where :{id:productId}, include: [User]
    })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: 'Todo Not Found',
        });
      }
      return res.status(200).send(product);
    })
    .catch(error => res.status(400).send(error));
};

exports.remove = (request, response) => {
  const orders = OrderDetails.findOne({where: {prodductId: request.params.id}}).then((order) => {
    if(order) {
      response.status(203).send("Order exists against this product");
    } else {
      Product.update({isDeleted:true},{where :{id: request.params.id}})
          .then((product) => response.status(200).send(product))  // Send back the updated todo.
          .catch((error) => { console.log("Error",error);
            response.status(400).send(error)});
    }
  })
};

exports.mostSold = async (request, response) => {

    const products = await db.products.findAll({
        // order: [
        //     ['dataValues.soldCount', 'DESC']
        // ],

        include: [
            {
                model: db.ordersdetail
            }]

        //         // [sequelize.fn('count', sequelize.col('productId ')), 'productId' ]
    });
    for (let i = 0; i < products.length; i++) {
        products[i].dataValues.soldCount = products[i]?.dataValues?.ordersdetails?.length;
    }
   let prodSort= products.sort(function(a,b){
        return b.dataValues.soldCount - a.dataValues.soldCount
    })
    let sortedProd=prodSort.slice(0,6)
    response.status(200).send(sortedProd)
}
    // console.log(p)
    // for (let i = 0; i <3; i++) {
    // console.log(p[i])
    // }
        // console.log(products[i].dataValues.ordersdetails.soldCount)
    // for(products.length < 6) {
    //     console.log(products)
    //
    // };

        // console.log(products.dataValues.soldCount)
//     response.status(200).send(products)
// }
//  while( products.length<3){


// exports.mostSold = async (request, response) =>{
//     const products = await db.products.findAll({
//     attributes: {include:[[sequelize.fn('count', sequelize.col('productId ')), 'productId' ]]}
// }).then(product => {
//             if (!product) {
//                 return products => response.status(200).send(products);
//                 }
//             }).catch(error => {
//         // console.log(error);
//         response.status(400).send(error)
//       })
// }
// const mostSold = orderDetail.findAll({
//   attributes: [[sequelize.fn('max', sequelize.col('productId ')), 'productId ]]
// }).getProduct();
// exports.getItemSaleCount = () => product.findAll({
//   attributes: ['itemId', [sequelize.fn('count', sequelize.col('itemId')), 'count']],
//   group : ['SaleItem.itemId'],
//   raw: true,
//   order: sequelize.literal('count DESC')
// });

