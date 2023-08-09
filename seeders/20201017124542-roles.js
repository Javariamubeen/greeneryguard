'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'admin',
                permissions: 'products,users,shop,orders,orderdetails,categories,list_enquiries',
                isDeleteable: false,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'buyer',
                permissions: 'shop,add_enquiry,orders,orderdetails',
                isDeleteable: false,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'seller',
                permissions: 'products,shop,orders,orderdetails',
                isDeleteable: false,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
}
