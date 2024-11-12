import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa Swal para mostrar mensajes
import '../src/Styles/FormulariosVista.css';

function FormulariosVista() {
  const navigate = useNavigate();

  // Función para redirigir a la vista de la lista de escenarios
  const handleAgregarClick = () => {
    console.log('Botón Agregar clickeado'); // Agrega este console.log para verificar que se ejecute
    navigate('/escenarios-list');
  };

  // Función para mostrar un mensaje de "Funcionalidad en proceso"
  const handleEstadisticasClick = () => {
    Swal.fire({
      title: 'Funcionalidad en proceso',
      text: 'Esta funcionalidad está en desarrollo.',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  };

  return (
    <div className="formularios-vista-body">
      <div className="buttons-container">
        <button className="btn-agregar" onClick={handleAgregarClick}>
          Agregar
        </button>
        <button className="btn-estadisticas" onClick={handleEstadisticasClick}>
          Estadísticas
        </button>
      </div>
    </div>
  );
}

export default FormulariosVista;
