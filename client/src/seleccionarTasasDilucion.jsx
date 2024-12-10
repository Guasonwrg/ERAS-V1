import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/TasaDilucion.css';

function TasaAplicacion() {
  const [tasaAplicacion, setTasaAplicacion] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedTasaDilucion'));
    return storedData?.tasaAplicacion || ''; 
  });
  const [volumenAplicado, setVolumenAplicado] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedTasaDilucion'));
    return storedData?.volumenAplicado || ''; 
  });
  const [alturaInvernaculo, setAlturaInvernaculo] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedTasaDilucion'));
    return storedData?.alturaInvernaculo || '';
  });
  
  const [tipoAreaTratamiento, setTipoAreaTratamiento] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedTasaDilucion'));
    return storedData?.tipoAreaTratamiento || '';
  });

  const [areaTratamiento, setAreaTratamiento] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('selectedTasaDilucion'));
    return storedData?.areaTratamiento || '';
  });
  const [concentracionSolucion, setConcentracionSolucion] = useState('');
  const [dilucionDisolucion, setDilucionDisolucion] = useState('');
  const [rangoAplicacion, setRangoAplicacion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [registroFiltrado, setRegistroFiltrado] = useState(null);
  const [filterPests, setFilterPests] = useState([]);
  const [masaBloque, setMasaBloque] = useState(0);
  const [refCodigos, setRefCodigos] = useState([]);
  const [datosCoincidentes, setDatosCoincidentes] = useState(null);
  const [selectedBoom, setSelectedBoom] = useState('');
  const [selectedGotas, setSelectedGotas] = useState('');
  const [selectedVegetacion, setSelectedVegetacion] = useState('');
  const [volumenAplicadoDeriva, setVolumenAplicadoDeriva] = useState('No');
  const [aplicacionesXAnio, setAplicacionesXAnio] = useState('');
  const [intervaloEntreAplicaciones, setIntervaloAplicaciones] = useState('');
  const [codigoFecha, setCodigoFechas] = useState('');
  const [concentracionPActivo, setConcentracionPActivo] = useState('');
  const [valorPesticida, setValorPesticida] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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
  


  // Cargar los valores iniciales desde el pesticida y escenario seleccionados
  //const selectedEscenario = location.state?.selectedEscenario;
  //const selectedPesticida = location.state?.selectedPesticida;
  //const selectedCoadyuvante = location.state?.selectedCoadyuvante;

  useEffect(() => {
  const storedTasaDilucion = localStorage.getItem('selectedTasaDilucion');
  if (storedTasaDilucion) {
    const parsedTasaDilucion = JSON.parse(storedTasaDilucion);
    setSelectedTasaDilucion(parsedTasaDilucion);

    // Sincronizar estados individuales
    setTasaAplicacion(parsedTasaDilucion.tasaAplicacion || '');
    //console.log('Estado actualizado - tasaAplicacion:', parsedTasaDilucion.tasaAplicacion);
    setConcentracionSolucion(parsedTasaDilucion.concentracionSolucion || '');
    setTipoAreaTratamiento(parsedTasaDilucion.tipoAreaTratamiento || '');
    setAreaTratamiento(parsedTasaDilucion.areaTratamiento || '');
    setAlturaInvernaculo(parsedTasaDilucion.alturaInvernaculo || '');
    setVolumenAplicado(parsedTasaDilucion.volumenAplicado || '');
    setDilucionDisolucion(parsedTasaDilucion.dilucionDisolucion || '');
    setConcentracionPActivo(parsedTasaDilucion.concentracionPActivo || '');
    setSelectedOption(parsedTasaDilucion.selectedOption || '');
    setSelectedBoom(parsedTasaDilucion.selectedBoom || '');
    setSelectedGotas(parsedTasaDilucion.selectedGotas || '');
    setSelectedVegetacion(parsedTasaDilucion.selectedVegetacion || '');
    setVolumenAplicadoDeriva(parsedTasaDilucion.volumenAplicadoDeriva || '');
    setAplicacionesXAnio(parsedTasaDilucion.aplicacionesXAnio || '');
    setIntervaloAplicaciones(parsedTasaDilucion.intervaloEntreAplicaciones || '');
    setValorPesticida(parsedTasaDilucion.valorPesticida || '');
  }
  
  const storedPesticida = localStorage.getItem('selectedPesticida');
  if (storedPesticida) {
    setSelectedPesticida(JSON.parse(storedPesticida));
  }
  
  const storedEscenario = localStorage.getItem('selectedEscenario');
  if (storedEscenario) {
    setSelectedEscenario(JSON.parse(storedEscenario));
  }
  
  const storedCoadyuvante = localStorage.getItem('selectedCoadyuvante');
  if (storedCoadyuvante) {
    setSelectedCoadyuvante(JSON.parse(storedCoadyuvante));
  }  
  }, []); 
  

  useEffect(() => {
    if (selectedPesticida) {
      setTasaAplicacion(selectedPesticida.tasa);
      setConcentracionSolucion(selectedPesticida.concentracion);
      setRangoAplicacion(selectedPesticida.rangoAplicacion);
    }

    if (selectedEscenario) {
      setTipoAreaTratamiento(selectedEscenario.tipoAreaTratamiento);
      setAreaTratamiento(selectedEscenario.areaTratamiento);
      setAlturaInvernaculo(selectedEscenario.alturaInvernaculo);
      setVolumenAplicado(selectedEscenario.volumenAplicado);
    }

// Llamada a la API's para obtener los datos de necesarios para los calculos
const obtenerDatosAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tasas-dilucion');
    const datos = response.data;

    // Filtrar los datos para encontrar el registro que coincida con Unidades_tasa_aplicacion_1
    const registroCoincidente = datos.find(
      registro => registro.Unidades_tasa_aplicacion === selectedEscenario?.Unidades_tasa_aplicacion_1
    );

  
    if (registroCoincidente) {
      setRegistroFiltrado(registroCoincidente);
    } else {
      setError('No se encontró un registro coincidente.');
    }
  } catch (error) {
    //console.error('Error al obtener los datos de la API Tasas-dilucion:', error);
    setError('Hubo un error al obtener los datos de la API Tasas-dilucion.');
  }
};
    
    obtenerDatosAPI();

    const fetchRefCodigos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ref-codigos-form');
        setRefCodigos(response.data);  // Guardar los datos en el estado

        // Comparar el codigo del pesticida seleccionado con los datos obtenidos
        const codigoSeleccionado = selectedPesticida?.Codigo;
        if (codigoSeleccionado) {
          const coincidencia = response.data.find(ref => ref.Codigo === codigoSeleccionado);
          if (coincidencia) {
            setDatosCoincidentes(coincidencia);  
          }
        }
      } catch (err) {
       // console.error('Error al obtener los datos:', err);
        setError('Hubo un problema al obtener los datos de Ref Codigos Form.');
      }
    };
    
    fetchRefCodigos();

    const fetchFilterPests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/filter-pest');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API filter-pest');
        }
        const data = await response.json();
        setFilterPests(data); // Actualiza el estado con los datos obtenidos
        const matchingPest = data.find(
          (pest) => pest.Registro === selectedPesticida.Registro
        );
  
        if (matchingPest) {
          setMasaBloque(matchingPest.Masa_bloque); // Si coincide, asignar la masa bloque
        } else {
          setMasaBloque(0); // Si no coincide, asignar 0
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilterPests();

    const handleSelectPesticida = async (pesticida) => {
      setSelectedPesticida(pesticida);
  
      if (pesticida.Sustancia_Activa_1) {
        try {
          const response = await axios.get('http://localhost:5000/api/pesticidas/codigo-fechas', {
            params: { ingrediente: pesticida.Sustancia_Activa_1 }
          });
          setCodigoFechas(response.data.codigo_fecha);
        } catch (error) {
          console.error('Error al obtener el codigo_fechas:', error);
        }
      } else {
        console.error('No se encontró la sustancia activa en el pesticida seleccionado.');
      }
    };
    
  const resultado = handleCalculations();
  //console.log('valor concetracionPActivo:',  resultado);
  setConcentracionPActivo(resultado);

  }, [selectedPesticida, selectedEscenario]);
  
  
  
 

  useEffect(() => {
    if (selectedTasaDilucion) {
      localStorage.setItem('selectedTasaDilucion', JSON.stringify(selectedTasaDilucion));
      //console.log('Guardado en localStorage:', localStorage.getItem('selectedTasaDilucion'));
    }
    if (selectedPesticida) {
      localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
      //console.log('Guardado en localStorage:', localStorage.getItem('selectedPesticida'));
    }
    if (selectedEscenario) {
      localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
      //console.log('Guardado en localStorage:', localStorage.getItem('selectedEscenario'));
    }
    if (selectedCoadyuvante) {
      localStorage.setItem('selectedCoadyuvante', JSON.stringify(selectedCoadyuvante));
    }
  }, [selectedTasaDilucion, selectedPesticida, selectedEscenario, selectedCoadyuvante]);
  
  

  const handleTasaAplicacionChange = (e) => setTasaAplicacion(e.target.value);
  const handleConcentracionSolucionChange = (e) => setConcentracionSolucion(e.target.value);
  const handleTipoAreaTratamientoChange = (e) => setTipoAreaTratamiento(e.target.value);
  const handleAreaTratamientoChange = (e) => setAreaTratamiento(e.target.value);
  const handleAlturaInvernaculoChange = (e) => setAlturaInvernaculo(e.target.value);
  const handleVolumenAplicadoChange = (e) => setVolumenAplicado(e.target.value);
  const handleDilucionDisolucionChange = (e) => setDilucionDisolucion(e.target.value);
  const handleVolumenAplicadoDerivaChange = (e) => setVolumenAplicadoDeriva(e.target.value);
  const handleaplicacionesXAnioChange = (e) => setAplicacionesXAnio(e.target.value);
  const handleintervaloEntreAplicacionesChange = (e) => setIntervaloAplicaciones(e.target.value);
  const handleOptionChange = (e) => {setSelectedOption(e.target.value); };
  const handleChangeBoom = (e) => {setSelectedBoom(e.target.value);};
  const handleChangeGotas = (e) => {setSelectedGotas(e.target.value);};
  const handleChangeVegetacion = (value) => {setSelectedVegetacion(value);};

  const k72 = parseFloat(selectedPesticida.Activo_Contenido_1) * 100 * 10;
  const k75 = parseFloat(selectedPesticida.Activo_Contenido_1) * 10;

  //Calcula la concentracion del principio activo en base a datos ingresado por el usuario, valores constantes y calores del pesticida
  const handleCalculations = () => {
    let result;
  
    // Convertir los valores a números para poder realizar calculos
    const activoContenido1 = parseFloat(selectedPesticida.Activo_Contenido_1);
    const dilucion = parseFloat(dilucionDisolucion);
    const volumen = parseFloat(volumenAplicado);
  
    // Condición 1: ID_Escenario comienza con 'INF'
    if (selectedEscenario?.ID_Escenario.substring(0, 3) === 'INF') {
      if (selectedPesticida.Unidades_1 === '%') {
        result = activoContenido1 / 100 * dilucion;
      } else {
        result = activoContenido1 / 1000 * dilucion;
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S' && datosCoincidentes?.Uso_directo_o_diluido === 'Directo') {
        if (selectedPesticida.Unidades_1 === '%') {
          result = activoContenido1 * 100 * 10;
        }
      }
  
    } else {
      // Si el ID_Escenario NO comienza con 'INF', evaluar las demás condiciones
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S' && datosCoincidentes?.Uso_directo_o_diluido !== 'Directo') {
        if (selectedPesticida.Unidades_1 === '%') {
          result = k72 * dilucion / volumen;
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S' && datosCoincidentes?.Uso_directo_o_diluido === 'Directo') {
        if (selectedPesticida.Unidades_1 !== '%') {
          result = activoContenido1;
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L' && datosCoincidentes?.Uso_directo_o_diluido === 'Directo') {
        if (selectedPesticida.Unidades_1 === '%') {
          result = activoContenido1 * 10;
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L' && datosCoincidentes?.Uso_directo_o_diluido === 'Diluido') {
        if (selectedPesticida.Unidades_1 !== '%') {
          if (selectedOption === "volumenFinal") {
            result = activoContenido1 * dilucion / volumen;
          }
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L' && datosCoincidentes?.Uso_directo_o_diluido === 'Diluido') {
        if (selectedPesticida.Unidades_1 === '%') {
          if (selectedOption === "volumenFinal") {
            result = k75 * dilucion / volumen;
          }
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L' && datosCoincidentes?.Uso_directo_o_diluido === 'Diluido') {
        if (selectedPesticida.Unidades_1 !== '%') {
          if (selectedOption === "volumenAgregado") {
            result = activoContenido1 * dilucion / (dilucion + volumen);
          }
        }
      }
  
      if (datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L' && datosCoincidentes?.Uso_directo_o_diluido === 'Diluido') {
        if (selectedPesticida.Unidades_1 === '%') {
          if (selectedOption === "volumenAgregado") {
            result = k75 * dilucion / (dilucion + volumen);
          }
        }
      }
    }
  
    return result ? result.toFixed(2) : "Condiciones no cumplen";
  };

  //se utiliza para mostrar datos en pantalla según la condiciones con datos del escenario seleccionado
  const G101Calculations = () => {
    let resultG101

    if (selectedEscenario?.ID_Escenario.substring(0, 3) === 'INF'){
      resultG101 = (handleCalculations() * volumenAplicado / 1000 ) / 0.5
    }
    if (selectedEscenario?.ID_Escenario === 'INFi1'){
      resultG101 = masaBloque / 1000 * (5 * 120) * (handleCalculations() / 100)
    }
    if (selectedEscenario?.ID_Escenario === 'INFi2'){
      resultG101 = tasaAplicacion / 1000 * (5 * 120) * (handleCalculations() / 0.5)
    }
    if (selectedEscenario?.ID_Escenario === 'INFi3'){
      resultG101 = masaBloque / 1000 * (5 * 120) * (handleCalculations() / 100)
    }
    if (selectedEscenario?.ID_Escenario === 'INFi4-7'){
      resultG101 = tasaAplicacion / 1000 * 100 * handleCalculations() / (5000 /10000)
    }
      
    return resultG101 ? resultG101.toFixed(2) : "No aplica";
  };

  //calcula la tasa de aplicacion calculada en base a datos que ingresa el usuario, datos del pesticida y del escenario.
  const calcularValorPesticida = () => {
    if (!selectedPesticida || !selectedEscenario) return "Condición no válida";
  
    const contenidoActivo = parseFloat(selectedPesticida.Activo_Contenido_1);
    //console.log('contenido activo:',contenidoActivo)
    const tasa = parseFloat(tasaAplicacion);
    //console.log(tasa)
    const area = parseFloat(areaTratamiento);
    //console.log(area)
    const k75Valor = parseFloat(k75);
    //console.log(k75Valor)
  
    let resultado;
  
    if (selectedPesticida.Codigo === 'S') {
      resultado = tasa * area * contenidoActivo;
    } else if (selectedPesticida.Unidades_1 === '%') {
      resultado = (k75Valor * tasa / 1000) * area;
    } else {
      resultado = (contenidoActivo * tasa / 1000) * area;
    }
  
    return resultado ? resultado.toFixed(3) : "Condición no válida";
  };

  //maneja la navegacion hacia la pagina anterior
  const handleBack = () => {
    navigate(-1); 
  };

  const handleActividad = () => {
    const resultado = handleCalculations();
    setConcentracionPActivo(resultado);
  
    const resultado1 = calcularValorPesticida();
    setValorPesticida(resultado1);
  
    const selectedTasaDilucion = {
      tasaAplicacion,
      concentracionSolucion,
      tipoAreaTratamiento,
      areaTratamiento,
      alturaInvernaculo,
      volumenAplicado,
      rangoAplicacion,
      registroFiltrado,
      dilucionDisolucion,
      concentracionPActivo: resultado,
      datosCoincidentes,
      selectedOption,
      selectedBoom,
      selectedGotas,
      selectedVegetacion,
      volumenAplicadoDeriva,
      aplicacionesXAnio,
      codigoFecha,
      intervaloEntreAplicaciones,
      valorPesticida: resultado1,
    };
  
    // Guardar datos en localStorage
    localStorage.setItem('selectedTasaDilucion', JSON.stringify(selectedTasaDilucion));
    localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
    localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
    localStorage.setItem('selectedCoadyuvante', JSON.stringify(selectedCoadyuvante));
  
    // Navegar pasando los datos por location.state
    navigate('/epp-actividad', {
      state: { selectedTasaDilucion, selectedEscenario, selectedPesticida, selectedCoadyuvante },
    });
  };
  return (
    <div className="tasa-aplicacion-container">
      <h2>PARÁMETROS PARA TIPO Y TASA DE APLICACIÓN</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="actividad-diaria-button-container">
        <button onClick={handleBack} className="back-button">
          Atrás
        </button>
        <button className="actividad-diaria-button"  onClick={handleActividad}>
          Actividad-Diaria</button>
      </div>

      <section className="ingreso-tasa">
        <h3>INGRESO DE TASA DE APLICACIÓN DE PRODUCTO</h3>
        <div className="grid-container">
          <div className="grid-item-center">
            <strong>Escenarios U.S. EPA en los que se aplica la unidad de tasa de aplicación:</strong>
            <span>
              Unidad de uso más extensivo (94 posibles escenarios) para la más amplia combinación
              de tipos de formulaciones y equipos de aplicación, con predominio de la cobertura total.
            </span>
          </div>
          <div className="grid-item">
            <strong>Unidades empleadas en práctica de la empresa:</strong>
            <span>L producto comercial / ha efectiva*</span>
          </div>
          <div className="grid-item">
            <strong>Importante:</strong>
            <span>Las hectáreas se refieren al área total, aunque el p.a. trate solo una fracción.</span>
          </div>
          <div className="grid-item">
            <strong>Unidades de la tasa de aplicación de principio activo:</strong>
            <span>kg p.a./ha</span>
          </div>
          <div className="grid-item">
            <strong>Tasa de aplicación de producto:</strong>
            <input type="number" className="form-input" value={tasaAplicacion} onChange={handleTasaAplicacionChange} />
          </div>
        </div>
      </section>

  <section className="definicion-unidades">
    <h3>Definición de las unidades de la tasa de aplicación en los cálculos de exposición</h3>
      <div className="grid-container">
        <div className="grid-item">
          <strong>Escenarios en los que se aplican las distintas unidades:</strong>
          <span>{registroFiltrado ? registroFiltrado.Escenarios_aplican_unidades : "Valor no disponible"}</span>
        </div>
        <div className="grid-item">
          <strong>Escenario seleccionado con esta unidad:</strong>
          <span>{selectedEscenario ? selectedEscenario.ID_Escenario : "Valor no disponible"}</span>
        </div>
        <div className="grid-item">
          <strong>Importante:</strong>
          <span>{registroFiltrado ? registroFiltrado.Importante : "Valor no disponible"}</span>
        </div>
        <div className="grid-item">
          <strong>Unidades de tasa de aplicación:</strong>
          <span>{selectedEscenario ? selectedEscenario.Unidades_tasa_aplicacion_1 : "Valor no disponible"}</span>
        </div>
        <div className="grid-item">
          <strong>Ingreso de tasas de aplicación:</strong>
            <span>{registroFiltrado?.Ingreso_tasas_aplicacion? registroFiltrado.Ingreso_tasas_aplicacion: "Valor no disponible"}
          </span>
        </div>
      </div>
    </section>


    <section className="calculo-concentracion">
  <h3>Cálculo de concentraciones de principio activo en productos que se disuelven, dispersan o diluyen para su aplicación</h3>
  <div className="grid-container">
    <div className="grid-item">
      <strong>Tipo de formulación:</strong>
      <span>
        {datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S'
          ? 'Formulaciones o sustancias sólidas'
          : datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'L'
          ? 'Formulaciones o sustancias líquidas'
          : 'No está definido el código de formulación. Seleccione un producto comercial o un código en ingreso manual.'}
      </span>
    </div>

    <div className="grid-item">
      <strong>Concentración de principio activo:</strong>
      <span>
        {selectedPesticida.Codigo === 'S'
          ? 'Concentración de principio activo en el producto original'
          : selectedPesticida.Unidades_1 === '%'
          ? 'Concentración de principio activo en solución / dispersión original (% en p/v)'
          : 'Concentración de principio activo en solución / dispersión original'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Unidades:</strong>
      <span>{selectedPesticida.Unidades_1}</span>
    </div>
    <div className="grid-item">
      <strong>Contenido activo:</strong>
      <span>{selectedPesticida.Activo_Contenido_1}</span>
    </div>

    <div className="grid-item">
      <strong>Preparación de la dilución / dispersión:</strong>
      <span>
        {datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S'
          ? 'kg producto original'
          : selectedEscenario?.ID_Escenario.substring(0, 3) === 'INF'
          ? 'mL producto original / L caldo'
          : 'L producto original'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Ingreso de valores:</strong>
      <input type="number" value={dilucionDisolucion} onChange={handleDilucionDisolucionChange} className="form-input" />
    </div>
    <div className="grid-item">
      <strong>Volumen total aplicado:</strong>
      <span>
        {selectedEscenario?.ID_Escenario.substring(0, 3) === 'INF'
          ? 'Volumen total de caldo aplicado (L)'
          : 'L agua o solución'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Opciones de dilución:</strong>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">-- Seleccionar --</option>
        <option value="sinDilucion">SIN DILUCIÓN (valores en celdas verdes no inciden)</option>
        <option value="volumenAgregado">Volumen agregado</option>
        <option value="volumenFinal">Volumen final</option>
      </select>
    </div>
    <div className="grid-item">
      <strong>Concentración final aplicada:</strong>
      <span>
        {datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S' && datosCoincidentes?.Uso_directo_o_diluido === 'Directo'
          ? 'Concentración de principio activo en sólido concentrado aplicado'
          : 'Concentración de principio activo en solución final aplicada'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Ingreso del volumen:</strong>
      <input type="number" value={volumenAplicado} onChange={handleVolumenAplicadoChange} className="form-input" />
    </div>
    <div className="grid-item">
      <strong>Unidades finales:</strong>
      <span>
        {datosCoincidentes?.Orden_frecuencia_Base_unitaria_PA === 'S' && datosCoincidentes?.Uso_directo_o_diluido === 'Directo'
          ? 'g p.a./kg en sólido aplicado'
          : 'g p.a./L en solución aplicada'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Resultado del cálculo:</strong>
      <span>{handleCalculations()}</span>
    </div>
  </div>
</section>

<section className="calculo-tasa-aplicacion">
  <h3>CÁLCULO DE TASA DE APLICACIÓN (base kg p.a.)</h3>

  {/* Encabezados de Sección */}
  <div className="grid-header-container">
    <div className="grid-header">Datos adicionales requeridos según el escenario</div>
    <div className="grid-header">Unidades</div>
    <div className="grid-header">Ingreso de valores</div>
  </div>

  {/* Primera Fila */}
  <div className="grid-row">
    <div className="grid-item">
    {selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ ha' || selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ L  dilución aplicada' || selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m2' ? (
          "Área efectiva de tratamiento en plantación, vivero o invernáculo forestal. P.ej.: total (100%), fila (50 a 67%), entrefila (33 a 50%)"
        ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m3' ? (
          ' '
        ) : (
          "No se requieren datos adicionales para el escenario seleccionado"
        )}
    </div>
    <div className="grid-item">
    <input type="text" value={tipoAreaTratamiento} onChange={handleTipoAreaTratamientoChange} /> 
    </div>
    <div className="grid-item">
      <input type="number" value={areaTratamiento} onChange={handleAreaTratamientoChange} />
    </div>
  </div>

  {/* Segunda Fila */}
  <div className="grid-row">
    <div className="grid-item">Altura del invernáculo (Valor por defecto)</div>
    <div className="grid-item">Metros</div>
    <div className="grid-item">
    <input type="number" value={alturaInvernaculo} onChange={handleAlturaInvernaculoChange} /> 
    </div>
  </div>

  {/* Encabezados Segunda Sección */}
  <div className="grid-header-container">
    <div className="grid-header">Escenario</div>
    <div className="grid-header">Unidades</div>
    <div className="grid-header">Tasa de aplicación calculada</div>
  </div>

  {/* Tercera Fila */}
  <div className="grid-row">
    <div className="grid-item">
    {selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ ha' ? (
          'Escenarios con amplio rango de formulaciones y tipos de equipamiento, en todos los ambientes, con predominio de cobertura total'
          ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ L  dilución aplicada' ? (
            'Escenarios con aplicación de líquidos empleando nebulizadores, mochilas, pistolas o varitas presurizadas, en todos los ambientes'
          ) :  selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m3' ? (
            'Escenarios de nebulización manual o automática / estacionaria de formulaciones líquidas en invernáculos'
          ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m2' ? (
            'Escenarios de aplicación de sólidos esparcidos con la mano o accesorios manuales (taza, cuchara, lata) en invernáculos o viveros forestales'
          ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ punto' ? (
            'Escenarios de aplicación de sólidos esparcidos con la mano o accesorios manuales (taza, cuchara, lata) en invernáculos o viveros forestales, o cebos en interiores'
          ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ árbol' ? (
            'Escenarios de inyección de formulaciones líquidas en árboles de plantaciones o viveros forestales'
          ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ lata' ? (
            'Escenarios de aplicación de sólidos por espolvoreo directo desde lata de producto en invernáculos o viveros forestales'
          ) :(
            'No hay escenario seleccionado'
          )}
    </div>
    <div className="grid-item">{selectedEscenario.Unidades_tasa_aplicacion_1}</div>
    <div className="grid-item">{calcularValorPesticida()}</div>
  </div>

  {/* Última Fila */}
  <div className="grid-row">
    <div className="grid-item">
      Tasa de aplicación expresada en kg p.a./ha para cálculos de concentraciones ambientales con PWC
    </div>
    <div className="grid-item">
    Área de aplicación en predio de 100 ha:{" "}
            {selectedEscenario.Categoria_objetivo === "Invernáculo"
              ? "3"
              : selectedEscenario.Categoria_objetivo === "Plantación forestal"
              ? "60"
              : selectedEscenario.Categoria_objetivo === "Vivero forestal"
              ? "1.5"
              : selectedEscenario.Categoria_objetivo === "Infraestructura"
              ? "0.5"
              : "Valor no disponible"}{" "}
            ha
    </div>
    <div className="grid-item">
    {selectedEscenario?.ID_Escenario.substring(0, 3) === 'INF' ? (
              G101Calculations()
            ) : selectedPesticida.Aptitud === 'RODENTICIDA' ? (
              G101Calculations()
            ) : selectedPesticida.Codigo === 'FU' && selectedEscenario?.ID_Escenario !== 'IN33' ? (
              G101Calculations()
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ L dilución aplicada' ? (
              120 * calcularValorPesticida() * areaTratamiento
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ árbol' ? (
              'No aplica'
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m3' ? (
              calcularValorPesticida() * 2.8 / 10000
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ lata' ? (
              calcularValorPesticida()
            ) : selectedEscenario.ID_Escenario === 'PF46' || selectedEscenario.ID_Escenario === 'VF72' || selectedEscenario.ID_Escenario === 'IN61' ? (
              tasaAplicacion / 1000 * k72 / 1000
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./m2' ? (
              calcularValorPesticida() / 10000
            ) : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ ha' ? (
              calcularValorPesticida()
            ) : null}
    </div>
  </div>
</section>

<section className="detalles-aplicacion">
  <h3>Detalles de la Aplicación</h3>
  <div className="grid-container">
    {/* Fila 1: Tipo de producción */}
    <div className="grid-item">
      <strong>Tipo de producción:</strong>
      <span>{selectedEscenario.Categoria_objetivo}</span>
    </div>
    <div className="grid-item">
      <strong>Equipo de aplicación:</strong>
      <span>{selectedEscenario.Equipo_aplicacion}</span>
    </div>
    <div className="grid-item">
      <strong>Altura de pulverizadora de barra:</strong>
      <select value={selectedBoom} onChange={handleChangeBoom} className="form-input">
        <option value="">-- Selecciona una opción --</option>
        <option value="Low Boom">Low Boom ≈ 0,5 m del suelo</option>
        <option value="High Boom">High Boom ≈ 1,0 m del suelo</option>
      </select>
    </div>
    <div className="grid-item">
      <strong>Formulación - Tipo de aplicación:</strong>
      <span>{selectedEscenario.Tipo_aplicacion}</span>
    </div>
    <div className="grid-item">
      <strong>Tamaño de gotas:</strong>
      <select value={selectedGotas} onChange={handleChangeGotas} className="form-input">
        <option value="">-- Selecciona una opción --</option>
        <option value="Finas">Finas 175 µm</option>
        <option value="Gruesas">Gruesas 341 µm</option>
      </select>
    </div>
    <div className="grid-item">
      <strong>¿Solo en suelo sin vegetación?:</strong>
      <label className="switch">
        <input
          type="checkbox"
          checked={selectedVegetacion === 'Si'}
          onChange={(e) => handleChangeVegetacion(e.target.checked ? 'Si' : 'No')}
        />
        <span className="slider"></span>
      </label>
    </div>

    {/* Fila 2: Deriva */}
    <div className="grid-item">
      <strong>Deriva:</strong>
      <span>
        {selectedEscenario.Codigo_tamanos_gota_deriva === 'AM'
          ? 'Deriva de este equipo se estima asimilándolo a los datos de mochila, ajustando el tamaño de gotas según corresponda.'
          : selectedEscenario.Codigo_tamanos_gota_deriva === 'APTB'
          ? 'Deriva de este equipo se estima a partir de los datos de pulverizadora terrestre, ajustando altura y tamaño de gotas según corresponda.'
          : selectedEscenario.Codigo_tamanos_gota_deriva === 'D0'
          ? 'Se asume que las aplicaciones internas en invernáculos (viveros cerrados) e infraestructura no tienen deriva atmosférica, como tampoco las inyecciones y aplicaciones directas de sólidos.'
          : selectedEscenario.Codigo_tamanos_gota_deriva === ''
          ? 'Se asume que la deriva por aplicaciones internas en invernáculos e infraestructura no tienen deriva atmosférica.'
          : selectedEscenario.ID_Escenario === 'VF25'
          ? 'No hay datos de deriva para polvo.'
          : selectedEscenario.Codigo_tamanos_gota_deriva === 'DR'
          ? 'Deriva estimada a partir de modelo numérico de Wang et al. (2023) Agriculture 2023, 13, 628.'
          : selectedEscenario.Codigo_tamanos_gota_deriva === 'A' ||
            selectedEscenario.Codigo_tamanos_gota_deriva === 'M' ||
            selectedEscenario.Codigo_tamanos_gota_deriva === 'PTB'
          ? 'Deriva estimada a partir de modelos AgDrift o SDRAT.'
          : ''}
      </span>
    </div>
    <div className="grid-item">
      <strong>Nota:</strong>
      <span>* Abejas incorporan p.a. vía vegetación.</span>
    </div>

    {/* Fila 3: Volumen aplicado */}
    <div className="grid-item">
      <strong>Volumen aplicado:</strong>
      <span>
        {selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ ha' ||
        selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ L dilución aplicada'
          ? 'Volumen aplicado (L/ha)'
          : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ lata'
          ? 'Cantidad de latas (latas/ha)'
          : selectedEscenario.ID_Escenario === 'PF46' ||
            selectedEscenario.ID_Escenario === 'VF72' ||
            selectedEscenario.ID_Escenario === 'IN61'
          ? 'Cantidad de puntos (puntos/ha)'
          : 'No aplica'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Volumen:</strong>
      <input
        type="number"
        value={volumenAplicadoDeriva}
        onChange={handleVolumenAplicadoDerivaChange}
        className="form-input"
      />
    </div>
    <div className="grid-item">
      <strong>Volumen por defecto:</strong>
      <span>
        {selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ ha' ||
        selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ L dilución aplicada'
          ? '100 L/ha'
          : selectedEscenario.Unidades_tasa_aplicacion_1 === 'kg p.a./ lata'
          ? '10 latas/ha'
          : 'No aplica'}
      </span>
    </div>
    <div className="grid-item">
      <strong>Reducción de deriva:</strong>
      <span>
        {selectedEscenario.Codigo_tamanos_gota_deriva === 'DR' ? 'Reducción de deriva por coadyuvante (%)' : 'no aplica'}
      </span>
    </div>
  </div>
</section>
<section className="aplicaciones-por-anio">
  <h3>Aplicaciones por Año</h3>
  <div className="grid-container">
    <div className="grid-item">
      <strong>Aplicaciones por año:</strong>
      <input
        type="number"
        value={aplicacionesXAnio}
        onChange={handleaplicacionesXAnioChange}
        className="form-input"
      />
    </div>
    <div className="grid-item">
      <strong>Intervalo entre aplicaciones (d):</strong>
      <input
        type="number"
        value={intervaloEntreAplicaciones}
        onChange={handleintervaloEntreAplicacionesChange}
        className="form-input"
      />
    </div>

    <div className="grid-item">
      <strong>Fecha de plantación:</strong>
      <span>
        {selectedEscenario.Categoria_objetivo === "Plantación forestal"
          ? "15-set"
          : "1-mar"}
      </span>
    </div>
    <div className="grid-item">
      <strong>Años para repetir ciclo:</strong>
      <span>
        {selectedEscenario.Categoria_objetivo === "Plantación forestal" ? 10 : 1}
      </span>
    </div>
    <div className="grid-item full-width">
      <strong>Fechas de aplicación modeladas en PWC - Observaciones:</strong>
      <span>
        {codigoFecha === "H1-1"
          ? "15-ago"
          : codigoFecha === "H1-2"
          ? "10-set"
          : codigoFecha === "H1-3"
          ? "10-oct"
          : codigoFecha === "H1-4"
          ? "15-oct"
          : codigoFecha === "H1-5"
          ? "15-nov"
          : codigoFecha === "H1-6"
          ? "10-dic"
          : codigoFecha === "H2-1"
          ? "15-jul + 15-nov"
          : codigoFecha === "H2-2"
          ? "15-ago + 30-oct"
          : codigoFecha === "H2-3"
          ? "10-set + 15-nov"
          : codigoFecha === "H2-4"
          ? "15-nov + 15-ene"
          : codigoFecha === "H2-5"
          ? "15-nov + 15-feb"
          : codigoFecha === "H3-1"
          ? "10-jul + 10-set + 15-ene"
          : codigoFecha === "H3-2"
          ? "10-set + 15-nov + 15-ene en secuencia Área Total - Fila - Fila"
          : "Sin información cargada"}
      </span>
    </div>
  </div>
</section>



</div>
  );
}

export default TasaAplicacion;
