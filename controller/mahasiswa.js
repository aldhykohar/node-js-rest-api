const model = require('../config/model/index')
const response = require('../res');
const controller = {}

controller.getAll = async function (req, res) {
    try {
        await model.mahasiswa.findAll()
            .then((result) => {
                if (result.length > 0) {
                    response.ResponseSuccess(200, "Berhasil", result, res)
                } else {
                    response.ResponseSuccess(200, "Data Tidak Ditemukan", [], res)
                }
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports = controller