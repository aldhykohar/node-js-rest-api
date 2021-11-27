const jwt = require('jsonwebtoken')
var md5 = require('MD5')
var response = require('../res')
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
        tgl_regis: new Date()
    }


    try {
        let data = await model.user.findAll({
            where: {
                email: post.email
            }
        })
        if (data.length > 0) {
            response.ResponseFailed(400, "Email sudah terdaftar !", {}, res);
        } else {
            await model.user.create({
                username: post.username,
                email: post.email,
                password: post.password,
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
        let data = await model.user.findAll({
            where: {
                [Op.and]: [
                    { email: post.email },
                    { password: md5(post.password) }
                ]
            }
        })
        if (data.length > 0) {
            var token = jwt.sign({ data }, config.secret, {
                expiresIn: 1440
            })
            id_user = data[0].id_user;

            await model.access_token.create({
                id_user: id_user,
                access_token: token,
                ip_address: ip.address()
            })

            var datas = {
                iduser: id_user,
                token: token
            }
            response.ResponseSuccess(200, "Token JWT tergenerate", datas, res)
        } else {
            response.ResponseFailed(400, "Email atau password salah!", {}, res)
        }

    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}

exports.secretPage = async function (req, res) {
    var dataToken = req.auth;

    try {
        let data = await model.user.findAll({
            attributes: ['username', 'email', 'tgl_regis'],
            where: {
                [Op.and]: [
                    { id_user: dataToken.id_user },
                ]
            }
        })
        response.ResponseSuccess(200, "Success", data[0], res)
    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}