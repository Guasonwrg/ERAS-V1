const request = require('supertest');
const app = require('../index'); 
//const { User } = require('../models/userModels'); 
const jwt = require('jsonwebtoken');

// Mock de client.verifyIdToken
jest.mock('google-auth-library', () => {
  return {
    OAuth2Client: jest.fn(() => ({
      verifyIdToken: jest.fn().mockResolvedValue({
        getPayload: jest.fn().mockReturnValue({
          email: 'willyromero1@gmail.com',
          name: 'Willy Romero',
          family_name: 'Romero',
        }),
      }),
    })),
  };
});

describe('TC-LOGIN-GGL-001: Verificar inicio de sesión con Google', () => {
  it('debe permitir el inicio de sesión con Google y devolver un token JWT', async () => {
    // Simula la petición de inicio de sesión con Google
    const response = await request(app)
      .post('/api/users/google-login') // Ajusta la ruta si es necesario
      .send({ token: 'mockGoogleToken' });

    // Verifica que la respuesta tenga el código de estado 200
    expect(response.statusCode).toBe(200);

    // Verifica que el cuerpo de la respuesta contenga un token JWT
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user.Email', 'willyromero1@gmail.com');
    expect(response.body).toHaveProperty('tieneCambiosPendientes');
  });

});
