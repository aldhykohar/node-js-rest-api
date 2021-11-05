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

exports.OkNested = function (values, res) {

    var arrays = []
    let currentValue
    for (let i = 0; i < values.length; i++) {
        const element = values[i];
        element.matakuliah = [element.matakuliah]
        if (currentValue) {
            console.log(`${currentValue.nama} ${i}`);
            if (currentValue.id_mahasiswa == values[i].id_mahasiswa) {
                currentValue.matakuliah.push(values[i].matakuliah[0])
            } else {
                arrays.push(currentValue)
                if (i == values.length - 1) {
                    arrays.push(element)
                }
                currentValue = element
            }
        } else {
            currentValue = element
        }
    }

    var data = {
        'status': true,
        'message': "Berhasil",
        'error': "",
        'data': arrays
    }

    res.status(200).json(data).end();
}