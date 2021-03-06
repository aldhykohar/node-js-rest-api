'use strict';

var response = require('./res');
var connection = require('./config/database/connection');
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

    if (!id || !nama || !nim || !jurusan) {
        console.log(nama)
        response.ResponseFailed(400, "Data tidak sesuai request", {}, res)
        return
    }

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

    if (!id || !nama || !nim || !jurusan) {
        console.log(nama)
        response.ResponseFailed(400, "Data tidak sesuai request", {}, res)
        return
    }

    var query = 'UPDATE mahasiswa SET nim=?, nama=?,jurusan=? WHERE id_mahasiswa=?'
    var value = [nim, nama, jurusan, id]
    models.insertRowQuery(query, value)
        .then(response.ResponseSuccess(200, "Data Berhasil DiUpdate", {}, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}

// deleta data mahasiswa by id
exports.deletaStudent = function (req, res) {
    var id = req.body.id_mhs;

    if (!id) {
        response.ResponseFailed(400, "Data tidak sesuai request", {}, res)
        return
    }

    var query = 'DELETE FROM mahasiswa WHERE id_mahasiswa=?'
    var value = [id]
    models.insertRowQuery(query, value)
        .then(response.ResponseSuccess(200, "Data Berhasil Di Hapus", {}, res))
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}

// show matakuliah group
exports.showGroupMataKuliah = function (req, res) {
    var query = 'SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa'
    models.getRowQuery(query)
        .then(data => {
            console.log("Success")
            response.OkNested(data, res)
        })
        .catch(err => response.ResponseFailed(400, "Gagal", err, res))
}