const express = require('express');
const router = express.Router();
const riesgoAgregadoController = require('../controllers/indiceRiesgoAgregadoController');


router.get('/', riesgoAgregadoController.getAllRiesgoAgregado);

module.exports = router;