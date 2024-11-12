const express = require('express');
const pesticidasController = require('../controllers/pesticidasController');
const router = express.Router();


router.get('/', pesticidasController.getMgapPestList);
router.get('/cas', pesticidasController.getCasByIngredienteActivo);
router.get('/codigo-fechas', pesticidasController.getCodigoFechasByIngredienteActivo);
router.post('/agregar-pesticida', pesticidasController.agregarPesticida);
router.get('/pesticida/:id', pesticidasController.getPestById);
router.put('/pesticida/editar/:id', pesticidasController.updatePest);
router.delete('/:id', pesticidasController.deletePest);


module.exports = router;
