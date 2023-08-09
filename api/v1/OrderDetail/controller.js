const OrderDetail = require('../../../models').ordersDetail;
const Product = require('../../../models').products;

exports.list = async (request, response) => {

    const sellerId = request.params.sellerId;
    const orderId = request.params.id;
    let whereClause = {orderId: orderId};
    if (sellerId) {
        whereClause.sellerId = sellerId;
    }
    OrderDetail.findAll({
        where:whereClause, include: [Product]
    }).then(data => response.status(200).send(data))
        .catch(error => {
            console.log(error);
            response.status(400).send(error)
        })
}

// exports.getItemSaleCount = () => product.findAll({
//   attributes: ['itemId', [sequelize.fn('count', sequelize.col('itemId')), 'count']],
//   group : ['SaleItem.itemId'],
//   raw: true,
//   order: sequelize.literal('count DESC')
// });