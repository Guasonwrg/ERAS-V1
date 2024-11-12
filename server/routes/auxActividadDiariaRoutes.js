const express = require('express');
const auxActividadDiaria = require('../controllers/auxActividadDiariaController');
const router = express.Router();


router.get('/', auxActividadDiaria.getActividadByCodigoUnificado);

module.exports = router;