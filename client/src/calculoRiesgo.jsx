import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/CalculoRiesgo.css';


function CalculoRiesgo() {
    const [clasificacionSuelo, setClasificacionSuelo] = useState('');
    const [grupoHidrologico, setGrupoHidrologico] = useState('');
    const [unidadCartografica, setUnidadCartografica] = useState('');
    const [zonaForestal, setZonaForestal] = useState('');
    const [codigoID, setCodigoID] = useState('');
    const [distanciaCuerposAgua, setDistanciaCuerposAgua] = useState('');
    const [distanciaCultivos, setDistanciaCultivos] = useState('');
    const [areaSuperficialEstanque, setAreaSuperficialEstanque] = useState('');
    const [profundidadEstanque, setProfundidadEstanque] = useState('');
    const [volumenLiquidos1, setVolumenLiquidos1] = useState('');
    const [volumenLiquidos2, setVolumenLiquidos2] = useState('');
    const [volumenSolidos1, setVolumenSolidos1] = useState('');
    const [areaInfraestructura, setAreaInfraestructura] = useState('');
    const [areaViveroAbierto, setAreaViveroAbierto] = useState(''); 
    const [areaViveroCerrado, setAreaViveroCerrado] = useState(''); 
    const [areaAplicacion, setAreaAplicacion] = useState('');
    const [sistemaContencion, setSistemaContencion] = useState('');
    const [lagunaAcopioTratamiento, setLagunaAcopioTratamiento] = useState('');
    const [concentracionPesticida, setConcentracionPesticida] = useState('');
    const [factorDilucion, setFactorDilucion] = useState('');
    const [periodoRetorno, setPeriodoRetorno] = useState('');
    const [error, setError] = useState('');
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
    
    const [selectedActividadDiaria, setSelectedActividadDiaria] = useState(() => {
      return JSON.parse(localStorage.getItem('selectedActividadDiaria')) || location.state?.selectedActividadDiaria || null;
    });

    // Datos recibidos de las vistas anteriores
    //const selectedEscenario = location.state?.selectedEscenario;
    //const pesticidaSeleccionado = location.state?.selectedPesticida;
    //const selectedCoadyuvante = location.state?.selectedCoadyuvante;
    //const selectedTasaDilucion = location.state?.selectedTasaDilucion;
    //const selectedActividadDiaria = location.state?.selectedActividadDiaria;
  
    console.log(selectedActividadDiaria);
    // Cargar los valores desde `selectedEscenario` y otros datos si están disponibles
    useEffect(() => {
      if (selectedEscenario) {
        setClasificacionSuelo(selectedEscenario.clasificacionSuelo || '');
        setGrupoHidrologico(selectedEscenario.grupoHidrologico || '');
        setUnidadCartografica(selectedEscenario.unidadCartografica || '');
        setZonaForestal(selectedEscenario.zonaForestal || '');
        setCodigoID(selectedEscenario.codigoID || '');
        setDistanciaCuerposAgua(selectedEscenario.distanciaCuerposAgua || '');
        setDistanciaCultivos(selectedEscenario.distanciaCultivos || '');
        setAreaSuperficialEstanque(selectedEscenario.areaSuperficialEstanque || '');
        setProfundidadEstanque(selectedEscenario.profundidadEstanque || '');
        setVolumenLiquidos1(selectedEscenario.volumenLiquidos1 || '');
        setVolumenLiquidos2(selectedEscenario.volumenLiquidos2 || '');
        setVolumenSolidos1(selectedEscenario.volumenSolidos1 || '');
        setAreaAplicacion(selectedEscenario.areaAplicacion || '');
        setSistemaContencion(selectedEscenario.sistemaContencion || '');
        setLagunaAcopioTratamiento(selectedEscenario.lagunaAcopioTratamiento || '');
        setConcentracionPesticida(selectedEscenario.concentracionPesticida || '');
        setFactorDilucion(selectedEscenario.factorDilucion || '');
        setPeriodoRetorno(selectedEscenario.periodoRetorno || '');
      }
    }, [selectedEscenario]);

    const handleBack = () => {
        navigate(-1); 
      };
  
      const handleInformes = () => {
        // Agrupar las variables relacionadas con el componente de Riesgo
        const riesgoData = {
          clasificacionSuelo,
          grupoHidrologico,
          unidadCartografica,
          zonaForestal,
          codigoID,
          distanciaCuerposAgua,
          distanciaCultivos,
          areaSuperficialEstanque,
          profundidadEstanque,
          volumenLiquidos1,
          volumenLiquidos2,
          volumenSolidos1,
          areaAplicacion,
          sistemaContencion,
          lagunaAcopioTratamiento,
          concentracionPesticida,
          factorDilucion,
          periodoRetorno,
        };
      
        // Guardar datos en localStorage
        localStorage.setItem('selectedEscenario', JSON.stringify(selectedEscenario));
        localStorage.setItem('selectedPesticida', JSON.stringify(selectedPesticida));
        localStorage.setItem('selectedTasaDilucion', JSON.stringify(selectedTasaDilucion));
        localStorage.setItem('selectedActividadDiaria', JSON.stringify(selectedActividadDiaria));
        localStorage.setItem('riesgoData', JSON.stringify(riesgoData)); 
      
        // Navegar pasando los datos por location.state
        navigate('/informes', {
          state: {
            selectedEscenario,
            selectedPesticida,
            selectedTasaDilucion,
            selectedActividadDiaria,
            riesgoData, 
          },
        });
      };
      

  return (
    <div className="calculo-riesgo-container">
      <h2>PARÁMETROS PARA CÁLCULO DE RIESGO AMBIENTAL Y SOCIAL</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="actividad-diaria-button-container">
        <button onClick={handleBack} className="back-button">
          Atrás
        </button>
        <button className="actividad-diaria-button"  onClick={handleInformes}>
          Informes</button>
      </div>
      <section className="seleccion-suelo">
        <h3>SELECCIÓN DE SUELO DEL PREDIO</h3>
        <div className="grid-container-suelo">
          <div className="grid-header-suelo">Clasificación de suelo</div>
          <div className="grid-item-suelo">
            <select value={clasificacionSuelo} onChange={(e) => setClasificacionSuelo(e.target.value)}>
              <option value="Argisoles - Planosoles">Argisoles - Planosoles</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="grid-header-suelo">Grupo hidrológico de suelo (HSG)</div>
          <div className="grid-item-suelo">
            <select value={grupoHidrologico} onChange={(e) => setGrupoHidrologico(e.target.value)}>
              <option value="D">D</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="grid-header-suelo">Unidad(es) cartográfica(s) de suelo representativa</div>
          <div className="grid-item-suelo">
            <input type="text" value={unidadCartografica} onChange={(e) => setUnidadCartografica(e.target.value)} placeholder="Unidad cartográfica" />
          </div>
          <div className="grid-header-suelo">Zona forestal representativa</div>
          <div className="grid-item-suelo">
            <input type="text" value={zonaForestal}onChange={(e) => setZonaForestal(e.target.value)} placeholder="Zona forestal"/>
          </div>
          <div className="grid-header-suelo">Código ID</div>
          <div className="grid-item-suelo">
            <input type="text"value={codigoID} onChange={(e) => setCodigoID(e.target.value)} placeholder="Código ID"/>
          </div>
        </div>
      </section>
      <section className="distancias-zonas-sensibles">
        <h3>DISTANCIAS MÍNIMAS EXISTENTES ENTRE APLICACIÓN Y ZONAS SENSIBLES</h3>
        <div className="grid-container-zonas-sensibles">
          <div className="grid-header-zonas-sensibles">Zona sensible</div>
          <div className="grid-header-zonas-sensibles">Distancia [0 m = spray directo]</div>

          <div className="grid-item-zonas-sensibles">Cuerpos de agua</div>
          <div className="grid-item-zonas-sensibles">
            <input type="number" value={distanciaCuerposAgua} onChange={(e) => setDistanciaCuerposAgua(e.target.value)} placeholder="Distancia (m)"/>
          </div>

          <div className="grid-item-zonas-sensibles">Cultivos alimentarios vecinos</div>
          <div className="grid-item-zonas-sensibles">
            <input type="number" value={distanciaCultivos} onChange={(e) => setDistanciaCultivos(e.target.value)} placeholder="Distancia (m)"/>
          </div>
        </div>
      </section>
      <div className="calculo-riesgo-container">
        <section className="volumenes-derramados">
          <h3>VOLÚMENES DE CALDO, CONCENTRADO O SÓLIDOS DERRAMADOS</h3>
          <div className="grid-container-derramados">
            <div className="grid-header-derramados">Escenario</div>
            <div className="grid-header-derramados">Líquidos (L)</div>
            <div className="grid-header-derramados">Sólidos (kg)</div>
            <div className="grid-header-derramados">Sólidos (kg)</div>

            <div className="grid-item-derramados">Definido por usuario</div>
            <div className="grid-item-derramados">
              <input type="number" value={volumenLiquidos1} onChange={(e) => setVolumenLiquidos1(e.target.value)} placeholder="200"/>
            </div>
            <div className="grid-item-derramados">
              <input type="number" value={volumenLiquidos2} onChange={(e) => setVolumenLiquidos2(e.target.value)} placeholder="20"/>
            </div>
            <div className="grid-item-derramados">
              <input type="number" value={volumenSolidos1} onChange={(e) => setVolumenSolidos1(e.target.value)} placeholder="1.5"/>
            </div>

            <div className="grid-item-derramados">Caldo a partir de sólido o concentrado</div>
            <div className="grid-item-derramados" colSpan="4"></div>
          </div>
        </section>
      </div>

      <section className="area-infraestructura">
        <h3>ÁREAS DE INFRAESTRUCTURA Y DE VIVEROS CERRADOS O ABIERTOS</h3>
        <div className="grid-container-infraestructura">
          <div className="grid-header-infraestructura">Zona de aplicación</div>
          <div className="grid-header-infraestructura">Área de aplicación</div>
          <div className="grid-header-infraestructura">Sistema de contención</div>
          <div className="grid-header-infraestructura">Lagunas de acopio y tratamiento</div>
          <div className="grid-header-infraestructura">Valor</div>

          <div className="grid-item-infraestructura">En infraestructura, interna o externamente (m2)</div>
          <div className="grid-item-infraestructura">
            <input type="number" value={areaInfraestructura} onChange={(e) => setAreaInfraestructura(e.target.value)} placeholder="5.000"/>
          </div>
          <div className="grid-item-infraestructura">No aplica</div>
          <div className="grid-item-infraestructura">
            <input type="number" value={concentracionPesticida} onChange={(e) => setConcentracionPesticida(e.target.value)} placeholder="10.0"/>
          </div>
          <div className="grid-item-infraestructura">Concentración de pesticida (µg/L)</div>

          <div className="grid-item-infraestructura">Vivero abierto de acopio o rustificación (ha)</div>
          <div className="grid-item-infraestructura">
            <input type="number" value={areaViveroAbierto} onChange={(e) => setAreaViveroAbierto(e.target.value)} placeholder="1.5"/>
          </div>
          <div className="grid-item-infraestructura">
            <select value={sistemaContencion} onChange={(e) => setSistemaContencion(e.target.value)}>
              <option value="Captación de escorrentía y acopio en laguna">Captación de escorrentía y acopio en laguna</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="grid-item-infraestructura">
            <input type="number" value={factorDilucion} onChange={(e) => setFactorDilucion(e.target.value)} placeholder="100.0"/>
          </div>
          <div className="grid-item-infraestructura">Factor de dilución (adimensional)</div>

          <div className="grid-item-infraestructura">Vivero cerrado (escenarios de invernáculos) (ha)</div>
          <div className="grid-item-infraestructura">
            <input type="number" value={areaViveroCerrado} onChange={(e) => setAreaViveroCerrado(e.target.value)} placeholder="3.0"/>
          </div>
          <div className="grid-item-infraestructura">Sin sistema de recirculación</div>
          <div className="grid-item-infraestructura">
            <input type="number" value={periodoRetorno} onChange={(e) => setPeriodoRetorno(e.target.value)} placeholder="10.0"/>
          </div>
          <div className="grid-item-infraestructura">Período de retorno (años)</div>
        </div>
      </section>

      </div>
  );
}

export default CalculoRiesgo;
