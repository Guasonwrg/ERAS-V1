import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/SeleccionFormulacion.css';

function PesticideSelection() {
  const [pesticidas, setPesticidas] = useState([]);
  const [coadyuvantes, setCoadyuvantes] = useState([]);
  //const [selectedPesticida, setSelectedPesticida] = useState(null);
 //const [selectedCoadyuvante, setSelectedCoadyuvante] = useState(null);
 const [selectedPesticida, setSelectedPesticida] = useState(() => {
  const storedPesticida = localStorage.getItem('selectedPesticida');
  return storedPesticida ? JSON.parse(storedPesticida) : null;
});

const [selectedCoadyuvante, setSelectedCoadyuvante] = useState(() => {
  const storedCoadyuvante = localStorage.getItem('selectedCoadyuvante');
  return storedCoadyuvante ? JSON.parse(storedCoadyuvante) : null;
});

  const [showCoadyuvantes, setShowCoadyuvantes] = useState(false); 
  const [searchNombreCoadyuvante, setSearchNombreCoadyuvante] = useState('');
  const [searchIngredienteCoadyuvante, setSearchIngredienteCoadyuvante] = useState('');
  const [searchNombre, setSearchNombre] = useState('');
  const [searchIngrediente, setSearchIngrediente] = useState('');
  const [searchAptitud, setSearchAptitud] = useState('');
  const [casNumero, setCasNumero] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  //const selectedEscenario = location.state?.selectedEscenario;//recupero los datos des escenario desde el estado
  const [selectedEscenario, setSelectedEscenario] = useState(() => {
    return (
      location.state?.selectedEscenario ||
      JSON.parse(localStorage.getItem('selectedEscenario'))
    );
  });
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
    const storedPesticida = localStorage.getItem('selectedPesticida');
  const storedCas = localStorage.getItem('casNumero');

  if (storedPesticida) {
    setSelectedPesticida(JSON.parse(storedPesticida)); 
  }

  if (storedCas) {
    setCasNumero(storedCas); 
  }
  
    fetchPesticidas();
    fetchCoadyuvantes();
  }, []);

  // Manejar la selección de pesticida para obtener el N CAS
  const handleSelectPesticida = async (pesticida) => {
    setSelectedPesticida(pesticida);
    localStorage.setItem('selectedPesticida', JSON.stringify(pesticida)); 
  
    if (pesticida.Sustancia_Activa_1) {
      try {
        const response = await axios.get('http://localhost:5000/api/pesticidas/cas', {
          params: { ingrediente: pesticida.Sustancia_Activa_1 }
        });
        setCasNumero(response.data.CAS);
        localStorage.setItem('casNumero', response.data.CAS); 
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
    localStorage.setItem('selectedCoadyuvante', JSON.stringify(coadyuvante));
  };

  // Función para mostrar la lista de coadyuvantes
  const handleAgregarCoadyuvante = () => {
    setShowCoadyuvantes(true);
  };
  const limpiarPest = () => {
    if (localStorage.getItem("selectedPesticida")) {
      localStorage.removeItem("selectedPesticida");
    }
  
    setSelectedPesticida(null);
  };
  const limpiarCoad = () => {
    if (localStorage.getItem("selectedCoadyuvante")) {
      localStorage.removeItem("selectedCoadyuvante");
    }
  
    setSelectedCoadyuvante(null);
  };
  
  // Función para manejar la navegación hacia atrás
  const handleBack = () => {
    navigate(-1); 
  };

  // Navegar a la vista de Dilución con los datos de las pantallas anteriores (escenario y pesticida)
  const handleDilucion = () => {
    if (selectedPesticida && selectedEscenario) {
      // Guardar los datos en localStorage
      localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
      localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
      localStorage.setItem('selectedCoadyuvante', JSON.stringify(selectedCoadyuvante));
  
      // Navegar a la siguiente vista
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
    // Manejar búsqueda por aptitud (pesticidas)
    const handleSearchAptitud = (e) => {
      setSearchAptitud(e.target.value);
    };

  // Manejar búsqueda por nombre de coadyuvante
  const handleSearchNombreCoadyuvante = (e) => {
    setSearchNombreCoadyuvante(e.target.value);
  };

  // Manejar búsqueda por ingrediente de coadyuvante
  const handleSearchIngredienteCoadyuvante = (e) => {
    setSearchIngredienteCoadyuvante(e.target.value);
  };

  // Filtrar pesticidas por nombre comercial o ingrediente activo o aptitud
  const filteredPesticidas = pesticidas.filter((pesticida) =>
    (pesticida.Nombre_Comercial.toLowerCase().includes(searchNombre.toLowerCase())) &&
    (pesticida.Sustancia_Activa_1.toLowerCase().includes(searchIngrediente.toLowerCase())) &&
    (pesticida.Aptitud.toLowerCase().includes(searchAptitud.toLowerCase()))
  );

  // Filtrar coadyuvantes por nombre
  const filteredCoadyuvantes = coadyuvantes.filter((coadyuvante) =>
    (coadyuvante.Nombre_Comercial.toLowerCase().includes(searchNombreCoadyuvante.toLowerCase())) &&
    (coadyuvante.Activo_Contenido_1.toLocaleLowerCase().includes(searchIngredienteCoadyuvante.toLowerCase()))
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
        <div className="input-container">
          <input
            type="text"
            id="searchAptitud"
            placeholder=" "
            value={searchAptitud}
            onChange={handleSearchAptitud}
          />
          <label htmlFor="searchAptitud">Aptitud</label>
        </div>
      </div>


      <div className="form-section">
        <h3>Pesticida Seleccionado</h3>
          <div className="detalle-pesticida-container">
            {selectedPesticida ? (
              <div className="detalle-grid">
                <p><strong>Nº CAS:</strong> {casNumero || 'No disponible'}</p>
                <p><strong>Aptitud:</strong> {selectedPesticida.Aptitud || 'No disponible'}</p>
                <p><strong>Ingrediente Activo:</strong> {selectedPesticida.Sustancia_Activa_1 || 'No disponible'}</p>

                <p><strong>Nombre comercial de la formulación:</strong> {selectedPesticida.Nombre_Comercial || 'No disponible'}</p>
                <p><strong>Formulación:</strong> {selectedPesticida.Formulacion || 'No disponible'}</p>
                <p><strong>Nº Registro MGAP:</strong> {selectedPesticida.Registro || 'No disponible'}</p>

                <p><strong>Concentración de principio activo (p.a.):</strong> {selectedPesticida.Activo_Contenido_1} {selectedPesticida.Unidades_1 || 'No disponible'}</p>
                <p><strong>Rango de aplicación del producto:</strong> {selectedPesticida.Rango_aplicacion || 'No disponible'} {selectedPesticida.Unidades_ra || 'No disponible'}</p>
                <p><strong>Otros principios activos presentes en la formulación:</strong> {selectedPesticida.Sustancia_Activa_2 ? 'Sí' : 'No'}</p>
              </div>
            ) : (
              <p className="mensaje-seleccion">Seleccione un pesticida para ver los detalles</p>
            )}
          </div>
      </div>
      <button className="btn-limpiar" onClick={limpiarPest}>Limpiar Selección</button>

      {/* Botón para agregar coadyuvante */}
      <div className="coadyuvante-selection">
        <button onClick={handleAgregarCoadyuvante} className="add-coadyuvante-button">Agregar Coadyuvante</button>
      </div>

      {/* Mostrar tabla de coadyuvante seleccionado si existe */}
      {selectedCoadyuvante && (
        <div className="form-section">
          <h3>Coadyuvante Seleccionado</h3>
            <div className="coadyuvante-container">
              <div className="detalle-grid">
              <p><strong>Nombre:</strong> {selectedCoadyuvante.Nombre_Comercial || 'N/A'}</p>
              <p><strong>Ingrediente Activo:</strong> {selectedCoadyuvante.Sustancia_Activa_1 || 'N/A'}</p>
              <p><strong>Número CAS:</strong> {selectedCoadyuvante.Numero_CAS || 'N/A'}</p>
              <p><strong>Concentración o Fracción:</strong> {selectedCoadyuvante.Activo_Contenido_1 || 'N/A'} {selectedCoadyuvante.Unidades_1 || ''}</p>
              <p><strong>Observaciones:</strong> {selectedCoadyuvante.Observaciones || 'N/A'}</p>
              </div>
            </div>
        </div>
      )}
     

      {/* Mostrar lista de coadyuvantes con filtros si se ha presionado "Agregar Coadyuvante" */}
      {showCoadyuvantes && (
        <div className="coadyuvante-list-section">
          <h3>Seleccionar Coadyuvante</h3>
          <div className="filters">
          <div className="input-container">
            <input
              type="text"
               id="searchNombre"
               placeholder=" "
              value={searchNombreCoadyuvante}
              onChange={handleSearchNombreCoadyuvante}
            />
             <label htmlFor="searchNombre">Nombre Comercial</label>
             </div>
             <div className="input-container">
            <input
              type="text"
               id="SearchIngrediente"
               placeholder=" "
              value={searchIngredienteCoadyuvante}
              onChange={handleSearchIngredienteCoadyuvante}
            />
             <button className="btn-limpiar" onClick={limpiarCoad}>Limpiar Selección</button>
            <label htmlFor="SearchIngrediente">Ingrediente Activo</label>
            </div>
          </div>
          <table className="coadyuvante-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Registro</th>
                <th>Aptitud</th>
                <th>Ingrediente Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoadyuvantes.map((coadyuvante) => (
                <tr key={coadyuvante.PK_coadyuvante}>
                  <td>{coadyuvante.Nombre_Comercial}</td>
                  <td>{coadyuvante.Registro}</td>
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
              <th>Contenido Activo</th>
              <th>Aptitud</th>
              <th>Concentración</th>
              <th>Unidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPesticidas.map((pesticida) => (
              <tr key={pesticida.PK_pest} onClick={() => handleSelectPesticida(pesticida)}>
                <td>{pesticida.Nombre_Comercial}</td>
                <td>{pesticida.Registro}</td>
                <td>{pesticida.Sustancia_Activa_1}</td>
                <td>{pesticida.Aptitud}</td>
                <td>{pesticida.Activo_Contenido_1}</td>
                <td>{pesticida.Unidades_1}</td>
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
