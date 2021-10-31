'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function (req, res) {
    response.success("Aplication REST API start!", res)
};

//show all data mahasiswa
exports.showAllStudent = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, fields) {
        if (err) {
            connection.log(err)
        } else {
            response.success(rows, res)
        }
    });
};

// show all data mahasiswa by id
exports.showStudentById = function (req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa where id_mahasiswa = ?", [id], function (err, rows, fields) {
        if (err) {
            connection.log(err)
        } else {
            response.success(rows, res)
        }
    })
}