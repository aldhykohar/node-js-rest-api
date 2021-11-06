var express = require('express');
var auth = require('./auth');
const verification = require('./verification');
var router = express.Router();

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yg perlu otorisasi
router.get('/api/v1/secret', verification(), auth.secretPage);

module.exports = router