var connection = require('./config/database/connection');

exports.getRowQuery = function (query) {
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err.message)
                reject(err.message);
                return
            }

            resolve(data);
        });
    });
}

exports.insertRowQuery = function (query, value) {
    return new Promise(function (resolve, reject) {
        connection.query(query, value, function (err, data) {
            if (err) {
                console.log(err.message)
                reject(err.message);
                return
            }

            resolve(data);
        });
    });

}