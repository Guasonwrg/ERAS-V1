const RefCodigosForm = require('../models/refCodigosFormModels');

// Controlador para obtener todos los registros de Ref_Codigos_Form
const getAllRefCodigosForm = async (req, res) => {
  try {
    const refCodigos = await RefCodigosForm.findAll(); 
    res.json(refCodigos); 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
};

module.exports = {
  getAllRefCodigosForm
};
