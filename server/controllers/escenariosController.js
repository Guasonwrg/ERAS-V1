const Escenario = require('../models/escenariosModels');

// Controlador para obtener la lista de todos los escenarios
const getEscenarios = async (req, res) => {
    //console.log("Ruta '/api/escenarios' alcanzada");
  try {
    const escenarios = await Escenario.findAll();
    res.json(escenarios);
  } catch (error) {
    console.error('Error al obtener los escenarios:', error);
    res.status(500).json({ message: 'Error al obtener los escenarios' });
  }
};

module.exports = {
  getEscenarios,
};
