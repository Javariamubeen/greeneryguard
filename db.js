const Pool=require('pg').Pool;
require('dotenv').config();

const pool=new Pool({

    user:"ellxmpst",
    password:"e6_SMQ6Ykain0R2W9n38s4ikwsYlD-4H",
    database:"ellxmpst",
    // host:"localhost:27017",
    host:"drona.db.elephantsql.com",
    port:5432
});
module.exports =pool;
