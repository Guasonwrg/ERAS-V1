const express = require('express');
const router = express.Router();
const gradoProteccionController = require('../controllers/gradoProteccionController');


router.get('/', gradoProteccionController.getAllGradoProteccion);

module.exports = router;