'use strict';

exports.ResponseSuccess = function (status, message, values, res) {
    var data = {
        'status': true,
        'message': message,
        'error': "",
        'data': values
    }

    res.status(status).json(data).end();
}

exports.ResponseFailed = function (status, message, errors, res) {
    var data = {
        'status': false,
        'message': message,
        'error': errors,
        'data': {}
    }

    res.status(status).json(data).end();
}