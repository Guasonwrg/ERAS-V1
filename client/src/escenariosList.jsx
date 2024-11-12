import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/EscenariosList.css';

function EscenariosList() {
  const [escenarios, setEscenarios] = useState([]);
  const [filteredEscenarios, setFilteredEscenarios] = useState([]);
  const [selectedEscenario, setSelectedEscenario] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchCategoria, setSearchCategoria] = useState('');
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
        console.error('Error al obtener los escenarios:', error);
        setError('Hubo un error al cargar los escenarios.'); 
      }
    };
    fetchEscenarios();
  }, []);

  // Manejar selección de un escenario
  const handleSelect = (escenario) => {
    setSelectedEscenario(escenario); 
  };

  // Manejar filtro por ID
  const handleSearchId = (e) => {
    setSearchId(e.target.value);
    filtrarEscenarios(e.target.value, searchCategoria);
  };

  // Manejar filtro por Categoría
  const handleSearchCategoria = (e) => {
    setSearchCategoria(e.target.value);
    filtrarEscenarios(searchId, e.target.value);
  };

  // Filtrar escenarios según ID y Categoría
  const filtrarEscenarios = (id, categoria) => {
    const filtrados = escenarios.filter((escenario) =>
      (id === '' || escenario.ID_Escenario.toLowerCase().includes(id.toLowerCase())) &&
      (categoria === '' || escenario.Categoria_objetivo.toLowerCase().includes(categoria.toLowerCase()))
    );
    setFilteredEscenarios(filtrados);
  };

  // Función para manejar la navegación hacia atrás
  const handleBack = () => {
    navigate(-1); 
  };
  //navega a seleccionarFormulacion pasando en el estado los datos del escenario
  const handleFormulacion = () => {
    if (selectedEscenario) {
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
      </div>

      {selectedEscenario && (
        <div className="selected-escenario">
          <h3>Escenario Seleccionado</h3>
          <p>ID: {selectedEscenario.ID_Escenario}</p><p>Categoría: {selectedEscenario.Categoria_objetivo}</p>
          <p>Formulación: {selectedEscenario.Formulacion}</p><p>Equipo de Aplicación: {selectedEscenario.Equipo_aplicacion}</p>
          <p>Tipo de Aplicación: {selectedEscenario.Tipo_aplicacion}</p><p>Actividad del Trabajador: {selectedEscenario.Actividad_trabajador}</p>
          <p>Unidades Tasa de Aplicación 1: {selectedEscenario.Unidades_tasa_aplicacion_1}</p><p>Aux Conteo Ud por Clase Tasa: {selectedEscenario.Aux_conteo_ud_por_clase_tasa}</p>
          <p>Unidades Tasa de Aplicación 2: {selectedEscenario.Unidades_tasa_aplicacion_2}</p><p>Cantidad por defecto: {selectedEscenario.Cantidad || 'No aplica'}</p>
          <p>Código Unificado Actividad Diaria: {selectedEscenario.Codigo_unificado_actividad_diaria}</p><p>EC Opción Protección: {selectedEscenario.EC_opcion_proteccion}</p>
          <p>Código Tamaños Gota Deriva: {selectedEscenario.Codigo_tamanos_gota_deriva}</p><p>Contacto con Abeja Seguro: {selectedEscenario.Contacto_abeja_seguro}</p>  
        </div>
      )}
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

