import React from 'react';
import '../src/Styles/FormulariosAdmin.css'; // Asegúrate de que la ruta sea correcta

function FormulariosAdmin() {
  return (
    <div className="formularios-admin-body">
      <div className="formularios-admin-options">
        <div className="option-item">Seleccionar escenario</div>
        <div className="option-item">Formulación</div>
        <div className="option-item">Tasas Disolución</div>
        <div className="option-item">EPP Act. Diaria</div>
        <div className="option-item">Escenario Ambiental</div>
      </div>
      <div className="formularios-admin-title">FORMULARIOS</div>
      <div className="save-button">
        <div>Guardar</div>
      </div>
    </div>
  );
}

export default FormulariosAdmin;

