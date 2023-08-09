 'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      sellingPrice: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      },
      freeVersion: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      // newly added
      code: {
        type: Sequelize.INTEGER
      },

      businessId: {
        type: Sequelize.INTEGER
      },
      actualPrice: {
        type: Sequelize.STRING
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      active: {
        type: Sequelize.BOOLEAN
      },

      categoryId: {
        type: Sequelize.INTEGER
      },

      imageLargeUrl: {
        type: Sequelize.STRING
      },
      imageThumbnainlUrl: {
        type: Sequelize.STRING
      },
      orderCount: {
        type: Sequelize.INTEGER
      },
      viewCount: {
        type: Sequelize.INTEGER
      },


    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
