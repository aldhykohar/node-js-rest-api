var mysql = require('mysql');
var Sequelize = require('sequelize');


// create connection
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nodejs_api'
// });

// conn.connect((err) => {
//     if (err != null) {
//         console.log(err.message)
//         return
//     }
// });

var conn = new Sequelize('nodejs_api', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})


var testConnection = async () => {
    try {
        await conn.authenticate();
        console.log('Connection has been established successfully!');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

testConnection()

module.exports = conn;