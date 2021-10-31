'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function (req, res) {
    response.success("Aplication REST API start!", res)
};

//show data mahasiswa
exports.showAllStudent = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
        if (err) {
            connection.log(err)
        } else {
            response.success(rows, res)
        }
    });
};