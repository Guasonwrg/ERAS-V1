const express = require('express');
const router = express.Router();
const  tasasDilucionController = require('../controllers/tasasDilucionController');


router.get('/', tasasDilucionController.getAllTasas);

module.exports = router;
