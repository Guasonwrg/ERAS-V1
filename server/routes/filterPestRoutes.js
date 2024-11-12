const express = require('express');
const router = express.Router();
const  filterPestController = require('../controllers/filterPestController');


router.get('/', filterPestController.getAllFilterPests);

module.exports = router;
