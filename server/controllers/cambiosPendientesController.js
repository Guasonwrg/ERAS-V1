const InformeCambios = require('../models/cambiosPesticidasModels');
const  MgapPest  = require('../models/pesticidasModels');
const { Sequelize, Op } = require('sequelize');

// Obtener todos los cambios pendientes
const obtenerCambiosPendientes = async (req, res) => {
  try {
    const cambiosPendientes = await InformeCambios.findAll({
      where: {
        estado: 'pendiente',
        id: {
          [Op.in]: Sequelize.literal(`
            (SELECT MAX(id) 
             FROM informecambios 
             WHERE estado = 'pendiente' 
             GROUP BY estado)
          `),
        },
      },
      order: [['id', 'DESC']],
    });

    if (!cambiosPendientes.length) {
      return res.status(404).json({ message: 'No hay cambios pendientes.' });
    }

    // Parsear el campo 'detalles' desde JSON para cada registro
    const cambios = cambiosPendientes.map((cambio) => ({
      ...cambio.dataValues,
      detalles: JSON.parse(cambio.detalles),
    }));

    // Separar en agregados, modificados y eliminados
    const agregados = cambios.flatMap(c => c.detalles.agregados || []);
    const modificados = cambios.flatMap(c => c.detalles.modificados || []);
    const eliminados = cambios.flatMap(c => c.detalles.eliminados || []);

    //console.log('Agregados:', agregados);
    //console.log('Modificados:', modificados);
    //console.log('Eliminados:', eliminados);

    res.json({ agregados, modificados, eliminados });
  } catch (error) {
    console.error('Error al obtener cambios pendientes:', error);
    res.status(500).json({ message: 'Error al obtener cambios pendientes.' });
  }
};

// Función para validar un registro antes de insertarlo
const esRegistroValido = (registro) => {
  // Asegúrate de que el Registro no sea nulo y que otros campos obligatorios no lo sean
  return (
    registro.Registro != null &&
    registro.Nombre_Comercial != null &&
    registro.Aptitud != null &&
    registro.Sustancia_Activa_1 != null &&
    registro.Activo_Contenido_1 != null &&
    registro.Unidades_1 != null
  );
};



// Confirmar agregados (inserción masiva)
const confirmarAgregados = async (req, res) => {
  const agregados = req.body;
  console.log('Datos recibidos en confirmarAgregados:', agregados);

  const validos = agregados.filter(esRegistroValido);
  console.log('Registros válidos:', validos);

  const sequelize = MgapPest.sequelize;

  try {
    await sequelize.transaction(async (t) => {
      for (const registro of validos) {
        const existe = await MgapPest.findOne({ where: { Registro: registro.Registro }, transaction: t });
        if (!existe) {
          await MgapPest.create(
            {
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
            },
            { transaction: t }
          );
        } else {
          console.log(`Registro duplicado encontrado: ${registro.Registro}`);
        }
      }

      const informeCambio = await InformeCambios.findOne({ where: { estado: 'pendiente' }, order: [['id', 'DESC']] });
      if (informeCambio) {
        let detalles;
        try {
          detalles = JSON.parse(informeCambio.detalles);
        } catch (error) {
          console.error("Error al parsear 'detalles' como JSON:", error);
          detalles = { agregados: [], modificados: [], eliminados: [] };
        }

        detalles.agregados = detalles.agregados.filter(item => !validos.some(valid => valid.Registro === item.Registro));
        informeCambio.detalles = JSON.stringify(detalles);
        await informeCambio.save();
      }
    });

    res.status(200).json({ message: 'Registros agregados exitosamente.' });
  } catch (error) {
    console.error('Error al confirmar agregados:', error);
    res.status(500).json({ message: 'Error al agregar registros.', error });
  }
};




