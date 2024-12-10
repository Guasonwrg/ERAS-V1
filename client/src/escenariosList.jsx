import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/EscenariosList.css';

function EscenariosList() {
  const [escenarios, setEscenarios] = useState([]);
  const [filteredEscenarios, setFilteredEscenarios] = useState([]);
 // const [selectedEscenario, setSelectedEscenario] = useState(null);
 const [selectedEscenario, setSelectedEscenario] = useState(() => {
  const storedEscenario = localStorage.getItem('selectedEscenario');
  return storedEscenario ? JSON.parse(storedEscenario) : null;
});

  const [searchId, setSearchId] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');
  const [searchFormulacion, setSearchFormulacion] = useState('');
  const [searchAplicacion, setSearchAplicacion] = useState('');
  const [localState, setLocalState] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Obtener los escenarios desde el backend al cargar la vista
  useEffect(() => {
    const fetchEscenarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/escenarios');
        setEscenarios(response.data);
        setFilteredEscenarios(response.data); 
      } catch (error) {
        //console.error('Error al obtener los escenarios:', error);
        setError('Hubo un error al cargar los escenarios.'); 
      }
    };
    fetchEscenarios();
  }, []);

  // Manejar selección de un escenario
  const handleSelect = (escenario) => {
    setSelectedEscenario(escenario);
    localStorage.setItem('selectedEscenario', JSON.stringify(escenario));
  };
  
 // Manejar filtro por ID
const handleSearchId = (e) => {
  const id = e.target.value;
  setSearchId(id);
  filtrarEscenarios(id, searchCategoria, searchFormulacion, searchAplicacion);
};

// Manejar filtro por Categoría
const handleSearchCategoria = (e) => {
  const categoria = e.target.value;
  setSearchCategoria(categoria);
  filtrarEscenarios(searchId, categoria, searchFormulacion, searchAplicacion);
};

// Manejar filtro por Formulación
const handleSearchFormulacion = (e) => {
  const formulacion = e.target.value;
  setSearchFormulacion(formulacion);
  filtrarEscenarios(searchId, searchCategoria, formulacion, searchAplicacion);
};

// Manejar filtro por Aplicación
const handleSearchAplicacion = (e) => {
  const aplicacion = e.target.value;
  setSearchAplicacion(aplicacion);
  filtrarEscenarios(searchId, searchCategoria, searchFormulacion, aplicacion);
};

// Filtrar escenarios según ID, Categoría, Formulación y Aplicación
const filtrarEscenarios = (id, categoria, formulacion, aplicacion) => {
  const filtrados = escenarios.filter((escenario) =>
    (id === '' || escenario.ID_Escenario.toLowerCase().includes(id.toLowerCase())) &&
    (categoria === '' || escenario.Categoria_objetivo.toLowerCase().includes(categoria.toLowerCase())) &&
    (formulacion === '' || escenario.Formulacion.toLowerCase().includes(formulacion.toLowerCase())) &&
    (aplicacion === '' || escenario.Equipo_aplicacion.toLowerCase().includes(aplicacion.toLowerCase()))
  );
  setFilteredEscenarios(filtrados);
};

const limpiar = () => {
  if (localStorage.getItem("selectedEscenario")) {
    localStorage.removeItem("selectedEscenario");
  }

  setSelectedEscenario(null);
};



  // Función para manejar la navegación hacia atrás
  const handleBack = () => {
    navigate(-1); 
  };
  //navega a seleccionarFormulacion pasando en el estado los datos del escenario
  const handleFormulacion = () => {
    if (selectedEscenario) {
      // Guardar en localStorage para persistencia
      localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
  
      // Navegar pasando los datos por location.state
      navigate(`/pesticidas`, { state: { selectedEscenario } });
    } else {
      setError('Por favor, selecciona un escenario antes de continuar.');
    }
  };
  
  return (
    <div className="escenarios-container">
      <h2>Lista de Escenarios</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="formulacion-button-container">
        <button onClick={handleBack} className="back-button">
          Atrás
        </button>
        <button className="formulacion-button" onClick={handleFormulacion}>
          Formulación
        </button>
      </div>

      <div className="filters">
        <div className="input-container">
          <input
            type="text"
            id="searchId"
            placeholder=" "
            value={searchId}
            onChange={handleSearchId}
          />
          <label htmlFor="searchId">ID Escenario</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="searchCategoria"
            placeholder=" "
            value={searchCategoria}
            onChange={handleSearchCategoria}
          />
          <label htmlFor="searchCategoria">Categoría Objetivo</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="searchFormulacion"
            placeholder=" "
            value={searchFormulacion}
            onChange={handleSearchFormulacion}
          />
          <label htmlFor="searchFormulacion">Formulación</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="searchAplicacion"
            placeholder=" "
            value={searchAplicacion}
            onChange={handleSearchAplicacion}
          />
          <label htmlFor="searchAplicacion"> Equipo Aplicacion</label>
        </div>
      </div>

      {selectedEscenario && (
        <div className="selected-escenario">
          <h3>Escenario Seleccionado</h3>
          <p><strong>ID:</strong> {selectedEscenario.ID_Escenario}</p><p><strong>Categoría:</strong> {selectedEscenario.Categoria_objetivo}</p>
          <p><strong>Formulación:</strong> {selectedEscenario.Formulacion}</p><p><strong>Equipo de Aplicación:</strong> {selectedEscenario.Equipo_aplicacion}</p>
          <p><strong>Tipo de Aplicación:</strong> {selectedEscenario.Tipo_aplicacion}</p><p><strong>Actividad del Trabajador:</strong> {selectedEscenario.Actividad_trabajador}</p>
          <p><strong>Unidades Tasa de Aplicación 1:</strong> {selectedEscenario.Unidades_tasa_aplicacion_1}</p><p><strong>Aux Conteo Ud por Clase Tasa:</strong> {selectedEscenario.Aux_conteo_ud_por_clase_tasa}</p>
          <p><strong>Unidades Tasa de Aplicación 2:</strong> {selectedEscenario.Unidades_tasa_aplicacion_2}</p><p><strong>Cantidad por defecto:</strong> {selectedEscenario.Cantidad || 'No aplica'}</p>
          <p><strong>Código Unificado Actividad Diaria:</strong> {selectedEscenario.Codigo_unificado_actividad_diaria}</p><p><strong>EC Opción Protección:</strong> {selectedEscenario.EC_opcion_proteccion}</p>
          <p><strong>Código Tamaños Gota Deriva:</strong> {selectedEscenario.Codigo_tamanos_gota_deriva}</p><p><strong>Contacto con Abeja Seguro:</strong> {selectedEscenario.Contacto_abeja_seguro}</p>  
        </div>
      )}
      <button className="btn-limpiar" onClick={limpiar}>Limpiar Selección</button>

      <table>
        <thead>
          <tr>
            <th>ID Escenario</th>
            <th>Categoría Objetivo</th>
            <th>Formulación</th>
            <th>Equipo Aplicación</th>
            <th>Tipo Aplicación</th>
            <th>Actividad Trabajador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEscenarios.map((escenario) => (
            <tr key={escenario.PK_Escenario}>
              <td>{escenario.ID_Escenario}</td>
              <td>{escenario.Categoria_objetivo}</td>
              <td>{escenario.Formulacion}</td>
              <td>{escenario.Equipo_aplicacion}</td>
              <td>{escenario.Tipo_aplicacion}</td>
              <td>{escenario.Actividad_trabajador}</td>
              <td>
                <button onClick={() => handleSelect(escenario)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EscenariosList;

