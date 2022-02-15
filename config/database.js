const database = require('mysql2');

module.exports=database.createConnection({
    host:"localhost",
    user:"root",
    password:"rishav28entersdb",
    database:"movie"
});