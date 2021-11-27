const jwt = require('jsonwebtoken')
const config = require('../config/secret')
var response = require('../res')

function verification() {
    return function (req, rest, next) {
        var roles = req.body.role;
        // cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];

            //verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return response.ResponseFailed(401, "Token tidak valid", {}, rest)
                } else {
                    if (roles == 2) {
                        req.auth = decoded.data[0]
                        next()
                    } else {
                        return response.ResponseFailed(401, "Gagal mengotorisasi role anda!", {}, rest)
                    }
                }
            })
        } else {
            return response.ResponseFailed(401, "Token tidak tersedia", {}, rest)
        }
    }
}

module.exports = verification;