'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'admin@greenery.com',
        password_hash: 'Admin123@',
        primary_role: 'admin',
        username: 'admin',
        first_name: 'Admin',
        last_name: '',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'buyer1@gmail.com',
        password_hash: 'Test1234',
        primary_role: 'buyer',
        username: 'Buyer',
        first_name: 'Buyer',
        last_name: '',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'seller1@gmail.com',
        password_hash: 'Test1234',
        primary_role: 'seller',
        username: 'Seller',
        first_name: 'Seller',
        last_name: '',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
