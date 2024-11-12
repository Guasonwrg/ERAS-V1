const MgapPest = require('../models/pesticidasModels');
const FqToxPest = require('../models/fqToxPestModels'); 

// Controlador para obtener todos los registros de mgap_pest
const getMgapPestList = async (req, res) => {
  try {
    const mgapPestData = await MgapPest.findAll();
    res.json(mgapPestData);
  } catch (error) {
    console.error('Error al obtener los registros de mgap_pest:', error);
    res.status(500).json({ message: 'Error al obtener los registros de mgap_pest' });
  }
};

//Controlador para  obetenr el N CAS por el principio activo del pesticida
const getCasByIngredienteActivo = async (req, res) => {
  const { ingrediente } = req.query;
  if (!ingrediente) {
    return res.status(400).json({ error: 'El ingrediente activo es requerido' });
  }

  try {
    const result = await FqToxPest.findOne({
      where: { ingrediente_activo: ingrediente },
      attributes: ['CAS_NR']
    });

    if (!result) {
      return res.status(404).json({ message: 'N° CAS no encontrado' });
    }

    res.json({ CAS: result.CAS_NR });
  } catch (error) {
    console.error('Error al obtener el N° CAS:', error);
    res.status(500).json({ message: 'Error al obtener el N° CAS' });
  }
};
//Controlador para  obetenr el codigo-fechas por el principio activo del pesticida
const getCodigoFechasByIngredienteActivo = async (req, res) => {
  const { ingrediente } = req.query;
  if (!ingrediente) {
    return res.status(400).json({ error: 'El ingrediente activo es requerido' });
  }

  try {
    const result = await FqToxPest.findOne({
      where: { ingrediente_activo: ingrediente },
      attributes: ['Codigo_fechas']
    });

    if (!result) {
      return res.status(404).json({ message: 'Codigo_fechas  no encontrado' });
    }

    res.json({ codigo_fecha: result.Codigo_fechas });
  } catch (error) {
    console.error('Error al obtener el Codigo_fechas :', error);
    res.status(500).json({ message: 'Error al obtener el Codigo_fechas ' });
  }
};

//Agregar pesticida
const agregarPesticida = async (req, res) => {
  try {
    const registro = req.body;
    console.log('Registro recibido:', registro);

    // Verificar si el registro ya existe en la base de datos
    const existe = await MgapPest.findOne({ where: { Registro: registro.Registro } });
    if (existe) {
      return res.status(409).json({ message: 'El registro ya existe en la base de datos.' });
    }

    // Validar que los campos obligatorios no sean null
    if (!registro.Nombre_Comercial || !registro.Aptitud || !registro.Sustancia_Activa_1 || !registro.Activo_Contenido_1 || !registro.Unidades_1) {
      return res.status(400).json({ message: 'Faltan campos obligatorios en el registro.' });
    }

    // Crear el nuevo registro en la base de datos
    await MgapPest.create({
      Registro: registro.Registro,
      Nombre_Comercial: registro.Nombre_Comercial,  
      Aptitud: registro.Aptitud,
      Sustancia_Activa_1: registro.Sustancia_Activa_1,
      Activo_Contenido_1: registro.Activo_Contenido_1,
      Unidades_1: registro.Unidades_1,  
      Sustancia_Activa_2: registro.Sustancia_Activa_2 || null,
      Activo_Contenido_2: registro.Activo_Contenido_2 || null,
      Unidades_2: registro.Unidades_2 || null,
      Sustancia_Activa_3: registro.Sustancia_Activa_3 || null,
      Activo_Contenido_3: registro.Activo_Contenido_3 || null,
      Unidades_3: registro.Unidades_3 || null,
      Sustancia_Activa_4: registro.Sustancia_Activa_4 || null,
      Activo_Contenido_4: registro.Activo_Contenido_4 || null,
      Unidades_4: registro.Unidades_4 || null,
      Formulacion: registro.Formulacion || null,
      Toxicologia: registro.Toxicologia || null,
      Vencimiento: registro.Vencimiento || null,
      Estado: registro.Estado || null,
      Receta: registro.Receta || null,
      Empresa_Razon_Social: registro.Empresa_Razon_Social || null,
      Pais: registro.Pais || null,
      Pais_2: registro.Pais_2 || null,
      Pais_3: registro.Pais_3 || null,
      Pais_4: registro.Pais_4 || null,
      Fecha_dato_MGAP: registro.Fecha_dato_MGAP || null,
      Observaciones: registro.Observaciones || null,
      Codigo: registro.Codigo || null,
      Rango_aplicacion: registro.Rango_aplicacion || null,
      Unidades_ra: registro.Unidades_ra || null,
      Otros_pa: registro.Otros_pa || null,
    });
    res.status(201).json({ message: 'Registro agregado exitosamente.' });
  } catch (error) {
    console.error('Error al confirmar agregado:', error);
    res.status(500).json({ message: 'Error al agregar registro.' });
  }
}

