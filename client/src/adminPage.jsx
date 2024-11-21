import React from 'react';
import '../src/Styles/adminPage.css'; 
import { useAuth } from './authContext'; 

function AdminPage() {
  const { user } = useAuth(); 

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


