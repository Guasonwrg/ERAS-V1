const express = require('express');
const router = express.Router();
const hiCancerController = require('../controllers/hiCancerController');

router.get('/', hiCancerController.getAllHICancer);

module.exports = router;