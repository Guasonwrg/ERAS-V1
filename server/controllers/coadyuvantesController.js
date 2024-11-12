const MgapCoad = require('../models/coadyuvantesModels');


// Controlador para obtener todos los registros de mgap_pest
const getMgapCoadList = async (req, res) => {
  try {
    const mgapCoadData = await MgapCoad.findAll();
    res.json(mgapCoadData);
  } catch (error) {
    console.error('Error al obtener los registros de mgap_coad:', error);
    res.status(500).json({ message: 'Error al obtener los registros de mgap_coad' });
  }
};


module.exports = {
  getMgapCoadList,
};

