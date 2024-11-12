const HICancer = require('../models/HIcancerModels');

//Controlador para obtener los datos de HI cancer
const getAllHICancer = async (req, res) => {
    try {
      const hiCancer = await HICancer.findAll();
      res.json(hiCancer); 
    } catch (error) {
      console.error('Error al obtener los registros de HI Cancer:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
    }
  };
  
  module.exports = {
    getAllHICancer
    };