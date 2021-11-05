var connection = require('../connection')
var mysql = require('mysql')
var md5 = require('MD5')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')


// controller register
exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tgl_regis: new Date()
    }
    var query = 'SELECT email from ?? WHERE ?? = ?';
    var table = ["user", "email", post.email];
    query = mysql.format(query, table);

    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user", post];
                query = mysql.format(query, table);
                connection.query(query, post, function (err, rows) {
                    if (err) {
                        console.log(err)
                    } else {
                        response.ResponseSuccess(201, "Berhasil menambahkan data", {}, res);
                    }
                })
            } else {
                response.ResponseSuccess(200, "Email sudah terdaftar !", {}, res);
            }
        }
    })
}