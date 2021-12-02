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

var conn = new Sequelize('heroku_5ef4fa895ada344', 'ba5bc5a95382dd', '887629c4', {
    dialect: 'mysql',
    host: 'us-cdbr-east-04.cleardb.com'
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