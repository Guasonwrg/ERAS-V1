const request = require('supertest');
const app = require('../index');

describe('TC-USER-GET-ALL-001: Verificar que la API devuelve todos los usuarios', () => {
  it('debe devolver un array de usuarios con un código de estado 200', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('TC-USER-GET-BY-ID-002: Verificar que la API devuelve un usuario por ID', () => {
  it('debe devolver el objeto del usuario correspondiente con un código de estado 200', async () => {
    const idValido = 1; 
    const response = await request(app).get(`/api/users/user/${idValido}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('Id', idValido);
  });
});

describe('TC-USER-POST-ADD-003: Verificar que la API permite agregar un nuevo usuario', () => {
  it('debe permitir agregar un nuevo usuario y devolver un código de estado 201', async () => {
    const nuevoUsuario = {
      Nombre: 'Juan',
      Apellido: 'Pérez',
      Email: 'jperez@perez.com',
      Rol: 'Comun',
      Empresa: 'Ninguna',
      Contraseña: '123456',
    };

    const response = await request(app).post('/api/users/agregar').send(nuevoUsuario);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('Id'); 
  });
});

describe('TC-USER-PUT-UPDATE-004: Verificar que la API permite actualizar un usuario por ID', () => {
  it('debe permitir actualizar un usuario y devolver un código de estado 200', async () => {
    const idActualizar = 28; 
    const actualizacionUsuario = {
      Nombre: 'Juan Actualizado',
      Apellido: 'Pérez Actualizado',
      Email: 'jperez@prueba.com',
      Contraseña: '123456',
      Empresa: 'Prueba',
      Rol: 'Comun'
    };

    const response = await request(app).put(`/api/users/editar/${idActualizar}`).send(actualizacionUsuario);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('Id', idActualizar); // Verifica si devuelve el objeto actualizado con 'Id'
  });
});

describe('TC-USER-DELETE-005: Verificar que la API permite eliminar un usuario por ID', () => {
  it('debe permitir eliminar un usuario por ID y devolver un código de estado 200', async () => {
    const idEliminar = 32; 

    const response = await request(app).delete(`/api/users/${idEliminar}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario eliminado correctamente');
  });
});
