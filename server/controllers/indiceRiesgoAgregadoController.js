const RiesgoAgregado = require('../models/indiceRiesgoAgregado');

//Controlador para obtener los datos de riesgo agregado
const getAllRiesgoAgregado = async (req, res) => {
    try {
      const riesgoAgregado = await RiesgoAgregado.findAll();
      res.json(riesgoAgregado); 
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  };
  
  module.exports = {
    getAllRiesgoAgregado
    };