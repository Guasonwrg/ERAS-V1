import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authContext';
import '../src/Styles/UserForm.css';

function UserProfile() {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Obtengo el usuario del contexto de autenticación

  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Empresa: '',
    Rol: '',
    Contraseña: '', 
  });

  useEffect(() => {
   // console.log('Usuario logueado:', user); 
    if (user) {
      setFormData({
        Nombre: user.Nombre,
        Apellido: user.Apellido,
        Email: user.Email,
        Empresa: user.Empresa,
        Rol: user.Rol,
        Contraseña: '', // No pre-cargar contraseña por seguridad
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !user.Id) {
      //console.error('ID de usuario no disponible');
      return;
    }

    try {
      // Llamada al backend para actualizar el perfil del usuario
      console.log("ID a actualizar:", user.Id);
      const response = await axios.put(`https://eras-latitud-demo.com:5000/api/users/perfil/${user.Id}`, formData);
      console.log('Usuario actualizado:', response.data);
      localStorage.setItem('usuario', JSON.stringify(response.data));
      login(response.data, localStorage.getItem('token'));
      navigate(`/user`);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/user`);
  };

  return (
    <div className="user-form-body">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={formData.Nombre}
            onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={formData.Apellido}
            onChange={(e) => setFormData({ ...formData, Apellido: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.Email}
            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Empresa</label>
          <input
            type="text"
            value={formData.Empresa}
            onChange={(e) => setFormData({ ...formData, Empresa: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <input
            type="text"
            value={formData.Rol}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={formData.Contraseña}
            onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Guardar Cambios
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;






