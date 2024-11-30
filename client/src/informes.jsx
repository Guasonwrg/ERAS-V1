import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './Styles/Informes.css';

function Informes() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedTasaDilucion, setSelectedTasaDilucion] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedTasaDilucion')) || location.state?.selectedTasaDilucion || null;
  });
  
  const [selectedPesticida, setSelectedPesticida] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedPesticida')) || location.state?.selectedPesticida || null;
  });
  
  const [selectedEscenario, setSelectedEscenario] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedEscenario')) || location.state?.selectedEscenario || null;
  });
  
  const [selectedCoadyuvante, setSelectedCoadyuvante] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedCoadyuvante')) || location.state?.selectedCoadyuvante || null;
  });
  
  const [selectedActividadDiaria, setSelectedActividadDiaria] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedActividadDiaria')) || location.state?.selectedActividadDiaria || null;
  });

  const [riesgoData, setRiesgoData] = useState(() => {
    return JSON.parse(localStorage.getItem('riesgoData')) || location.state?.riesgoData || null;
  });
  
  //const selectedEscenario = location.state?.selectedEscenario;
  //const selectedPesticida = location.state?.selectedPesticida;
  //const selectedCoadyuvante = location.state?.selectedCoadyuvante;
  //const selectedTasaDilucion = location.state?.selectedTasaDilucion;
  //const selectedActividadDiaria = location.state?.selectedActividadDiaria;

  //console.log(selectedActividadDiaria);
  // Funciones para manejar la redirección de cada botón
  const handleOcupTablas = () => {
    // Guardar los datos en localStorage
    localStorage.setItem('selectedTasaDilucion', JSON.stringify(selectedTasaDilucion));
    localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
    localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
    localStorage.setItem('selectedCoadyuvante', JSON.stringify(selectedCoadyuvante));
    localStorage.setItem('selectedActividadDiaria', JSON.stringify(selectedActividadDiaria));
  
    navigate('/ocup-tablas', {
      state: {
        selectedTasaDilucion,
        selectedEscenario,
        selectedPesticida,
        selectedCoadyuvante,
        selectedActividadDiaria,
      },
    });
  };
  
  const handleAMBTablas = () => {
    Swal.fire({
      title: 'Funcionalidad en proceso',
      text: 'Esta funcionalidad está en desarrollo.',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  };

  const handlePGACCTablas = () => {
    Swal.fire({
      title: 'Funcionalidad en proceso',
      text: 'Esta funcionalidad está en desarrollo.',
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  };

  return (
    <div className="informes-container">
      <h2>Informes</h2>
      <div className="botones-informes">
        <button className="btn-informe" onClick={handleOcupTablas}>
          Ocupacional
        </button>
        <button className="btn-informe" onClick={handleAMBTablas}>
          Medioambiente
        </button>
        <button className="btn-informe" onClick={handlePGACCTablas}>
         Población general
        </button>
      </div>
    </div>
  );
}

export default Informes;
