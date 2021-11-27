var connection = require('../config/database/connection')
var mysql = require('mysql')
var md5 = require('MD5')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')
const model = require('../config/model/index')
const { Op } = require('sequelize');


// controller register
exports.registrasi = async function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tgl_regis: new Date()
    }


    try {
        let checkUser = await model.user.findAll({
            where: {
                email: post.email
            }
        })
        if (checkUser.length > 0) {
            response.ResponseFailed(200, "Email sudah terdaftar !", {}, res);
        } else {
            await model.user.create({
                username: post.username,
                email: post.email,
                password: post.password,
                role: post.role,
                tgl_regis: post.tgl_regis
            })
            response.ResponseSuccess(201, "Berhasil menambahkan data", {}, res);
        }
    } catch (err) {
        response.ResponseFailed(400, "Gagal", err.message, res)
    }

}


// controller untuk login
exports.login = async function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    try {
        let checkUser = await model.user.findAll({
            where: {
                [Op.and]: [
                    { email: post.email },
                    { password: md5(post.password) }
                ]
            }
        })
        if (checkUser.length > 0) {
            var token = jwt.sign({ checkUser }, config.secret, {
                expiresIn: 1440
            })

            id_user = checkUser[0].id_user;

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

            connection.query(query, function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    response.ResponseSuccess(200, "Token JWT tergenerate", datas, res)
                }
            })
        } else {
            response.ResponseFailed(200, "Email atau password salah!", {}, res)
        }

    } catch (error) {
        response.ResponseFailed(400, "Gagal", err.message, res)
    }

    // var query = "SELECT * FROM ?? WHERE ??=? AND ??=?"
    // var table = ["user", "password", md5(post.password), "email", post.email]

    // query = mysql.format(query, table)
    // connection.query(query, function (err, rows) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (rows.length == 1) {
    //             var token = jwt.sign({ rows }, config.secret, {
    //                 expiresIn: 1440
    //             })

    //             id_user = rows[0].id_user;

    //             var data = {
    //                 id_user: id_user,
    //                 access_token: token,
    //                 ip_address: ip.address()
    //             }

    //             var query = "INSERT INTO ?? SET ?"
    //             var table = ["akses_token", data]


    //             query = mysql.format(query, table)

    //             var datas = {
    //                 iduser: data.id_user,
    //                 token: token
    //             }

    //             connection.query(query, function (err, rows) {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     response.ResponseSuccess(200, "Token JWT tergenerate", datas, res)
    //                 }
    //             })
    //         } else {
    //             response.ResponseFailed(400, "Email atau password salah!", {}, res)
    //         }
    //     }
    // })
}

exports.secretPage = function (req, res) {
    response.ResponseSuccess(200, "Halaman ini hanya untuk user role = 2", {}, res)
}