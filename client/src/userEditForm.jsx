import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/UserForm.css';

function EditUserForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Empresa: '',
    Rol: 'Comun', // Rol por defecto
    Contraseña: '', // Deja la contraseña vacía por seguridad
  });

  // Cargar los datos del usuario 
  useEffect(() => {
    //console.log("ID recibido:", id); 
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://eras-latitud-demo.com:5000/api/users/user/${id}`);
        const fetchedUser = response.data;
        setFormData({
          Nombre: fetchedUser.Nombre,
          Apellido: fetchedUser.Apellido,
          Email: fetchedUser.Email,
          Empresa: fetchedUser.Empresa,
          Rol: fetchedUser.Rol,
          Contraseña: '', // Por seguridad, la contraseña no se pre-carga
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [id]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Formulario enviado');
   // console.log('ID a actualizar:', id); 
    //console.log('Datos del formulario:', formData);

    try {
      // Llamada al backend para actualizar el usuario
      const response = await axios.put(`https://eras-latitud-demo.com:5000/api/users/editar/${id}`, formData);
      console.log('Usuario actualizado:', response.data);
      navigate('/usuarios'); 
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleCancel = () => {
    navigate('/usuarios'); 
  };

  return (
    <div className="user-form-body">
      <h1>Editar Usuario</h1>
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
          <label>Nueva Contraseña</label> {/* Campo de contraseña vacío por seguridad */}
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

export default EditUserForm;


