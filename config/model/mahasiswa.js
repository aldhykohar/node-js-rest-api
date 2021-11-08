const Sequelize = require('sequelize')
const db = require('../database/connection')

var mahasiswa = db.define('mahasiswa', {
    id_mahasiswa: Sequelize.INTEGER,
    nim: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nama: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jurusan: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true,
    timestamps: false
})

mahasiswa.removeAttribute('id')
module.exports = mahasiswa