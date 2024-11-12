const jwt = require('jsonwebtoken');
const InformeOcupacional = require('../models/informeOcupacionalModels');
const User = require('../models/userModels');


const obtenerDatosUsuario = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Token no proporcionado.');

    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token malformado.');

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

    // Asegúrate de que siempre retornamos el campo como 'Rol'
    const usuario = {
      Id: decoded.Id,
      Email: decoded.Email || decoded.email,
      Empresa: decoded.Empresa,
      Rol: decoded.Rol || decoded.role, // Aquí manejamos ambas variantes
    };

    console.log('Datos del usuario decodificados:', usuario); // Depuración
    return usuario;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error.message);
    throw new Error('Token inválido o expirado.');
  }
};



// Controlador para guardar el informe en la base de datos
const guardarInforme = async (req, res) => {
  try {
    const datosInforme = req.body;
    console.log('Datos recibidos en el backend:', datosInforme);
    const informe = await InformeOcupacional.create({
      id_escenario: datosInforme.id_escenario,
      actividad_trabajador: datosInforme.actividad_trabajador,
      categoria_objetivo: datosInforme.categoria_objetivo,
      nivel_epp_ec: datosInforme.nivel_epp_ec,
      tasa_aplicacion: datosInforme.tasa_aplicacion,
      unidad_tasa_aplicacion: datosInforme.unidad_tasa_aplicacion,
      area_tratada: datosInforme.area_tratada,
      unidad_area: datosInforme.unidad_area,
      ari: datosInforme.ari,
      hi: datosInforme.hi,
      hi_cancer: datosInforme.hi_cancer,
      escenario_resumido: datosInforme.escenario_resumido,
      id_usuario: datosInforme.id_usuario,
      nombre_usuario: datosInforme.nombre_usuario,
      apellido_usuario: datosInforme.apellido_usuario,
      fecha_hora: datosInforme.fecha_hora,
    });

    res.status(201).json({ message: 'Informe guardado exitosamente', informe });
  } catch (error) {
    console.error('Error al guardar el informe:', error);
    res.status(500).json({ message: 'Error al guardar el informe' });
  }
};

// Obtener informes según el rol del usuario
const obtenerInformes = async (req, res) => {
  try {
    const { Id, Rol, Empresa, Email } = obtenerDatosUsuario(req);
   // console.log(Id, Rol, Empresa, Email);

    let whereCondition = {};

    if (Rol === 'Admin' && Empresa === 'Latitud') {
      whereCondition = {}; // Admin de Latitud ve todos los informes
    } else if (Rol === 'Admin') {
      // JOIN con la tabla de usuarios para filtrar por empresa
      const informes = await InformeOcupacional.findAll({
        include: [
          {
            model: User,
            where: { Empresa },
            attributes: ['Empresa'], // Solo obtenemos el campo necesario
          },
        ],
      });
      return res.json(informes);
    } else {
      whereCondition = { id_usuario: Id }; // Usuario común ve solo sus informes
    }

    const informes = await InformeOcupacional.findAll({ where: whereCondition });
    res.json(informes);
  } catch (error) {
    console.error('Error al obtener los informes:', error);
    res.status(500).json({ message: 'Error al obtener los informes.' });
  }
};

//obtener un informe por ID
const obtenerInformePorId = async (req, res) => {
  try {
    const { id } = req.params; 
    const informe = await InformeOcupacional.findByPk(id); 

    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado.' }); 
    }

    res.json(informe); // Enviar el informe como respuesta
  } catch (error) {
    console.error('Error al obtener el informe:', error);
    res.status(500).json({ message: 'Error al obtener el informe.' });
  }
};



// Editar un informe
const editarInforme = async (req, res) => {
  try {
    const { Id, Rol } = obtenerDatosUsuario(req);
    const { id } = req.params;
    const datosActualizados = req.body;

    const informe = await InformeOcupacional.findOne({ where: { id } });

    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado.' });
    }

    if (Rol !== 'Admin' && informe.id_usuario !== Id) {
      return res.status(403).json({ message: 'No tienes permiso para editar este informe.' });
    }

    await InformeOcupacional.update(datosActualizados, { where: { id } });
    res.json({ message: 'Informe actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al editar el informe:', error);
    res.status(500).json({ message: 'Error al editar el informe.' });
  }
};

// Eliminar un informe
const eliminarInforme = async (req, res) => {
  try {
    const { Rol } = obtenerDatosUsuario(req);
    const { id } = req.params;

    if (Rol !== 'Admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este informe.' });
    }

    const informe = await InformeOcupacional.findOne({ where: { id } });

    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado.' });
    }

    await InformeOcupacional.destroy({ where: { id } });
    res.json({ message: 'Informe eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el informe:', error);
    res.status(500).json({ message: 'Error al eliminar el informe.' });
  }
};

module.exports = { 
  guardarInforme,
  obtenerInformes,
  obtenerInformePorId,
  editarInforme,
  eliminarInforme, 
};