// Obtener un pesticida por ID
const getPestById = async (req, res) => {
  try {
    const pest = await MgapPest.findByPk(req.params.id); // Verifica que estás usando `id` como el nombre del parámetro
    if (!pest) {
      return res.status(404).json({ message: 'Pesticida no encontrado' });
    }
    res.json(pest); // Devuelve el pesticida como respuesta JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pesticida', error });
  }
};

// Actualizar un Pesticida
const updatePest = async (req, res) => {
  const registro = req.body;

  try {
    const pest = await MgapPest.findByPk(req.params.id);
    if (!pest) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await pest.update({
      Registro: registro.Registro,
      Nombre_Comercial: registro.Nombre_Comercial,  
      Aptitud: registro.Aptitud,
      Sustancia_Activa_1: registro.Sustancia_Activa_1,
      Activo_Contenido_1: registro.Activo_Contenido_1,
      Unidades_1: registro.Unidades_1,  
      Sustancia_Activa_2: registro.Sustancia_Activa_2 || null,
      Activo_Contenido_2: registro.Activo_Contenido_2 || null,
      Unidades_2: registro.Unidades_2 || null,
      Sustancia_Activa_3: registro.Sustancia_Activa_3 || null,
      Activo_Contenido_3: registro.Activo_Contenido_3 || null,
      Unidades_3: registro.Unidades_3 || null,
      Sustancia_Activa_4: registro.Sustancia_Activa_4 || null,
      Activo_Contenido_4: registro.Activo_Contenido_4 || null,
      Unidades_4: registro.Unidades_4 || null,
      Formulacion: registro.Formulacion || null,
      Toxicologia: registro.Toxicologia || null,
      Vencimiento: registro.Vencimiento || null,
      Estado: registro.Estado || null,
      Receta: registro.Receta || null,
      Empresa_Razon_Social: registro.Empresa_Razon_Social || null,
      Pais: registro.Pais || null,
      Pais_2: registro.Pais_2 || null,
      Pais_3: registro.Pais_3 || null,
      Pais_4: registro.Pais_4 || null,
      Fecha_dato_MGAP: registro.Fecha_dato_MGAP || null,
      Observaciones: registro.Observaciones || null,
      Codigo: registro.Codigo || null,
      Rango_aplicacion: registro.Rango_aplicacion || null,
      Unidades_ra: registro.Unidades_ra || null,
      Otros_pa: registro.Otros_pa || null,
    });

    res.status(200).json(pest);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar pesticida', error });
  }
};

// Eliminar un Pesticida
const deletePest = async (req, res) => {
  try {
    const pest = await MgapPest.findByPk(req.params.id);
    if (!pest) {
      return res.status(404).json({ message: 'Pesticida no encontrado' });
    }

    await pest.destroy();
    res.status(200).json({ message: 'Pesticida eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pesticida', error });
  }
};

module.exports = {
  getMgapPestList,
  getCasByIngredienteActivo,
  getCodigoFechasByIngredienteActivo,
  agregarPesticida,
  getPestById,
  updatePest,
  deletePest
};

