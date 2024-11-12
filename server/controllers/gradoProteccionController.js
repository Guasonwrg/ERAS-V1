const GradoProteccion = require('../models/gradoProteccion');

//Controlador para obtener los datos de grado proteccion
const getAllGradoProteccion = async (req, res) => {
    try {
      const gradoProteccion = await GradoProteccion.findAll();
      res.json(gradoProteccion); 
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  };
  
  module.exports = {
    getAllGradoProteccion
    };