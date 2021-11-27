const access_token = require('./access_token')
const mahasiswa = require('./mahasiswa')
const user = require('./user')
const model = {}

model.mahasiswa = mahasiswa
model.user = user
model.access_token = access_token
module.exports = model