// Confirmar modificados (edición masiva con transacción)
const confirmarModificados = async (req, res) => {
  const registrosModificados = req.body; // Recibir los registros del request
  console.log('Registros recibidos para modificar:', registrosModificados);
  const sequelize = MgapPest.sequelize; // Instancia de Sequelize

  try {
    // Validación de datos antes de la transacción
    if (!Array.isArray(registrosModificados) || registrosModificados.length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron registros válidos para modificar.' });
    }

    // Iniciar una transacción
    await sequelize.transaction(async (t) => {
      const registrosNoEncontrados = [];
      const actualizaciones = [];

      for (const registro of registrosModificados) {
        console.log('Registro actualizando:', registro);

        // Validar que cada registro tenga un 'Registro' (clave única)
        if (!registro.Registro) {
          throw new Error(`Registro inválido: ${JSON.stringify(registro)}`);
        }

        // Verificar si existe el registro en la base de datos
        const existe = await MgapPest.findOne({
          where: { Registro: registro.Registro },
          transaction: t,
        });

        if (existe) {
          // Preparar los datos para la actualización en un solo objeto
          actualizaciones.push(
            MgapPest.update(
              {
                Nombre_Comercial: registro['nombre comercial'] || existe.Nombre_Comercial,
                Aptitud: registro.aptitud || existe.Aptitud,
                Sustancia_Activa_1: registro['sustancia activa -1-'] || existe.Sustancia_Activa_1,
                Activo_Contenido_1: registro['activo contenido -1-'] || existe.Activo_Contenido_1,
                Unidades_1: registro.Unidades_1 || existe.Unidades_1,
                Sustancia_Activa_2: registro['sustancia activa -2-'] || existe.Sustancia_Activa_2,
                Activo_Contenido_2: registro['activo contenido -2-'] || existe.Activo_Contenido_2,
                Unidades_2: registro.Unidades_2 || existe.Unidades_2,
                Sustancia_Activa_3: registro['sustancia activa -3-'] || existe.Sustancia_Activa_3,
                Activo_Contenido_3: registro['activo contenido -3-'] || existe.Activo_Contenido_3,
                Unidades_3: registro.Unidades_3 || existe.Unidades_3,
                Sustancia_Activa_4: registro['sustancia activa -4-'] || existe.Sustancia_Activa_4,
                Activo_Contenido_4: registro['activo contenido -4-'] || existe.Activo_Contenido_4,
                Unidades_4: registro.Unidades_4 || existe.Unidades_4,
                Formulacion: registro.Formulacion || existe.Formulacion,
                Toxicologia: registro.Toxicologia || existe.Toxicologia,
                Vencimiento: registro.Vencimiento || existe.Vencimiento,
                Estado: registro.Estado || existe.Estado,
                Receta: registro.Receta || existe.Receta,
                Empresa_Razon_Social: registro['empresa razon social'] || existe.Empresa_Razon_Social,
                Pais: registro['país'] || existe.Pais,
                Pais_2: registro['país2'] || existe.Pais_2,
                Pais_3: registro['país3'] || existe.Pais_3,
                Pais_4: registro['país4'] || existe.Pais_4,
                Fecha_dato_MGAP: registro.Fecha_dato_MGAP || existe.Fecha_dato_MGAP,
                Observaciones: registro.Observaciones || existe.Observaciones,
                Codigo: registro.Codigo || existe.Codigo,
                Rango_aplicacion: registro.Rango_aplicacion || existe.Rango_aplicacion,
                Unidades_ra: registro.Unidades_ra || existe.Unidades_ra,
                Otros_pa: registro.Otros_pa || existe.Otros_pa,
              },
              {
                where: { Registro: registro.Registro },
                transaction: t,
              }
            )
          );
        } else {
          registrosNoEncontrados.push(registro.Registro);
        }
      }

      // Ejecutar todas las actualizaciones en paralelo
      await Promise.all(actualizaciones);

      // Actualizar el informe de cambios
      const informeCambio = await InformeCambios.findOne({
        where: { estado: 'pendiente' },
        order: [['id', 'DESC']],
      });

      if (informeCambio) {
        let detalles;
        try {
          detalles = JSON.parse(informeCambio.detalles);
        } catch (error) {
          console.error("Error al parsear 'detalles' como JSON:", error);
          detalles = { agregados: [], modificados: [], eliminados: [] };
        }

        detalles.modificados = detalles.modificados.filter(
          (item) => !registrosModificados.some((registro) => registro.Registro === item.Registro)
        );

        informeCambio.detalles = JSON.stringify(detalles);
        await informeCambio.save({ transaction: t });
      }

      if (registrosNoEncontrados.length > 0) {
        console.warn(`Registros no encontrados: ${registrosNoEncontrados.join(', ')}`);
      }
    });

    // Responder éxito si todo salió bien
    res.status(200).json({ message: 'Registros modificados con éxito.' });
  } catch (error) {
    console.error('Error al confirmar modificados:', error);
    res.status(500).json({ message: 'Error al modificar registros.', error });
  }
};



// Confirmar agregado individual
const confirmarAgregadoIndividual = async (req, res) => {
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

    // Buscar el informe de cambios pendiente y actualizar el campo `agregados`
    const informeCambio = await InformeCambios.findOne({
      where: { estado: 'pendiente' },
      order: [['id', 'DESC']],
    });

    if (informeCambio) {
      // Parsear el campo `detalles` como JSON, o inicializarlo como un objeto vacío
      let detalles;
      try {
        detalles = JSON.parse(informeCambio.detalles);
      } catch (error) {
        console.error("Error al parsear 'detalles' como JSON:", error);
        detalles = { agregados: [], modificados: [], eliminados: [] };
      }

      // Asegurarse de que `agregados` es un array antes de continuar
      if (!Array.isArray(detalles.agregados)) {
        detalles.agregados = [];
      }

      // Filtrar el objeto correspondiente a `Registro` del conjunto `agregados`
      detalles.agregados = detalles.agregados.filter((item) => item.Registro !== registro.Registro);

      // Actualizar el estado si todos los conjuntos están vacíos
      let nuevoEstado = 'pendiente';
      if (
        detalles.agregados.length === 0 &&
        detalles.modificados.length === 0 &&
        detalles.eliminados.length === 0
      ) {
        nuevoEstado = 'confirmado';
      }

      // Guardar el `detalles` actualizado como cadena JSON y cambiar el estado si es necesario
      informeCambio.detalles = JSON.stringify(detalles);
      informeCambio.estado = nuevoEstado;

      await informeCambio.save();
    }

    res.status(201).json({ message: 'Registro agregado exitosamente y actualizado en el informe de cambios.' });
  } catch (error) {
    console.error('Error al confirmar agregado:', error);
    res.status(500).json({ message: 'Error al agregar registro.' });
  }
};


