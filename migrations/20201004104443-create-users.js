'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      business_name: {
        type: Sequelize.STRING
      },
      business_address: {
        type: Sequelize.STRING
      },
      abn: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      normalised_username: {
        type: Sequelize.STRING
      },
      normalised_email: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      security_stamp: {
        type: Sequelize.STRING
      },
      concurrency_stamp: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      phone_number_confirmed: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      two_factor_enabled: {
        type: Sequelize.BOOLEAN
      },
      lockoutend: {
        type: Sequelize.BOOLEAN
      },
      lockoutend_enabled: {
        type: Sequelize.BOOLEAN
      },
      access_fail_count: {
        type: Sequelize.INTEGER
      },
      primary_role: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      isDeleted: { type: Sequelize.BOOLEAN, default: false },
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
    await queryInterface.dropTable('users');
  }
};
