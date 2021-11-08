const Sequelize = require('sequelize')
const db = require('../database/connection')

var mahasiswa = db.define('mahasiswa', {
    id_mahasiswa: Sequelize.INTEGER,
    nim: {
        type: Sequelize.DataTypes.STRING,
        notEmpty: true,
        notNull: true
    },
    nama: Sequelize.STRING,
    jurusan: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
})

mahasiswa.removeAttribute('id')
module.exports = mahasiswa