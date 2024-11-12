const express = require('express');
const router = express.Router();
const refCodigosFormController = require('../controllers/refCodigosFormController');


router.get('/', refCodigosFormController.getAllRefCodigosForm);

module.exports = router;
