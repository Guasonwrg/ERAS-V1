import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/protectedRoute';
import LoginPage from '../src/ingresar';
import InformesList from '../src/informesList';
import { AuthProvider } from '../src/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

test('redirecciona a la página de inicio de sesión si el usuario no está autenticado', () => {
  render(
    <GoogleOAuthProvider clientId="27">
      <MemoryRouter initialEntries={['/informes-ocupacional']}>
        <AuthProvider>
          <Routes>
            <Route path="/ingresar" element={<LoginPage />} />
            <Route
              path="/informes-ocupacional"
              element={
                <ProtectedRoute>
                  <InformesList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    </GoogleOAuthProvider>
  );

  // Verifica si se redirige a la página de inicio de sesión
  const elementos = screen.getAllByText(/ingresar/i);
    expect(elementos[0]).toBeInTheDocument(); 
});
