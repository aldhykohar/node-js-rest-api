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


// controller untuk login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    var table = ["user", "password", md5(post.password), "email", post.email]

    query = mysql.format(query, table)
    connection.query(query, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                })

                console.log(rows);
                id_user = rows[0].id_user;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?"
                var table = ["akses_token", data]


                query = mysql.format(query, table)

                var datas = {
                    iduser: data.id_user,
                    token: token
                }

                console.log(datas);

                connection.query(query, function (err, rows) {
                    if (err) {
                        console.log(err)
                    } else {
                        response.ResponseSuccess(200, "Token JWT tergenerate", datas, res)
                    }
                })
            } else {
                response.ResponseFailed(400, "Email atau password salah!", {}, res)
            }
        }
    })
}