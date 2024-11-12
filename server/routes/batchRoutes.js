const express = require('express');
const router = express.Router();
const {main} = require('../batch/automatizaPesticidas'); 

router.post('/ejecutar-batch', async (req, res) => {
  try {
    await main();
    res.status(200).json({ message: 'Proceso batch ejecutado correctamente.' });
  } catch (error) {
    console.error('Error al ejecutar el batch:', error);
    res.status(500).json({ message: 'Error al ejecutar el batch.' });
  }
});

module.exports = router;
