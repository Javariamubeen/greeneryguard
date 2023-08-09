'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
        lastName: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        appartment: {
          type: Sequelize.STRING
        },
        country: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        zipCode: {
          type: Sequelize.STRING
        },
        shippingMethod: {
          type: Sequelize.STRING
        },
    customer: {
      type: Sequelize.STRING
    },
    userId: {type:Sequelize.INTEGER},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shippings');
  }
};