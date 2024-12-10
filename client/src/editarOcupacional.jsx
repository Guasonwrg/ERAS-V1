import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/EditarOcupacional.css';

function VerOcupacional() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_escenario: '',
    actividad_trabajador: '',
    categoria_objetivo: '',
    nivel_epp_ec: '',
    tasa_aplicacion: '',
    unidad_tasa_aplicacion: '',
    area_tratada: '',
    unidad_area: '',
    ari: '',
    hi: '',
    hi_cancer: '',
    escenario_resumido: '',
    id_usuario: '',
    nombre_usuario: '',
    apellido_usuario: '',
    fecha_hora: '',
  });

  // Cargar los datos del informe al montar el componente
  useEffect(() => {
    const fetchInformeData = async () => {
      try {
        const response = await axios.get(`https://eras-latitud-demo.com:5000/api/informes-ocupacional/${id}`);
        console.log('Datos recibidos:', response.data);
        setFormData(response.data); // Cargar los datos del informe en el estado
      } catch (error) {
        console.error('Error al cargar los datos del informe:', error);
      }
    };

    fetchInformeData();
  }, [id]);

  const handleVolver = () => {
    navigate('/informes-ocupacional'); // Regresa a la lista de informes
  };

  return (
    <div className="editar-ocupacional-body">
      <div className="form-container">
        <h1>Ver Informe Ocupacional</h1>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>ID Escenario</label>
              <input
                type="text"
                value={formData.id_escenario}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Actividad del Trabajador</label>
              <input
                type="text"
                value={formData.actividad_trabajador}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Categoría Objetivo</label>
              <input
                type="text"
                value={formData.categoria_objetivo}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Nivel EPP/EC</label>
              <input
                type="text"
                value={formData.nivel_epp_ec}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Tasa de Aplicación</label>
              <input
                type="number"
                step="0.00001"
                value={formData.tasa_aplicacion}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Unidad de Tasa de Aplicación</label>
              <input
                type="text"
                value={formData.unidad_tasa_aplicacion}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Área Tratada</label>
              <input
                type="number"
                step="0.01"
                value={formData.area_tratada}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Unidad de Área</label>
              <input
                type="text"
                value={formData.unidad_area}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>ARI</label>
              <input
                type="number"
                step="0.00001"
                value={formData.ari}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>HI</label>
              <input
                type="number"
                step="0.00001"
                value={formData.hi}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>HI Cáncer</label>
              <input
                type="number"
                step="0.00001"
                value={formData.hi_cancer}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Escenario Resumido</label>
              <textarea
                value={formData.escenario_resumido}
                readOnly
              />
            </div>
          </div>
          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerOcupacional;
