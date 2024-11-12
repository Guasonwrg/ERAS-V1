import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

function ProtectedRoute({ children, roleRequired }) {
  const { user } = useAuth();

  if (!user) {
    // Si no hay un usuario autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/ingresar" />;
  }

  if (roleRequired && user.Rol !== roleRequired) {
    // Si el usuario no tiene el rol necesario, redirige a una página no autorizada o de error
    return <Navigate to="/noAutorizado" />;
  }

  // Si el usuario está autenticado y tiene el rol correcto, renderiza el componente hijo
  return children;
}

export default ProtectedRoute;
