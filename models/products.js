'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ordersdetail, {
        foreignKey: "prodductId"
      })
      this.belongsTo(models.users, {
        foreignKey: "businessId"
      });
    }
  };

//   static associate(models) {
//     this.belongsTo(models.order, {
//       foreignKey: "orderId"
//     })
//     this.belongsTo(models.products, {
//       foreignKey: "prodductId"
//     })
//   }
// };

  products.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    sellingPrice: DataTypes.INTEGER,
    description: DataTypes.STRING,
    summary: DataTypes.STRING,
    freeVersion: {type:DataTypes.BOOLEAN,defaultValue: false},
    isDeleted: {type:DataTypes.BOOLEAN,defaultValue: false},

    // newly added
    code: DataTypes.STRING,

    businessId: DataTypes.STRING,
    actualPrice: DataTypes.NUMBER,
    featured: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,

    categoryId: DataTypes.STRING,

    imageLargeUrl: DataTypes.STRING,
    imageThumbnainlUrl: DataTypes.STRING,
    orderCount: DataTypes.NUMBER,
    viewCount: DataTypes.NUMBER,
    // end newly added

  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
