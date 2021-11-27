var express = require('express');
var auth = require('./auth');
const verification = require('./verification');
var router = express.Router();

router.post('/auth/register', auth.registrasi);
router.post('/auth/login', auth.login);

//alamat yg perlu otorisasi
router.get('/auth/secret', verification(), auth.secretPage);

module.exports = router