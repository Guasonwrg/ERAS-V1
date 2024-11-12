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

    // Datos recibidos de las vistas anteriores
    const selectedEscenario = location.state?.selectedEscenario;
    const pesticidaSeleccionado = location.state?.selectedPesticida;
    const selectedCoadyuvante = location.state?.selectedCoadyuvante;
    const selectedTasaDilucion = location.state?.selectedTasaDilucion;
    const selectedActividadDiaria = location.state?.selectedActividadDiaria;
  
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
        navigate(-1); // Esto te lleva a la pantalla anterior
      };
  
    const handleInformes = () => {
      // Verificar si todos los datos están completos antes de navegar {

        navigate('/informes', {
          state: {
            selectedEscenario,
            pesticidaSeleccionado,
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
            selectedTasaDilucion,
            selectedActividadDiaria

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
        <table>
          <tbody>
            <tr>
              <td>Clasificación de suelo</td>
              <td>
                <select value={clasificacionSuelo} onChange={(e) => setClasificacionSuelo(e.target.value)}>
                  <option value="Argisoles - Planosoles">Argisoles - Planosoles</option>
                  <option value="Otro">Otro</option>
                </select>
              </td>
              <td>Grupo hidrológico de suelo (HSG)</td>
              <td>
                <select value={grupoHidrologico} onChange={(e) => setGrupoHidrologico(e.target.value)}>
                  <option value="D">D</option>
                  <option value="Otro">Otro</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Unidad(es) cartográfica(s) de suelo representativa</td>
              <td>
                <input
                  type="text"
                  value={unidadCartografica}
                  onChange={(e) => setUnidadCartografica(e.target.value)}
                  placeholder="Unidad cartográfica"
                />
              </td>
              <td>Zona forestal representativa</td>
              <td>
                <input
                  type="text"
                  value={zonaForestal}
                  onChange={(e) => setZonaForestal(e.target.value)}
                  placeholder="Zona forestal"
                />
              </td>
              <td>Código ID</td>
              <td>
                <input
                  type="text"
                  value={codigoID}
                  onChange={(e) => setCodigoID(e.target.value)}
                  placeholder="Código ID"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="distancias-zonas-sensibles">
        <h3>DISTANCIAS MÍNIMAS EXISTENTES ENTRE APLICACIÓN Y ZONAS SENSIBLES</h3>
        <table>
          <tbody>
            <tr>
              <td>Zona sensible</td>
              <td>Distancia [0 m = spray directo]</td>
            </tr>
            <tr>
              <td>Cuerpos de agua</td>
              <td>
                <input
                  type="number"
                  value={distanciaCuerposAgua}
                  onChange={(e) => setDistanciaCuerposAgua(e.target.value)}
                  placeholder="Distancia (m)"
                />
              </td>
            </tr>
            <tr>
              <td>Cultivos alimentarios vecinos</td>
              <td>
                <input
                  type="number"
                  value={distanciaCultivos}
                  onChange={(e) => setDistanciaCultivos(e.target.value)}
                  placeholder="Distancia (m)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="calculo-riesgo-container">
      <h2>PARÁMETROS PARA CÁLCULO DE RIESGO AMBIENTAL Y SOCIAL</h2>

      {/* Sección: Volúmenes de caldo, concentrado o sólidos derramados */}
      <section className="volumenes-derramados">
        <h3>VOLÚMENES DE CALDO, CONCENTRADO O SÓLIDOS DERRAMADOS</h3>
        <table>
          <thead>
            <tr>
              <th>Escenario</th>
              <th>Líquidos (L)</th>
              <th>Sólidos (kg)</th>
              <th>Sólidos (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Definido por usuario</td>
              <td>
                <input
                  type="number"
                  value={volumenLiquidos1}
                  onChange={(e) => setVolumenLiquidos1(e.target.value)}
                  placeholder="200"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={volumenLiquidos2}
                  onChange={(e) => setVolumenLiquidos2(e.target.value)}
                  placeholder="20"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={volumenSolidos1}
                  onChange={(e) => setVolumenSolidos1(e.target.value)}
                  placeholder="1.5"
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Caldo a partir de sólido o concentrado</td>
              <td colSpan="4"></td>
            </tr>
          </tbody>
        </table>
      </section>

    
      <section className="area-infraestructura">
        <h3>ÁREAS DE INFRAESTRUCTURA Y DE VIVEROS CERRADOS O ABIERTOS</h3>
        <table>
            <thead>
            <tr>
                <th>Zona de aplicación</th>
                <th>Área de aplicación</th>
                <th>Sistema de contención</th>
                <th>Lagunas de acopio y tratamiento</th>
                <th>Valor</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>En infraestructura, interna o externamente (m2)</td>
                <td>
                <input
                    type="number"
                    value={areaInfraestructura} // Variable de estado independiente
                    onChange={(e) => setAreaInfraestructura(e.target.value)}
                    placeholder="5.000"
                />
                </td>
                <td>No aplica</td>
                <td>
                <input
                    type="number"
                    value={concentracionPesticida}
                    onChange={(e) => setConcentracionPesticida(e.target.value)}
                    placeholder="10.0"
                />
                </td>
                <td>Concentración de pesticida (µg/L)</td>
            </tr>
            <tr>
                <td>Vivero abierto de acopio o rustificación (ha)</td>
                <td>
                <input
                    type="number"
                    value={areaViveroAbierto} // Nueva variable de estado
                    onChange={(e) => setAreaViveroAbierto(e.target.value)}
                    placeholder="1.5"
                />
                </td>
                <td>
                <select value={sistemaContencion} onChange={(e) => setSistemaContencion(e.target.value)}>
                    <option value="Captación de escorrentía y acopio en laguna">Captación de escorrentía y acopio en laguna</option>
                    <option value="Otro">Otro</option>
                </select>
                </td>
                <td>
                <input
                    type="number"
                    value={factorDilucion}
                    onChange={(e) => setFactorDilucion(e.target.value)}
                    placeholder="100.0"
                />
                </td>
                <td>Factor de dilución (adimensional)</td>
            </tr>
            <tr>
                <td>Vivero cerrado (escenarios de invernáculos) (ha)</td>
                <td>
                <input
                    type="number"
                    value={areaViveroCerrado} // Nueva variable de estado
                    onChange={(e) => setAreaViveroCerrado(e.target.value)}
                    placeholder="3.0"
                />
                </td>
                <td>Sin sistema de recirculación</td>
                <td>
                <input
                    type="number"
                    value={periodoRetorno}
                    onChange={(e) => setPeriodoRetorno(e.target.value)}
                    placeholder="10.0"
                />
                </td>
                <td>Período de retorno (años)</td>
            </tr>
            </tbody>
        </table>
       </section>


      {/* Botones para editar u ocultar datos adicionales */}
      <div className="botones-adicionales">
        <button className="btn-editar">Editar datos adicionales</button>
        <button className="btn-ocultar">Ocultar datos adicionales</button>
      </div>
      </div>
    </div>
  );
}

export default CalculoRiesgo;
