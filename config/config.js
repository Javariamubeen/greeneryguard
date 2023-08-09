require('dotenv').config();

module.exports = {
    development: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        port: process.env.port,
        STRIPE_PRIVATE_TEST_KEY:process.env.STRIPE_PRIVATE_TEST_KEY,
        dialect: 'postgres',
    },
    test: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        port: process.env.port,
        STRIPE_PRIVATE_TEST_KEY:process.env. STRIPE_PRIVATE_TEST_KEY,
        dialect: 'postgres',
    },
    production: {
        username: process.env.username,
        password: process.env.password,
        database: process.env.database,
        host: process.env.host,
        port: process.env.port,
        STRIPE_PRIVATE_TEST_KEY:process.env. STRIPE_PRIVATE_TEST_KEY,
        dialect: 'postgres',
    }
};