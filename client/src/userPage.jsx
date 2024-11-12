import React, { useEffect, useState } from 'react';
import '../src/Styles/UserPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Usa el contexto de autenticación para obtener los datos del usuario

function UserPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtengo el usuario logueado desde el contexto
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      navigate('/ingresar');
    }
  }, [user, navigate]);

  if (!userData) {
    return <p>Cargando...</p>; // mensaje mostrado en pantalla por si demora en obtener los datos
  }

  return (
    <div className="user-page-container">
      <div className="user-info">
        <h2 className="user-info-title">Información del Usuario</h2>
        <div className="user-info-field">
          <label>Nombre:</label>
          <span>{userData.Nombre}</span>
        </div>
        <div className="user-info-field">
          <label>Apellido:</label>
          <span>{userData.Apellido}</span>
        </div>
        <div className="user-info-field">
          <label>Email:</label>
          <span>{userData.Email}</span>
        </div>
        <div className="user-info-field">
          <label>Empresa:</label>
          <span>{userData.Empresa}</span>
        </div>
        <div className="user-info-field">
          <label>Rol:</label>
          <span>{userData.Rol}</span>
        </div>
        <button className="modify-button" onClick={() => navigate(`/perfil/${userData.Id}`)}>Modificar</button>
      </div>
    </div>
  );
}

export default UserPage;



