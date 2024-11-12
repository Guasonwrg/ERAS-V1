import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/ActividadDiaria.css';

function ActividadDiaria() {
    const location = useLocation();
    const navigate = useNavigate();
    const [datosAuxActividadDiaria, setDatosAuxActividadDiaria] = useState(null);
    const [datosGradoProteccion, setDatosGradoProteccion] = useState(null);
    //const [datos, setDatos] = useState(null);
    const [valorReal, setValorReal] = useState('');
    const [diasManipulacion, setDiasManipulacion] = useState('');
    const [aniosManipulacion, setAniosManipulacion] = useState('');
    const [porcentajeAnios, setPorcentajeAnios] = useState('');
    const [contactoDermico, setContactoDermico] = useState('');
    const [gradoProteccion, setGradoProteccion] = useState('');
    const [mensajeProteccion, setMensajeProteccion] = useState('');
    const [codigoIdentificacion, setCodigoIdentificacion] = useState('');
    const [error, setError] = useState(''); 
  
    // Datos recibidos de las vistas anteriores
    const selectedEscenario = location.state?.selectedEscenario;
    const pesticidaSeleccionado = location.state?.selectedPesticida;
    const selectedCoadyuvante = location.state?.selectedCoadyuvante;
    const selectedTasaDilucion = location.state?.selectedTasaDilucion;

    console.log(selectedTasaDilucion);
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
        console.error('Error al obtener los datos de la API:', error);
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
      console.error('Error al cargar datos de grado de protección:', error);
    } 
  };
   
    // Llamar a la API cuando el componente se monte
    useEffect(() => {
      if (selectedEscenario?.Codigo_unificado_actividad_diaria) {
        obtenerDatosAuxActividadDiaria();
        getGradoProteccion()
      }
    }, [selectedEscenario]);
  
   

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

      const selectedActividadDiaria = {
        mensajeProteccion,
        codigoIdentificacion,
        datosAuxActividadDiaria, 
        valorReal
      }
      // Verificar que los datos requeridos estén completos
      //if (selectedEscenario && pesticidaSeleccionado && datos.actividadDiaria && datos.diasAnio) {
        navigate(`/riesgo`, {
          state: {
            selectedEscenario,
            pesticidaSeleccionado,
            selectedCoadyuvante,
            selectedTasaDilucion,
            selectedActividadDiaria
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
      <table className="tabla-actividad-diaria">
        <thead>
          <tr>
            <th>Códigos de escenario</th>
            <th>Combinación formulación con equipo y tipo de aplicación</th>
            <th>Tipo de producción</th>
            <th>Actividad del trabajador</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${selectedEscenario?.ID_Escenario} - ${datosAuxActividadDiaria?.Codigo_Unificado}`}</td>
            <td>{selectedEscenario.Escenario_resumido_textual}</td>
            <td>{selectedEscenario.Categoria_objetivo}</td>
            <td>{selectedEscenario.Actividad_trabajador}</td>
          </tr>
        </tbody>
      </table>
      <table className="tabla-actividad-diaria">
        <thead>
          <tr>
            <th>Cantidad manipulada o área tratada por día</th>
            <th>Unidades</th>
            <th>Valor</th>
          </tr>
          <tr>
            <td>Cantidad definida por defecto por U.S. EPA</td>
            <td>{datosAuxActividadDiaria?.Unidades_Reales}</td>
            <td>{datosAuxActividadDiaria?.Valor_Convertido}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Valor real empleado en el predio evaluado</td>
            <td>{datosAuxActividadDiaria?.Unidades_Reales}</td>
            <td>
              <input
                type="number"
                name="actividadDiaria"
                value={valorReal}
                onChange={handleValorReal}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Años de trabajo manipulando plaguicidas y número de aplicaciones por año</h3>
      <table className="tabla-actividad-diaria">
        <thead>
          <tr>
            <th>Exposición</th>
            <th>Parámetro</th>
            <th>Unidades</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dérmica y por inhalación</td>
            <td>Días por año manipulando el plaguicida</td>
            <td>d/año</td>
            <td><input
                type="number"
                name="diasAnio"
                value={diasManipulacion}
                onChange={handleDiasManipulacion}
              /></td>
          </tr>
          <tr>
            <td></td>
            <td>Años de trabajo manipulando plaguicidas</td>
            <td>años</td>
            <td><input
                type="number"
                name="aniosTrabajo"
                value={aniosManipulacion}
                onChange={handleAniosManipulacion}
              /></td>
          </tr>
          <tr>
            <td>Ingesta</td>
            <td>% de años de la vida expuestos a ingesta contaminada</td>
            <td>%</td>
            <td><input
                type="number"
                name="porcentajeIngesta"
                value={porcentajeAnios}
                onChange={handlePorcentajeAnios}
              /></td>
          </tr>
          <tr>
            <td>Dérmica accidental</td>
            <td>Contacto con producto comercial o solución diluida (caldo)</td>
            <td>
              <select
                name="contactoDermico"
                value={contactoDermico}
                onChange={handleContactoDermico}
              >
                <option value="Caldo">Caldo</option>
                <option value="Concentrado">Concentrado</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Equipos de protección personal (EPPs) o medidas de control por ingeniería (EC)</h3>
      <table className="tabla-actividad-diaria">
        <thead>
          <tr>
            <th>Grado de protección</th>
            <th>Descripción</th>
            <th>Código de identificación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select
                name="gradoProteccion"
                value={gradoProteccion}
                onChange={handleChange}
              >
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
            </td>
            <td>{mensajeProteccion}</td>
            <td>{codigoIdentificacion}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  );
}

export default ActividadDiaria;
