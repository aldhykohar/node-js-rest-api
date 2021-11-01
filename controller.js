'use strict';

var response = require('./res');
var connection = require('./connection');
var models = require('./models');
const { query } = require('express');

exports.index = function (req, res) {
    response.ResponseSuccess(200, "Aplication REST API start!", {}, res)
};

//show all data mahasiswa
exports.showAllStudent = function (req, res) {
    models.getRowQuery("SELECT * FROM mahasiswa")
        .then(data => response.ResponseSuccess(200, "Berhasil", data, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
};

// show all data mahasiswa by id
exports.showStudentById = function (req, res) {
    let id = req.body.id;
    const query = `SELECT * FROM mahasiswa where id_mahasiswa = ${id}`;
    models.getRowQuery(query)
        .then(data => response.ResponseSuccess(200, "Berhasil", data, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}

//add data mahasiswa
exports.addStudent = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    var query = 'INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)'
    var value = [nim, nama, jurusan]
    models.insertRowQuery(query, value)
        .then(response.ResponseSuccess(200, "Data Berhasil Disimpan", {}, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}

// change data mahasiswa by id
exports.editStudent = function (req, res) {
    var id = req.body.id_mhs;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    if (id == null) {
        response.ResponseFailed(400, "Data tidak sesuai request", "id_mhs bernilai null", res)
        return
    }

    var query = 'UPDATE mahasiswa SET nim=?, nama=?,jurusan=? WHERE id_mahasiswa=?'
    var value = [nim, nama, jurusan, id]
    models.insertRowQuery(query, value)
        .then(response.ResponseSuccess(200, "Data Berhasil DiUpdate", {}, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}