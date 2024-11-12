const TasasDilucion = require('../models/tasasDilucionModels');

//Controlador para obtener tasas de dilución
const getAllTasas = async (req, res) => {
  try {
    const tasas = await TasasDilucion.findAll();
    res.json(tasas);
  } catch (error) {
    console.error('Error al obtener las tasas de dilución:', error);
    res.status(500).json({ message: 'Error al obtener las tasas de dilución' });
  }
};

module.exports = {
  getAllTasas
};
