'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId:{type:Sequelize.INTEGER},
      orderNumber: {
        type: Sequelize.STRING
      },
    price: {type:Sequelize.INTEGER},
    salesTax: {type:Sequelize.INTEGER},
    shippingPrice: {type:Sequelize.INTEGER},
    total: {type:Sequelize.INTEGER},
    totalProducts: {type:Sequelize.INTEGER},
    status: {
      type: Sequelize.STRING
    },
    orderDate: { allowNull: false,
      type: Sequelize.DATE },
    shipeDate: { allowNull: false,
      type: Sequelize.DATE },
    requireDate: { allowNull: false,
      type: Sequelize.DATE },
    isDeleted:{type: Sequelize.BOOLEAN,
      defaultValue: false},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};