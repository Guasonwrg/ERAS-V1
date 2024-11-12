import React from 'react';
import { useState, useLocation, useNavigate } from 'react-router-dom';
import './Styles/Informes.css';

function Informes() {
  const navigate = useNavigate();
  const location = useLocation();
  

  const selectedEscenario = location.state?.selectedEscenario;
  const pesticidaSeleccionado = location.state?.selectedPesticida;
  const selectedCoadyuvante = location.state?.selectedCoadyuvante;
  const selectedTasaDilucion = location.state?.selectedTasaDilucion;
  const selectedActividadDiaria = location.state?.selectedActividadDiaria;

  console.log(selectedActividadDiaria);
  // Funciones para manejar la redirección de cada botón
  const handleOcupTablas = () => {
    navigate('/ocup-tablas',{
      state: { selectedTasaDilucion, selectedEscenario, pesticidaSeleccionado, selectedCoadyuvante, selectedActividadDiaria },
    });
  };

  const handleAMBTablas = () => {
    navigate('/amb-tablas');
  };

  const handlePGACCTablas = () => {
    navigate('/pg-acc-tablas');
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
