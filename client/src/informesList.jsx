import React, { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/InformesList.css'; 

const MySwal = withReactContent(Swal);

function InformesList() {
  const navigate = useNavigate();
  const [informes, setInformes] = useState([]);
  const [empresa, setEmpresa] = useState('');

  // Obtener los informes desde la API al cargar la vista
  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
          const decodedToken = parseJwt(token);
          setEmpresa(decodedToken?.Empresa);
          console.log('Empresa:', decodedToken?.Empresa);
        }
        

        const response = await axios.get('http://34.39.142.103:5000/api/informes-ocupacional', {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        });
        console.log('Informes obtenidos:', response.data);
        setInformes(response.data); // Guardar los informes en el estado
      } catch (error) {
        console.error('Hubo un error al obtener los informes', error);
        Swal.fire('Error', 'Hubo un problema al obtener los informes.', 'error');
      }
    };

    fetchInformes(); // Llamar la función al cargar el componente
  }, []);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  // Manejar la eliminación de un informe
  const handleDelete = (informeId) => {
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
        // Llamar a la API para eliminar el informe
        axios.delete(`http://34.39.142.103:5000/api/informes-ocupacional/${informeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        })
          .then(() => {
            setInformes(informes.filter(informe => informe.id !== informeId)); // Actualizar la lista sin el informe eliminado
            Swal.fire('Eliminado!', 'El informe ha sido eliminado.', 'success');
          })
          .catch(error => {
            Swal.fire('Error', 'Hubo un problema al eliminar el informe.', 'error');
            console.error("Hubo un error al eliminar el informe", error);
          });
      }
    });
  };

  return (
    <div className="informes-list-body">
      <h1 className="informes-h1">Lista de Informes Ocupacional</h1>
      <table className="informes-table">
        <thead>
          <tr>
            <th>ID Escenario</th>
            <th>Actividad</th>
            <th>Categoría</th>
            <th>Empresa</th>
            <th>Fecha y Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {informes.length > 0 ? (
            informes.map((informe) => (
              <tr key={informe.id}>
                <td>{informe.id_escenario}</td>
                <td>{informe.actividad_trabajador}</td>
                <td>{informe.categoria_objetivo}</td>
                <td>{empresa}</td>
                <td>{new Date(informe.fecha_hora).toLocaleString()}</td>
                <td class="acciones">
                    <button class="btn-edit" onClick={() => navigate(`/editar-ocupacional/${informe.id}`)}>Ver</button>
                    <button class="btn-delete" onClick={() => handleDelete(informe.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No se encontraron informes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default InformesList;

