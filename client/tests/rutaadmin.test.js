import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { AuthProvider }from '../src/authContext'; 
import ProtectedRoute from '../src/protectedRoute';
import PestList from '../src/pestList';
import UnauthorizedPage from '../src/noAutorizado';


// Generar un token JWT de prueba
const mockUser = {
  Id: '1',
  Email: 'pprueba@prueba.com',
  Rol: 'Comun',
  Empresa: 'Ninguna'
};

const token = jwt.sign(
  { Id: mockUser.Id, Email: mockUser.Email, Rol: mockUser.Rol, Empresa: mockUser.Empresa },
  'supersecretkey123', 
  { expiresIn: '1h' }
);

localStorage.setItem('token', token);
localStorage.setItem('usuario', JSON.stringify(mockUser));

test('un usuario con rol Comun no puede acceder a la ruta /pesticidas-abm y es redirigido a /noAutorizado', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/pesticidas-abm']}>
          <AuthProvider>
          <Routes>
            <Route 
                path="/pesticidas-abm" 
                element={
                <ProtectedRoute roleRequired="Admin">
                    <PestList />
                </ProtectedRoute>
                } 
                />
            <Route path="/noAutorizado" element={<UnauthorizedPage />} />
            </Routes>

          </AuthProvider>
        </MemoryRouter>
      );
    });
  
    // Verificar si se redirige a /noAutorizado
    expect(screen.queryByText(/Gestión de Pesticidas/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/No tienes permiso para acceder a esta página/i)).toBeInTheDocument();
    });
  });
  