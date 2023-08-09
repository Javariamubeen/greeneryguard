'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ordersdetail, {
        foreignKey: "orderId"
      })
      this.belongsTo(models.users, {
        foreignKey: "customerId"
      })
    }
  };
  order.init({
    customerId:{type:DataTypes.INTEGER,},
      orderNumber: {
        type: DataTypes.STRING
      },
    price: {type:DataTypes.INTEGER,},
    salesTax: {type:DataTypes.INTEGER,},
    shippingPrice: {type:DataTypes.INTEGER,},
    total: {type:DataTypes.INTEGER,},
    totalProducts: {type:DataTypes.INTEGER},
    orderDate: {type:DataTypes.DATE},
    shipeDate: {type:DataTypes.DATE},
    requireDate: {type:DataTypes.DATE},
    status: {
      type: DataTypes.STRING
    },
    isDeleted:{type:DataTypes.BOOLEAN,defaultValue: false},
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};
