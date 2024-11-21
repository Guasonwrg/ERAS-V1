const request = require('supertest');
const app = require('../index'); 

describe('TC-API-GET-ALL-001: Verificar que la API devuelve todos los pesticidas', () => {
  it('debe devolver un array de pesticidas con un código de estado 200', async () => {
    const response = await request(app).get('/api/pesticidas');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
  });
});
describe('TC-API-GET-BY-ID-002: Verificar que la API devuelve un pesticida por ID', () => {
    it('debe devolver el objeto del pesticida correspondiente con un código de estado 200', async () => {
      const idValido = 4; 
      const response = await request(app).get(`/api/pesticidas/pesticida/${idValido}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('PK_pest', idValido);
    });
  });
  describe('TC-API-POST-ADD-003: Verificar que la API permite agregar un nuevo pesticida', () => {
    it('debe permitir agregar un nuevo pesticida y devolver un código de estado 201', async () => {
      const nuevoPesticida = {
        Registro: 10001,
        Nombre_Comercial: 'Nuevo Pesticida',
        Aptitud: 'Herbicida',
        Sustancia_Activa_1: 'Sustancia Activa X',
        Activo_Contenido_1: 50,
        Unidades_1: 'g p.a./L',
        Formulacion: 'Concentrado Soluble',
        Toxicologia: 'II',
        Vencimiento: '2025-12-31',
        Empresa: 'Empresa XYZ'
      };
  
      const response = await request(app).post('/api/pesticidas/agregar-pesticida').send(nuevoPesticida);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Registro agregado exitosamente.');
    });
  });
  describe('TC-API-DELETE-004: Verificar que la API permite eliminar un pesticida por ID', () => {
    it('debe permitir eliminar un pesticida por ID y devolver un código de estado 204', async () => {
      const idEliminar = 56; 
  
      const response = await request(app).delete(`/api/pesticidas/${idEliminar}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Pesticida eliminado correctamente');
    });
  });
  