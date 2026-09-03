const express = require('express');
const router = express.Router();

const { cadastrar } = require('../controllers/clienteController');

router.post('/clientes', cadastrar);

module.exports = router;