'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  shipping.init({
    email: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
      lastName: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      appartment: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      zipCode: {
        type: DataTypes.STRING
      },
      shippingMethod: {
        type: DataTypes.STRING
      },
  customer: {
    type: DataTypes.STRING
  },
  userId: {type:DataTypes.INTEGER},
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'shipping',
  });
  return shipping;
};