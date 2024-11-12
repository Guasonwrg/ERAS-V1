const express = require('express');
const coadyuvantesController = require('../controllers/coadyuvantesController');
const router = express.Router();


router.get('/', coadyuvantesController.getMgapCoadList);

module.exports = router;