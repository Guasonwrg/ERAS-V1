const express = require('express');
const informeOcupacionalController = require('../controllers/informeOcupacionalController');
const router = express.Router();


router.post('/guardar', informeOcupacionalController.guardarInforme);
router.get('/', informeOcupacionalController.obtenerInformes); 
router.get('/:id', informeOcupacionalController.obtenerInformePorId); 
router.put('/editar-ocupacional/:id', informeOcupacionalController.editarInforme); 
router.delete('/:id', informeOcupacionalController.eliminarInforme); 

module.exports = router;
