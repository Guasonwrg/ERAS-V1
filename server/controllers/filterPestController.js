const FilterPest = require('../models/filterPestModels');

// Controlador para obtener todos los registros de filter_pest
const getAllFilterPests = async (req, res) => {
  try {
    const filterPests = await FilterPest.findAll();
    res.json(filterPests); 
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

module.exports = {
    getAllFilterPests
  };