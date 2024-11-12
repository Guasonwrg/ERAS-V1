import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/SeleccionFormulacion.css';

function PesticideSelection() {
  const [pesticidas, setPesticidas] = useState([]);
  const [coadyuvantes, setCoadyuvantes] = useState([]);
  const [selectedPesticida, setSelectedPesticida] = useState(null);
  const [selectedCoadyuvante, setSelectedCoadyuvante] = useState(null);
  const [showCoadyuvantes, setShowCoadyuvantes] = useState(false); // Estado para mostrar la lista de coadyuvantes
  const [searchNombreCoadyuvante, setSearchNombreCoadyuvante] = useState('');
  const [searchIngredienteCoadyuvante, setSearchIngredienteCoadyuvante] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchIngrediente, setSearchIngrediente] = useState('');
  const [casNumero, setCasNumero] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const selectedEscenario = location.state?.selectedEscenario;//recupero los datos des escenario desde el estado

  // Obtener los datos de la tabla mgap_pest y coadyuvantes
  useEffect(() => {
    const fetchPesticidas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pesticidas');
        setPesticidas(response.data);
      } catch (error) {
        console.error('Error al cargar los pesticidas:', error);
      }
    };
    const fetchCoadyuvantes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coadyuvantes');
        setCoadyuvantes(response.data);
      } catch (error) {
        console.error('Error al cargar los coadyuvantes:', error);
      }
    };
  
    fetchPesticidas();
    fetchCoadyuvantes();
  }, []);

  // Manejar la selección de pesticida para obtener el N CAS
  const handleSelectPesticida = async (pesticida) => {
    setSelectedPesticida(pesticida);

    if (pesticida.Sustancia_Activa_1) {
      try {
        const response = await axios.get('http://localhost:5000/api/pesticidas/cas', {
          params: { ingrediente: pesticida.Sustancia_Activa_1 }
        });
        setCasNumero(response.data.CAS);
      } catch (error) {
        console.error('Error al obtener el N° CAS:', error);
      }
    } else {
      console.error('No se encontró la sustancia activa en el pesticida seleccionado.');
    }
  };

  // Manejar la selección de coadyuvante
  const handleSelectCoadyuvante = (coadyuvante) => {
    setSelectedCoadyuvante(coadyuvante);
    setShowCoadyuvantes(false); 
  };

  // Función para mostrar la lista de coadyuvantes
  const handleAgregarCoadyuvante = () => {
    setShowCoadyuvantes(true);
  };

  // Función para manejar la navegación hacia atrás
  const handleBack = () => {
    navigate(-1); 
  };

  // Navegar a la vista de Dilución con los datos de las pantallas anteriores (escenario y pesticida)
  const handleDilucion = () => {
    if (selectedPesticida && selectedEscenario) {
      navigate(`/dilucion`, { state: { selectedPesticida, selectedEscenario, selectedCoadyuvante } });
    } else {
      setError('Por favor, selecciona un pesticida para continuar.');
    }
  };

  // Manejar búsqueda por nombre comercial (pesticidas)
  const handleSearchNombre = (e) => {
    setSearchNombre(e.target.value);
  };

  // Manejar búsqueda por ingrediente activo (pesticidas)
  const handleSearchIngrediente = (e) => {
    setSearchIngrediente(e.target.value);
  };

  // Manejar búsqueda por nombre de coadyuvante
  const handleSearchNombreCoadyuvante = (e) => {
    setSearchNombreCoadyuvante(e.target.value);
  };

  // Manejar búsqueda por ingrediente de coadyuvante
 // const handleSearchIngredienteCoadyuvante = (e) => {
   // setSearchIngredienteCoadyuvante(e.target.value);
 // };

  // Filtrar pesticidas por nombre comercial o ingrediente activo
  const filteredPesticidas = pesticidas.filter((pesticida) =>
    (pesticida.Nombre_Comercial.toLowerCase().includes(searchNombre.toLowerCase())) &&
    (pesticida.Sustancia_Activa_1.toLowerCase().includes(searchIngrediente.toLowerCase()))
  );

  // Filtrar coadyuvantes por nombre
  const filteredCoadyuvantes = coadyuvantes.filter((coadyuvante) =>
    coadyuvante.Nombre_Comercial.toLowerCase().includes(searchNombreCoadyuvante.toLowerCase())
  );

  return (
    <div className="pesticide-selection-container">
      <h2>Selección de Pesticida - Formulación, Coadyuvante, Impureza o Metabolito</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="formulacion-button-container">
        <button onClick={handleBack} className="back-button">Atrás</button>
        <button className="formulacion-button" onClick={handleDilucion}>Dilución</button>
      </div>

      <div className="filters">
        <div className="input-container">
          <input
            type="text"
            id="searchNombre"
            placeholder=" "
            value={searchNombre}
            onChange={handleSearchNombre}
          />
          <label htmlFor="searchNombre">Nombre Comercial</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="searchIngrediente"
            placeholder=" "
            value={searchIngrediente}
            onChange={handleSearchIngrediente}
          />
          <label htmlFor="searchIngrediente">Ingrediente Activo</label>
        </div>
      </div>


      <div className="form-section">
        <h3>Pesticida Seleccionado</h3>
        <table>
          <tbody>
            {selectedPesticida ? (
              <>
                <tr>
                  <td><strong>Nº CAS: {casNumero || 'No disponible'}</strong></td>
                  <td><strong>Aptitud: {selectedPesticida.Aptitud}</strong></td>
                  <td><strong>Ingrediente Activo: {selectedPesticida.Sustancia_Activa_1}</strong></td>
                </tr>
                <tr>
                  <td><strong>Nombre comercial de la formulación: {selectedPesticida.Nombre_Comercial}</strong></td>
                  <td><strong>Formulación: {selectedPesticida.Formulacion}</strong></td>
                  <td><strong>Nº Registro MGAP: {selectedPesticida.Registro}</strong></td>
                </tr>
                <tr>
                  <td><strong>Concentración de principio activo (p.a.): {selectedPesticida.Activo_Contenido_1} {selectedPesticida.Unidades_1}</strong></td>
                  <td><strong>Rango de aplicación del producto: {selectedPesticida.Rango_aplicacion}  {selectedPesticida.Unidades_ra}</strong></td>
                  <td><strong>Otros principios activos presentes en la formulación: {selectedPesticida.Sustancia_Activa_2 ? 'Sí' : 'No'}</strong></td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan="4">Seleccione un pesticida para ver los detalles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón para agregar coadyuvante */}
      <div className="coadyuvante-selection">
        <button onClick={handleAgregarCoadyuvante} className="add-coadyuvante-button">Agregar Coadyuvante</button>
      </div>

      {/* Mostrar tabla de coadyuvante seleccionado si existe */}
      {selectedCoadyuvante && (
        <div className="form-section">
          <h3>Coadyuvante Seleccionado</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Nombre: {selectedCoadyuvante.Nombre_Comercial}</strong></td>
                <td><strong>Ingrediente Activo: {selectedCoadyuvante.Sustancia_Activa_1}</strong></td>
                <td><strong>Número CAS: {selectedCoadyuvante.Numero_CAS}</strong></td>
              </tr>
              <tr>
                <td><strong>Concentración o Fracción: {selectedCoadyuvante.Activo_Contenido_1} {selectedCoadyuvante.Unidades_1}</strong></td>
                <td><strong>Observaciones: </strong></td><td colSpan="3"><strong>{selectedCoadyuvante.Observaciones || 'N/A'}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Mostrar lista de coadyuvantes con filtros si se ha presionado "Agregar Coadyuvante" */}
      {showCoadyuvantes && (
        <div className="coadyuvante-list-section">
          <h3>Seleccionar Coadyuvante</h3>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar por Nombre"
              value={searchNombreCoadyuvante}
              onChange={handleSearchNombreCoadyuvante}
            />
            <input
              type="text"
              placeholder="Buscar por Ingrediente"
              value={searchIngredienteCoadyuvante}
              //onChange={handleSearchIngredienteCoadyuvante}
            />
          </div>
          <table className="coadyuvante-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Aptitud</th>
                <th>Sustancia Activa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoadyuvantes.map((coadyuvante) => (
                <tr key={coadyuvante.PK_coadyuvante}>
                  <td>{coadyuvante.Nombre_Comercial}</td>
                  <td>{coadyuvante.Aptitud}</td>
                  <td>{coadyuvante.Sustancia_Activa_1}</td>
                  <td>
                    <button onClick={() => handleSelectCoadyuvante(coadyuvante)}>Seleccionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla de selección de pesticidas */}
      <div className="table-section">
        <h3>Seleccionar Pesticida</h3>
        <table className="pesticide-table">
          <thead>
            <tr>
              <th>Pesticida</th>
              <th>Registro</th>
              <th>Concentración</th>
              <th>Unidades</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPesticidas.map((pesticida) => (
              <tr key={pesticida.PK_pest} onClick={() => handleSelectPesticida(pesticida)}>
                <td>{pesticida.Nombre_Comercial}</td>
                <td>{pesticida.Registro}</td>
                <td>{pesticida.Activo_Contenido_1}</td>
                <td>{pesticida.Unidades_1}</td>
                <td>{pesticida.Observaciones}</td>
                <td>
                  <button onClick={() => handleSelectPesticida(pesticida)}>Seleccionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PesticideSelection;
