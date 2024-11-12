const AuxActividadDiaria = require('../models/auxActividadDiaria');


const getActividadByCodigoUnificado = async (req, res) => {
    const { codigoUnificado } = req.query; 
  
    if (!codigoUnificado) {
      return res.status(400).json({ error: 'El código unificado es requerido' });
    }
  
    try {
      // Consulta en la tabla aux_actividad_diaria usando el código unificado
      const actividad = await AuxActividadDiaria.findOne({
        where: { Codigo_Unificado: codigoUnificado },
      });
  
      if (!actividad) {
        return res.status(404).json({ message: 'Actividad diaria no encontrada' });
      }
  
      res.json(actividad);
    } catch (error) {
      console.error('Error al obtener la actividad diaria:', error);
      res.status(500).json({ message: 'Error al obtener la actividad diaria' });
    }
  };

module.exports = { getActividadByCodigoUnificado };