// Confirmar modificado individual
const confirmarModificadoIndividual = async (req, res) => {
  const { Registro, modificaciones } = req.body;

  try {
    // Validación de entrada
    if (!Registro || !modificaciones) {
      return res.status(400).json({ message: 'El registro y las modificaciones son necesarios.' });
    }

    // 1. Buscar la PK_pest usando el Registro
    const registroExistente = await MgapPest.findOne({ where: { Registro } });
    if (!registroExistente) {
      return res.status(404).json({ message: 'Registro no encontrado en MgapPest.' });
    }

    // 2. Actualizar el registro con los datos de modificaciones
    await registroExistente.update(modificaciones);

    // 3. Buscar el informe de cambios pendiente y actualizar el campo `modificados`
    const informeCambio = await InformeCambios.findOne({
      where: { estado: 'pendiente' },
      order: [['id', 'DESC']],
    });

    if (informeCambio) {
      let detalles;
      try {
        detalles = JSON.parse(informeCambio.detalles);
      } catch (error) {
        console.error("Error al parsear 'detalles' como JSON:", error);
        detalles = { agregados: [], modificados: [], eliminados: [] };
      }

      // Asegurarse de que `modificados` es un array
      detalles.modificados = Array.isArray(detalles.modificados) ? detalles.modificados : [];

      // Filtrar el objeto correspondiente al `Registro` del conjunto `modificados`
      detalles.modificados = detalles.modificados.filter((item) => item.Registro !== Registro);

      // Actualizar el estado si todos los conjuntos están vacíos
      const nuevoEstado = detalles.agregados.length === 0 &&
                          detalles.modificados.length === 0 &&
                          detalles.eliminados.length === 0 ? 
                          'confirmado' : 
                          'pendiente';

      // Guardar el `detalles` actualizado como cadena JSON y cambiar el estado si es necesario
      informeCambio.detalles = JSON.stringify(detalles);
      informeCambio.estado = nuevoEstado;

      await informeCambio.save();
    }

    res.status(200).json({ message: 'Registro modificado y actualizado en el informe de cambios exitosamente.' });
  } catch (error) {
    console.error('Error al modificar registro y actualizar informe de cambios:', error);
    res.status(500).json({ message: 'Error al modificar registro y actualizar informe de cambios.' });
  }
};

// Confirmar eliminación individual en MgapPest y actualizar InformeCambios
const confirmarEliminadoIndividual = async (req, res) => {
  const { PK_pest } = req.body;

  try {
    if (!PK_pest) {
      return res.status(400).json({ message: 'El ID del registro es necesario.' });
    }

    // 1. Eliminar el registro de la tabla MgapPest
    const registroPest = await MgapPest.findOne({ where: { PK_pest } });
    if (!registroPest) {
      return res.status(404).json({ message: 'Registro no encontrado en MgapPest.' });
    }
    await registroPest.destroy();

    // 2. Buscar el informe de cambios pendiente y actualizar el campo `eliminados`
    const informeCambio = await InformeCambios.findOne({
      where: { estado: 'pendiente' },
      order: [['id', 'DESC']]
    });

    if (informeCambio) {
      // Parsear el campo `detalles` como JSON, o inicializarlo como un objeto vacío
      let detalles;
      try {
        detalles = JSON.parse(informeCambio.detalles);
      } catch (error) {
        console.error("Error al parsear 'detalles' como JSON:", error);
        detalles = { agregados: [], modificados: [], eliminados: [] };
      }

      // Asegurarse de que `eliminados` es un array antes de continuar
      if (!Array.isArray(detalles.eliminados)) {
        detalles.eliminados = [];
      }

      // Filtrar el objeto correspondiente a `PK_pest` del conjunto `eliminados`
      detalles.eliminados = detalles.eliminados.filter((item) => item.PK_pest !== PK_pest);

      // Actualizar el estado si todos los conjuntos están vacíos
      let nuevoEstado = 'pendiente';
      if (
        detalles.agregados.length === 0 &&
        detalles.modificados.length === 0 &&
        detalles.eliminados.length === 0
      ) {
        nuevoEstado = 'confirmado';
      }

      // Guardar el `detalles` actualizado como cadena JSON y cambiar el estado si es necesario
      informeCambio.detalles = JSON.stringify(detalles);
      informeCambio.estado = nuevoEstado;

      await informeCambio.save();
    }

    res.status(200).json({ message: 'Registro eliminado y actualizado en el informe de cambios exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar registro y actualizar informe de cambios:', error);
    res.status(500).json({ message: 'Error al eliminar registro y actualizar informe de cambios.' });
  }
};

module.exports = { 
  obtenerCambiosPendientes, 
  confirmarAgregados, 
  confirmarModificados,
  confirmarAgregadoIndividual,
  confirmarModificadoIndividual,
  confirmarEliminadoIndividual
};
