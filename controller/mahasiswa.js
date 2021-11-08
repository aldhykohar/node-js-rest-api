const { Op } = require('sequelize');
const model = require('../config/model/index')
const response = require('../res');
const controller = {}

controller.getAll = async function (req, res) {
    try {
        await model.mahasiswa.findAll({
            attributes: [['nim', 'nim_mhs'], ['nama', 'nama_mhs'], ['jurusan', 'jurusan_mhs']],
            where: {
                [Op.or]: [
                    { nama: 'Aldi Arif Setiawan' },
                    { jurusan: 'Teknik Informatika' }
                ]
            },
            order: [['nama', 'asc']],
            limit: 3
        })
            .then((result) => {
                if (result.length > 0) {
                    response.ResponseSuccess(200, "Berhasil", result, res)
                } else {
                    response.ResponseSuccess(200, "Data Tidak Ditemukan", [], res)
                }
            })
    } catch (err) {
        response.ResponseFailed(400, "Gagal", err.message, res)
    }
}

controller.getSearch = async function (req, res) {
    const search = req.body.keyword
    try {
        await model.mahasiswa.findAll({
            attributes: [['nim', 'nim_mhs'], ['nama', 'nama_mhs'], ['jurusan', 'jurusan_mhs']],
            where: {
                [Op.or]: [{
                    nama: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    jurusan: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            }
        })
            .then((result) => {
                if (result.length > 0) {
                    response.ResponseSuccess(200, "Berhasil", result, res)
                } else {
                    response.ResponseSuccess(200, "Data Tidak Ditemukan", [], res)
                }
            })
    } catch (err) {
        response.ResponseFailed(400, "Gagal", err.message, res)
    }
}

controller.getByID = async (req, res) => {
    try {
        let result = await model.mahasiswa.findAll({
            where: {
                id_mahasiswa: req.body.id_mhs
            }
        })

        if (result.length > 0) {
            response.ResponseSuccess(200, "Berhasil", result, res)
        } else {
            response.ResponseSuccess(200, "Data Tidak Ditemukan", [], res)
        }
    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}

controller.createMahasiswa = async (req, res) => {
    try {
        await model.mahasiswa.create({
            nim: req.body.nim,
            nama: req.body.nama,
            jurusan: req.body.jurusan,
        })
        response.ResponseSuccess(201, "Data berhasil ditambahkan", {}, res)
    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}

controller.editMahasiswa = async (req, res) => {
    try {
        await model.mahasiswa.update({
            nim: req.body.nim,
            nama: req.body.nama,
            jurusan: req.body.jurusan,
        }, {
            where: {
                id_mahasiswa: req.body.id_mhs
            }
        })
        response.ResponseSuccess(200, "Data berhasil diubah", {}, res)
    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}

controller.deleteMahasiswa = async (req, res) => {
    try {
        let result = await model.mahasiswa.destroy({
            where: {
                id_mahasiswa: req.body.id_mhs
            }
        })
        if (result) {
            response.ResponseSuccess(200, "Data berhasil dihapus", result, res)
        } else {
            response.ResponseFailed(400, "Data tidak ditemukan", {}, res)
        }
    } catch (error) {
        response.ResponseFailed(400, "Gagal", error.message, res)
    }
}

module.exports = controller