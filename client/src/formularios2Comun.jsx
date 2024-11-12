import React from 'react';
import '../src/Styles/Formularios2Comun.css'; // Asegúrate de que la ruta sea correcta

function Formularios2Comun() {
  return (
    <div className="formularios2-body">
      <div className="formularios2-options">
        <div className="option-item">Seleccionar escenario</div>
        <div className="option-item">Formulación</div>
        <div className="option-item">Tasas Disolución</div>
        <div className="option-item">EPP Act. Diaria</div>
        <div className="option-item">Escenario Ambiental</div>
      </div>
      <div className="formularios2-data">
        <div className="data-item">Plantación Forestal</div>
        <div className="data-item">50</div>
        <div className="data-item">0.006</div>
        <div className="data-item">DLC2/G + No-R</div>
        <div className="data-item">Argisoles - Planosoles</div>
      </div>
      <div className="formularios2-title">FORMULARIOS</div>
      <div className="save-button">
        <div>Guardar</div>
      </div>
    </div>
  );
}

export default Formularios2Comun;

