const dotenv = require('dotenv');
const request = require('supertest');
const sequelize = require('../config/database');
const app = require('../index');


dotenv.config();

describe('API de Guardado de Informe Ocupacional', () => {
  // Prueba para agregar un nuevo informe ocupacional
  it('debe agregar un nuevo informe ocupacional y devolver un código de estado 201', async () => {
    const nuevoInforme = {
      id_escenario: 'PF26',
      actividad_trabajador: 'Aplicador',
      categoria_objetivo: 'Categoría 1',
      tasa_aplicacion: 2.5,
      unidad_tasa_aplicacion: 'L/ha',
      area_tratada: 50,
      unidad_area: 'ha',
      ari: 1.2,
      hi: 0.8,
      hi_cancer: 0.5,
      nivel_epp_ec: 'Nivel 3',
      id_usuario: 1,
      nombre_usuario: 'Juan',
      apellido_usuario: 'Pérez',
      fecha_hora: new Date().toISOString()
    };

    const response = await request(app)
      .post('/api/informes-ocupacional/guardar')
      .send(nuevoInforme);

    expect(response.statusCode).toBe(201);
    // Accede a la propiedad dentro del objeto `informe`
    expect(response.body.informe).toHaveProperty('id_escenario', 'PF26');
    expect(response.body.informe).toHaveProperty('actividad_trabajador', 'Aplicador');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
