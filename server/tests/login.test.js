const request = require('supertest');
const sequelize = require('../config/database');
const app = require('../index'); 

describe('TC-LOGIN-001: Verificar inicio de sesión con credenciales válidas', () => {
  it('debe permitir el inicio de sesión con credenciales válidas y redirigir al perfil', async () => {
    // Datos de inicio de sesión válidos
    const credencialesValidas = {
      Email: 'pprueba@prueba.com', 
      Contraseña: 'Prueba123'   
    };

    // Simula la petición de inicio de sesión
    const response = await request(app)
      .post('/api/users/ingresar') 
      .send(credencialesValidas);

    // Verifica el estado de la respuesta
    expect(response.body).toHaveProperty('mensaje', 'Bienvenido');
    expect(response.statusCode).toBe(200); 
    expect(response.body).toHaveProperty('user.Nombre', 'Prueba');
    expect(response.body).toHaveProperty('token');    
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
