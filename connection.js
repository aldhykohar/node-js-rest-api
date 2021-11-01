var mysql = require('mysql');


//create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_api'
});

conn.connect((err) => {
    if (err != null) {
        console.log(err.message)
        return
    }
});

module.exports = conn;