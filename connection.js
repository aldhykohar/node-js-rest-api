var mysql = require('mysql');


//create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api'
});

conn.connect((err) => {
    // if (err) throw err;
    console.log('Mysql connected');
});

module.exports = conn;