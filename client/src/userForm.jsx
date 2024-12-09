import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../src/Styles/UserForm.css';

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Empresa: '',
    Rol: 'Comun', // Rol por defecto
    Contraseña: '', // Campo vacío al agregar usuario
  });

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log('Formulario enviado');
    //console.log('Datos del formulario:', formData);

    try {
      // Llamada al backend para agregar el usuario
      const response = await axios.post('http://34.39.142.103:5000/api/users/agregar', formData);
      console.log('Respuesta del servidor:', response.data);
      navigate('/usuarios'); // Redirigir a la lista de usuarios
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // Manejar la cancelación
  const handleCancel = () => {
    navigate('/usuarios');
  };

  return (
    <div className="user-form-body">
      <h1>Agregar Usuario</h1>
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
          <select
            value={formData.Rol}
            onChange={(e) => setFormData({ ...formData, Rol: e.target.value })}
            required
          >
            <option value="Comun">Comun</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contraseña</label> {/* Campo de contraseña */}
          <input
            type="password"
            value={formData.Contraseña}
            onChange={(e) => setFormData({ ...formData, Contraseña: e.target.value })}
            required // Campo obligatorio al agregar un usuario
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Agregar Usuario
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;

