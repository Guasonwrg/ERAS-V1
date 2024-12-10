import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/ActividadDiaria.css';

function ActividadDiaria() {
    const navigate = useNavigate();
    const location = useLocation();
    const [datosAuxActividadDiaria, setDatosAuxActividadDiaria] = useState(null);
    const [datosGradoProteccion, setDatosGradoProteccion] = useState(null);
    const [error, setError] = useState(''); 
  const [valorReal, setValorReal] = useState(() => {
      return localStorage.getItem('valorReal') || '';
  });
  const [diasManipulacion, setDiasManipulacion] = useState(() => {
      return localStorage.getItem('diasManipulacion') || '';
  });
  const [aniosManipulacion, setAniosManipulacion] = useState(() => {
      return localStorage.getItem('aniosManipulacion') || '';
  });
  const [porcentajeAnios, setPorcentajeAnios] = useState(() => {
      return localStorage.getItem('porcentajeAnios') || '';
  });
  const [contactoDermico, setContactoDermico] = useState(() => {
      return localStorage.getItem('contactoDermico') || '';
  });
  const [gradoProteccion, setGradoProteccion] = useState(() => {
      return localStorage.getItem('gradoProteccion') || '';
  });
  const [mensajeProteccion, setMensajeProteccion] = useState(() => {
    return localStorage.getItem('mensajeProteccion') || '';
  });
  const [codigoIdentificacion, setCodigoIdentificacion] = useState(() => {
      return localStorage.getItem('codigoIdentificacion') || '';
  });

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

// Repetir para los demás datos como selectedPesticida, selectedCoadyuvante, etc.

  
    // Datos recibidos de las vistas anteriores
   // const selectedEscenario = location.state?.selectedEscenario;
    //const selectedPesticida = location.state?.selectedPesticida;
    //const selectedCoadyuvante = location.state?.selectedCoadyuvante;
    //const selectedTasaDilucion = location.state?.selectedTasaDilucion;

    //console.log(selectedTasaDilucion);
    const obtenerDatosAuxActividadDiaria = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/actividad-diaria', {
          params: {codigoUnificado: selectedEscenario.Codigo_unificado_actividad_diaria }
        });
        const datos = response.data;
  
        // Guardar los datos obtenidos en el estado
        if (datos) {
          setDatosAuxActividadDiaria(datos);
        } else {
          setError('No se encontraron datos para el código proporcionado.');
        }
      } catch (error) {
        //console.error('Error al obtener los datos de la API:', error);
        setError('Hubo un error al cargar los datos de Aux Actividad Diaria.');
      }
    };
    const getGradoProteccion = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grado-proteccion');
      
      const datosGradoProteccion = response.data;
      if (datosGradoProteccion){
        setDatosGradoProteccion(datosGradoProteccion);
      } else {
        setError('Erro al obtener los datos de grado de protección.')
      } 
    } catch (error) {
      //console.error('Error al cargar datos de grado de protección:', error);
    } 
  };
   
    // Llamar a la API cuando el componente se monte
    useEffect(() => {
      if (selectedEscenario?.Codigo_unificado_actividad_diaria) {
        obtenerDatosAuxActividadDiaria();
        getGradoProteccion()
      }
    }, [selectedEscenario]);

    useEffect(() => {
      localStorage.setItem('valorReal', valorReal);
      localStorage.setItem('diasManipulacion', diasManipulacion);
      localStorage.setItem('aniosManipulacion', aniosManipulacion);
      localStorage.setItem('porcentajeAnios', porcentajeAnios);
      localStorage.setItem('contactoDermico', contactoDermico);
      localStorage.setItem('gradoProteccion', gradoProteccion);
      localStorage.setItem('mensajeProteccion', mensajeProteccion);
      localStorage.setItem('codigoIdentificacion', codigoIdentificacion);
  }, [valorReal, diasManipulacion, aniosManipulacion, porcentajeAnios, contactoDermico, gradoProteccion, mensajeProteccion, codigoIdentificacion,]);
  
   

    const handleValorReal = (e) => setValorReal(e.target.value);
    const handleDiasManipulacion = (e) => setDiasManipulacion(e.target.value);
    const handleAniosManipulacion = (e) => setAniosManipulacion(e.target.value);
    const handlePorcentajeAnios = (e) => setPorcentajeAnios(e.target.value);
    const handleContactoDermico = (e) => {setContactoDermico(e.target.value)};
    const handleChange = (e) => {
    const selectedValue = e.target.value;
      setGradoProteccion(selectedValue); 
      const { mensaje, codigo } = actualizarMensaje(selectedValue);
      setMensajeProteccion(mensaje);
      setCodigoIdentificacion(codigo);
    };
 

    const actualizarMensaje = (value) => {
      let mensaje = '';
      let codigo = '';
  
      if (selectedEscenario?.EC_opcion_proteccion === 'S') {
        const proteccion = datosGradoProteccion.find((p) => p.grado === value);
        mensaje = proteccion ? proteccion.descripcion : 'Protección no definida';
        codigo = proteccion?.codigo_identificacion || '';
      } else if (selectedEscenario?.EC_opcion_proteccion === 'N') {
        if (value === 'Cabina Cerrada') {
          mensaje = 'SELECCIONAR OTRA OPCIÓN: la cabina cerrada no es aplicable para este escenario de equipo y tipo de aplicación';
        } else {
          const proteccion = datosGradoProteccion.find((p) => p.grado === value);
          mensaje = proteccion ? proteccion.descripcion : 'Protección no definida';
        }
      } else if (selectedEscenario?.EC_opcion_proteccion === 'UO') {
        mensaje =
          value === 'Cabina Cerrada'
            ? 'Cabina cerrada para el operario es la única opción de protección para este escenario de equipo y tipo de aplicación'
            : 'SELECCIONAR OPCIÓN CABINA CERRADA: es la única opción de protección para este escenario de equipo y tipo de aplicación';
      } else {
        mensaje = 'NO HAY ESCENARIO SELECCIONADO';
      }
  
      setMensajeProteccion(mensaje); 
      setCodigoIdentificacion(codigo);

      return {mensaje, codigo};
    };

    const handleBack = () => {
        navigate(-1); 
      };
  
    // Función para navegar a la vista de riesgo
    const handleRiesgo = () => {
      // Preparar los datos necesarios
      const selectedActividadDiaria = {
        valorReal,
        diasManipulacion,
        aniosManipulacion,
        porcentajeAnios,
        contactoDermico,
        gradoProteccion,
        mensajeProteccion,
        codigoIdentificacion,
        datosAuxActividadDiaria,
        datosGradoProteccion,
      };
    
      // Guardar en localStorage para persistencia
      localStorage.setItem('selectedActividadDiaria', JSON.stringify(selectedActividadDiaria));
      localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
      localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
      localStorage.setItem('selectedCoadyuvante', JSON.stringify(selectedCoadyuvante));
      localStorage.setItem('selectedTasaDilucion', JSON.stringify(selectedTasaDilucion));
    
      // Navegar pasando datos con location.state
      navigate('/riesgo', {
        state: {
          selectedActividadDiaria,
          selectedEscenario,
          selectedPesticida,
          selectedCoadyuvante,
          selectedTasaDilucion,
        },
      });
    };
    
  return (
    <div className="actividad-diaria-container">
      <h2>PARÁMETROS PARA CÁLCULO DE EXPOSICIÓN DEL TRABAJADOR</h2>
         {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="actividad-diaria-button-container">
            <button onClick={handleBack} className="back-button">
                Atrás
            </button>
            <button className="actividad-diaria-button"  onClick={handleRiesgo}>
            Cálculo Riesgo
            </button>
        </div>
        <div className="actividad-diaria">
          <h3>Actividad Diaria</h3>
          <div className="grid-container-diaria">
            <div className="grid-header-diaria">
              <strong>Códigos de escenario</strong>
            </div>
            <div className="grid-header-diaria">
              <strong>Combinación formulación con equipo y tipo de aplicación</strong>
            </div>
            <div className="grid-header-diaria">
              <strong>Tipo de producción</strong>
            </div>
            <div className="grid-header-diaria">
              <strong>Actividad del trabajador</strong>
            </div>

            <div className="grid-item-diaria">
              {`${selectedEscenario?.ID_Escenario} - ${datosAuxActividadDiaria?.Codigo_Unificado}`}
            </div>
            <div className="grid-item-diaria">{selectedEscenario.Escenario_resumido_textual}</div>
            <div className="grid-item-diaria">{selectedEscenario.Categoria_objetivo}</div>
            <div className="grid-item-diaria">{selectedEscenario.Actividad_trabajador}</div>
          </div>
        </div>
        <div className="actividad-diaria-tratada">
          <h3>Actividad Diaria - Tratada</h3>
          <div className="grid-container-diaria-tratada">

            <div className="grid-header-diaria-tratada">Cantidad manipulada o área tratada por día</div>
            <div className="grid-header-diaria-tratada">Unidades</div>
            <div className="grid-header-diaria-tratada">Valor</div>

            <div className="grid-item-diaria-tratada">Cantidad definida por defecto por U.S. EPA</div>
            <div className="grid-item-diaria-tratada">{datosAuxActividadDiaria?.Unidades_Reales}</div>
            <div className="grid-item-diaria-tratada">{datosAuxActividadDiaria?.Valor_Convertido}</div>

            <div className="grid-item-diaria-tratada">Valor real empleado en el predio evaluado</div>
            <div className="grid-item-diaria-tratada">{datosAuxActividadDiaria?.Unidades_Reales}</div>
            <div className="grid-item-diaria-tratada">
              <input type="number" name="actividadDiaria" value={valorReal} onChange={handleValorReal}className="form-input"/>
            </div>
          </div>
        </div>

        <div className="actividad-diaria-exposicion">
          <h3>Años de trabajo manipulando plaguicidas y número de aplicaciones por año</h3>
          <div className="grid-container-diaria-exposicion">

            <div className="grid-header-diaria-exposicion">Exposición</div>
            <div className="grid-header-diaria-exposicion">Parámetro</div>
            <div className="grid-header-diaria-exposicion">Unidades</div>
            <div className="grid-header-diaria-exposicion">Valor</div>

            <div className="grid-item-diaria-exposicion">Dérmica y por inhalación</div>
            <div className="grid-item-diaria-exposicion">Días por año manipulando el plaguicida</div>
            <div className="grid-item-diaria-exposicion">d/año</div>
            <div className="grid-item-diaria-exposicion">
              <input type="number"name="diasAnio"value={diasManipulacion}onChange={handleDiasManipulacion}className="form-input"/>
            </div>

            <div className="grid-item-diaria-exposicion"></div>
            <div className="grid-item-diaria-exposicion">Años de trabajo manipulando plaguicidas</div>
            <div className="grid-item-diaria-exposicion">años</div>
            <div className="grid-item-diaria-exposicion">
              <input type="number"name="aniosTrabajo"value={aniosManipulacion}onChange={handleAniosManipulacion}className="form-input"/>
            </div>

            <div className="grid-item-diaria-exposicion">Ingesta</div>
            <div className="grid-item-diaria-exposicion">% de años de la vida expuestos a ingesta contaminada</div>
            <div className="grid-item-diaria-exposicion">%</div>
            <div className="grid-item-diaria-exposicion">
              <input type="number"name="porcentajeIngesta"value={porcentajeAnios}onChange={handlePorcentajeAnios}className="form-input"/>
            </div>
            <div className="grid-item-diaria-exposicion">Dérmica accidental</div>
            <div className="grid-item-diaria-exposicion">Contacto con producto comercial o solución diluida (caldo)</div>
            <div className="grid-item-diaria-exposicion"></div>
            <div className="grid-item-diaria-exposicion">
              <select name="contactoDermico"value={contactoDermico}onChange={handleContactoDermico}className="form-input">
                <option value="Caldo">Caldo</option>
                <option value="Concentrado">Concentrado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="epps-medidas">
          <h3>Equipos de protección personal (EPPs) o medidas de control por ingeniería (EC)</h3>
          <div className="grid-container-epps">
            <div className="grid-header-epps">Grado de protección</div>
            <div className="grid-header-epps">Descripción</div>
            <div className="grid-header-epps">Código de identificación</div>

            <div className="grid-item-epps">
              <select name="gradoProteccion" value={gradoProteccion} onChange={handleChange}>
                <option value="">-- Seleccionar --</option>
                <option value="Protección media">Protección media</option>
                <option value="Sin protección">Sin Protección</option>
                <option value="Estándar">Estándar</option>
                <option value="Alta seguridad">Alta Seguridad</option>
                <option value="Máxima seguridad">Máxima Seguridad</option>
                <option value="Máxima dérmica, media respiratoria">Máxima dérmica, media respiratoria</option>
                <option value="Máxima dérmica, sin respiratoria">Máxima dérmica, sin respiratoria</option>
                <option value="Cabina cerrada">Cabina Cerrada</option>
                <option value="Alta dérmica, media respiratoria">Alta dérmica, media respiratoria</option>
                <option value="Estándar dérmica, media respiratoria">Estándar dérmica, media respiratoria</option>
                <option value="Estándar dérmica, alta respiratoria">Estándar dérmica, alta respiratoria</option>
                <option value="Alta dérmica, sin respiratoria">Alta dérmica, sin respiratoria</option>
                <option value="Estándar dérmica, sin respiratoria">Estándar dérmica, sin respiratoria</option>
              </select>
            </div>
            <div className="grid-item-epps">{mensajeProteccion}</div>
            <div className="grid-item-epps">{codigoIdentificacion}</div>
          </div>
        </div>

    </div>
    
  );
}

export default ActividadDiaria;
