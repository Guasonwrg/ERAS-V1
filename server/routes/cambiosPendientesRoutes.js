const express = require('express');
const router = express.Router();
const cambiosPendientesControllers = require('../controllers/cambiosPendientesController');

router.get('/', cambiosPendientesControllers.obtenerCambiosPendientes);
router.post('/confirmar-agregados-masivo', cambiosPendientesControllers.confirmarAgregados);
router.put('/confirmar-modificados-masivo', cambiosPendientesControllers.confirmarModificados);
router.post('/confirmar-agregado', cambiosPendientesControllers.confirmarAgregadoIndividual);
router.put('/confirmar-modificado', cambiosPendientesControllers.confirmarModificadoIndividual);
router.delete('/confirmar-eliminado', cambiosPendientesControllers.confirmarEliminadoIndividual);

module.exports = router;
