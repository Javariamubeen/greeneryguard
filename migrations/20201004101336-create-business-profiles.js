'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('businessProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      userId: {
        type: Sequelize.STRING
      },

      name: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('businessProfiles');
  }
};
