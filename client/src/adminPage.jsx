import React from 'react';
import '../src/Styles/adminPage.css'; // Asegúrate de que la ruta sea correcta
import { useAuth } from './authContext'; // Importa el hook para usar el contexto de autenticación

function AdminPage() {
  const { user } = useAuth(); // Obtén el usuario del contexto de autenticación

  return (
    <div className="admin-page-body">
      <div className="welcome-message">Bienvenido: {user.name}</div>
      <div className="admin-page-menu">
        <div className="menu-item">Informes</div>
        <div className="menu-item">Usuarios</div>
        <div className="menu-item">Formularios</div>
      </div>
    </div>
  );
}

export default AdminPage;


