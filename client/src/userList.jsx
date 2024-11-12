import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../src/Styles/UserList.css'; 

const MySwal = withReactContent(Swal);

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Obtener usuarios desde la API al cargar la vista
  useEffect(() => {
    axios.get('http://localhost:5000/api/users') 
      .then(response => {
        setUsers(response.data); 
      })
      .catch(error => {
        console.error("Hubo un error al obtener los usuarios", error);
      });
  }, []);

  // Manejar eliminación de usuario
  const handleDelete = (userId) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la API para eliminar el usuario
        axios.delete(`http://localhost:5000/api/users/${userId}`)
          .then(() => {
            setUsers(users.filter(user => user.Id !== userId)); // Actualiza la lista sin el usuario eliminado
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          })
          .catch(error => {
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
            console.error("Hubo un error al eliminar el usuario", error);
          });
      }
    });
  };

  return (
    <div className="user-list-body">
      <h1 className="user-h1">Gestión de Usuarios</h1>
      <Link to="/agregar" className="btn-add">Agregar Usuario</Link>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Empresa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.Id}>
              <td>{user.Nombre}</td>
              <td>{user.Apellido}</td>
              <td>{user.Rol}</td>
              <td>{user.Email}</td>
              <td>{user.Empresa}</td>
              <td>
                <button 
                  className="btn-edit"
                  onClick={() => navigate(`/editar/${user.Id}`)}
                >
                  Editar
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(user.Id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

