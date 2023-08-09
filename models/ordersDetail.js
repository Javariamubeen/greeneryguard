'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ordersDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order, {
        foreignKey: "orderId"
      })
      this.belongsTo(models.products, {
        foreignKey: "prodductId"
      })
    }
  };
  ordersDetail.init({
    title: DataTypes.STRING,
    orderId:  DataTypes.INTEGER,
    prodductId:  DataTypes.INTEGER,
    sellerId:  DataTypes.INTEGER,
    orderNumber: DataTypes.STRING,
    price:  DataTypes.INTEGER,
    quantity:  DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    total:  DataTypes.INTEGER,
    isDeleted:{type:DataTypes.BOOLEAN,defaultValue: false}
  }, {
    sequelize,
    modelName: 'ordersdetail',
  });
  return ordersDetail;
};
