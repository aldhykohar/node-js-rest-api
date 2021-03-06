const Sequelize = require('sequelize')
const db = require('../database/connection')

var data = db.define('akses_token', {
    id_akses_token: Sequelize.INTEGER,
    id_user: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    access_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ip_address: {
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

data.removeAttribute('id')
module.exports = data