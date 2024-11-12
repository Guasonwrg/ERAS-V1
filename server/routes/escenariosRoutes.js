const express = require('express');
const escenariosController = require('../controllers/escenariosController');
const router = express.Router();


router.get('/', escenariosController.getEscenarios);

module.exports = router;
