import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Styles/OcupTablas.css';

function OcupTablas() {
  const location = useLocation();
  const [registroFiltrado, setRegistroFiltrado] = useState(null);
  const [valorCoincidente, setValorCoincidente] = useState(null);
  const [registroHiCancer, setRegistroHiCancer] = useState(null);
  const [valorHiCancer, setValorHiCancer] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

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

  const [riesgoData, setRiesgoData] = useState(() => {
    return JSON.parse(localStorage.getItem('riesgoData')) || location.state?.riesgoData || null;
  });



  //obriene los datos de las vistas anteriores que viene en el estado
  //const selectedEscenario = location.state?.selectedEscenario;
  //const pesticidaSeleccionado = location.state?.selectedPesticida;
  //const selectedCoadyuvante = location.state?.selectedCoadyuvante;
  //const selectedTasaDilucion = location.state?.selectedTasaDilucion;
  //const selectedActividadDiaria = location.state?.selectedActividadDiaria;

  //obtengo los datos del usuario desde el localStorage
  const obtenerUsuario = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : { Nombre: 'No encontrado', Apellido: 'No encontrado' };
  };  
  //obtiene fecha y hora para agregar al informe
  const obtenerFechaHoraActual = () => {
    const now = new Date();
    const fecha = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const hora = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    return `${fecha}_${hora}`;
  };

//giuarda los datos del informe en la BD
  const guardarInforme = async () => {
    setLoading(true);
    setMensaje('');

    const usuario = obtenerUsuario();
    const datosInforme = {
      id_escenario: selectedEscenario?.ID_Escenario,
      actividad_trabajador: selectedEscenario?.Actividad_trabajador,
      categoria_objetivo: selectedEscenario?.Categoria_objetivo,
      nivel_epp_ec: selectedActividadDiaria?.codigoIdentificacion,
      tasa_aplicacion: selectedTasaDilucion?.valorPesticida,
      unidad_tasa_aplicacion: selectedEscenario?.Unidades_tasa_aplicacion_1,
      area_tratada: selectedActividadDiaria?.valorReal || selectedActividadDiaria?.datosAuxActividadDiaria?.Valor_Convertido,
      unidad_area: selectedActividadDiaria?.datosAuxActividadDiaria?.Unidades_Reales,
      ari: valorCoincidente,
      hi: valorCoincidente ? (1 / valorCoincidente).toFixed(5) : 'N/A',
      hi_cancer: valorHiCancer,
      escenario_resumido: selectedEscenario?.Escenario_resumido_textual,
      id_usuario: usuario.Id,
      nombre_usuario: usuario.Nombre,
      apellido_usuario: usuario.Apellido,
      fecha_hora: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post(
        'http://34.39.142.103:5000/api/informes-ocupacional/guardar',
        datosInforme
      );

      setMensaje('Informe guardado exitosamente.');

      setIsSaved(true);
      //elimino los datos utlizados para el informe del localStorage
      localStorage.removeItem('selectedEscenario');
      localStorage.removeItem('selectedPesticida');
      localStorage.removeItem('selectedCoadyuvante');
      localStorage.removeItem('selectedTasaDilucion');
      localStorage.removeItem('selectedActividadDiaria');
      localStorage.removeItem('valorReal');
      localStorage.removeItem('diasManipulacion');
      localStorage.removeItem('aniosManipulacion');
      localStorage.removeItem('porcentajeAnios');
      localStorage.removeItem('contactoDermico');
      localStorage.removeItem('gradoProteccion');
      localStorage.removeItem('mensajeProteccion');
      localStorage.removeItem('codigoIdentificacion');

    } catch (error) {
      console.error('Error al guardar el informe:', error);
  
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
        setMensaje(`Error al guardar el informe: ${error.response.data.message}`);
      } else {
        setMensaje('Error al guardar el informe. Verifique la consola para más detalles.');
      }
    } finally {
      setLoading(false); 
    }
  };
 
  //API's para obtener datos necesarios del al BD para el informe que se comparan con los datos ingresado por el usuario
  const obtenerARIFiltrado = async () => {
    try {
      const response = await axios.get('http://34.39.142.103:5000/api/riesgo-agregado'); 
      const datos = response.data;

      // Filtrar por el ID_Escenario
      const registroCoincidente = datos.find(
        (registro) => registro.ID_Escenario === selectedEscenario?.ID_Escenario
      );

      if (registroCoincidente) {
        setRegistroFiltrado(registroCoincidente);
        buscarValorCoincidente(registroCoincidente, selectedActividadDiaria?.codigoIdentificacion);
        console.log(registroCoincidente);
      } else {
        setError('No se encontró un registro que coincida con el ID_Escenario en Indice de Riesgo Agregado.');
      }
    } catch (error) {
      console.error('Error al obtener los datos de  Indice de Riesgo Agregado:', error);
      setError('Hubo un error al cargar los datos.');
    }
  };
  
  const buscarValorCoincidente = (registro, codigo) => {
    // Buscar si algún field coincide con el código
    const mapeoCampos = {
      'Escenario SIN EPP': 'Escenario_SIN_EPP',
      'SL/G + No-R': 'SL_G_No_R',
      'DL/G + No-R': 'DL_G_No_R',
      'SL/G/CRH + No-R': 'SL_G_CRH_No_R',
      'DL/G/CRH + No-R': 'DL_G_CRH_No_R',
      'DLC2/G + No-R': 'DLC2_G_No_R',
      'EPP estándar SL/G + PF10 R': 'EPP_Estandar_SL_G_PF10_R',
      'DL/G + PF10 R': 'DL_G_PF10_R',
      'SL/G/CRH + PF10 R': 'SL_G_CRH_PF10_R',
      'DL/G/CRH + PF10 R': 'DL_G_CRH_PF10_R',
      'DLC2/G + PF10 R': 'DLC2_G_PF10_R',
      'SL/G + PF50 R': 'SL_G_PF50_R',
      'EPP alta seguridad DL/G + PF50 R': 'EPP_Alta_Seguridad_DL_G_PF50_R',
      'EPP máx. seguridad DLC2/G + PF50 R': 'EPP_Max_Seguridad_DLC2_G_PF50_R',
      'DL/G/CRH + PF50 R': 'DL_G_CRH_PF50_R',
      'Cabina cerrada EC + EC': 'Cabina_Cerrada_EC_EC',
    };

    const field = mapeoCampos[codigo];

    if (field && registro[field] !== undefined) {
      setValorCoincidente(registro[field]); 
    } else {
      setValorCoincidente('No se encontró un valor coincidente');
    }
  };

  const obtenerHiCancer = async () => {
    try {
      const response = await axios.get('http://34.39.142.103:5000/api/hi-cancer');
      const datos = response.data;

      // Filtrar el registro que coincide con el ID_Escenario
      const hiCancerCoincidente = datos.find(
        (registro) => registro.ID_Escenario === selectedEscenario?.ID_Escenario
      );

      if (hiCancerCoincidente) {
        setRegistroHiCancer(hiCancerCoincidente);

        // Buscar el valor coincidente en el registro filtrado
        const valorEncontrado = buscarValorHiCancer(
          hiCancerCoincidente,
          selectedActividadDiaria?.codigoIdentificacion
        );

        setValorHiCancer(valorEncontrado);
      } else {
        setError('No se encontró un registro coincidente con el ID_Escenario para HI-Cancer.');
      }
    } catch (error) {
      console.error('Error al obtener los datos de HI Cáncer:', error);
      setError('Hubo un error al cargar los datos de HI Cáncer.');
    }
  };

  // Buscar el valor coincidente en el registro, en base a los field del modelo, ya que no se podia guardar en la BD los nombres como los tenia en el excel 
  const buscarValorHiCancer = (registro, codigo) => {

    const fieldMappings = {
      'Escenario SIN EPP': 'Escenario_SIN_EPP',
      'SL/G + No-R': 'SL_G_No_R',
      'DL/G + No-R': 'DL_G_No_R',
      'SL/G/CRH + No-R': 'SL_G_CRH_No_R',
      'DL/G/CRH + No-R': 'DL_G_CRH_No_R',
      'DLC2/G + No-R': 'DLC2_G_No_R',
      'EPP estándar SL/G + PF10 R': 'EPP_Estandar_SL_G_PF10_R',
      'DL/G + PF10 R': 'DL_G_PF10_R',
      'SL/G/CRH + PF10 R': 'SL_G_CRH_PF10_R',
      'DL/G/CRH + PF10 R': 'DL_G_CRH_PF10_R',
      'DLC2/G + PF10 R': 'DLC2_G_PF10_R',
      'SL/G + PF50 R': 'SL_G_PF50_R',
      'EPP alta seguridad DL/G + PF50 R': 'EPP_Alta_Seguridad_DL_G_PF50_R',
      'EPP máx. seguridad DLC2/G + PF50 R': 'EPP_Max_Seguridad_DLC2_G_PF50_R',
      'DL/G/CRH + PF50 R': 'DL_G_CRH_PF50_R',
      'Cabina cerrada EC + EC': 'Cabina_Cerrada_EC_EC',
    };

     for (const [field, key] of Object.entries(fieldMappings)) {
      if (field === codigo) {
        return registro[key]; // Devuelve el valor del field mapeado
      }
    }
    return 'No se encontró un valor coincidente';
  };

  const roundToThreeDecimals = (num) => {
    return Math.round(num * 1000) / 1000;
  };

  // Cargar los valores de las variables dinámicas desde los props u otros cálculos
  useEffect(() => {
    obtenerARIFiltrado();
    obtenerHiCancer();
  }, [selectedEscenario]);

  
 //crea el informe en excel
  const exportarExcel = () => {
    const usuario = obtenerUsuario(); 
  
    const datos = [
      {
        'ID Escenario': selectedEscenario?.ID_Escenario,
        'Actividad del trabajador': selectedEscenario?.Actividad_trabajador,
        'Categoría': selectedEscenario?.Categoria_objetivo,
        'Nivel de EPP o EC': selectedActividadDiaria?.codigoIdentificacion,
        'Tasa de aplicación': selectedTasaDilucion?.valorPesticida,
        'Unidad de aplicación': selectedEscenario?.Unidades_tasa_aplicacion_1,
        'Área tratada': selectedActividadDiaria?.valorReal || selectedActividadDiaria?.datosAuxActividadDiaria?.Valor_Convertido,
        'Unidad de área tratada': selectedActividadDiaria?.datosAuxActividadDiaria?.Unidades_Reales,
        'ARI': valorCoincidente,
        'Escenario de exposición - Formulación - Equipo - Tipo de aplicación': selectedEscenario?.Escenario_resumido_textual,
        'HI': valorCoincidente ? roundToThreeDecimals(1 / valorCoincidente) : 'N/A',
        'HI Cáncer': roundToThreeDecimals(valorHiCancer),
        'Id_usuario': usuario.Id,
        'Nombre Usuario': usuario.Nombre,
        'Apellido Usuario': usuario.Apellido,
        'Fecha y hora' : obtenerFechaHoraActual()
      },
    ];
  
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Agregar título en la primera fila y combinar celdas
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Estimaciones de Exposición y Riesgo Ocupacionales por toxicidad no relativa al cáncer']
    ], { origin: 'A1' });
  
    worksheet['!merges'] = [{ 
      s: { r: 0, c: 0 }, 
      e: { r: 0, c: Object.keys(datos[0]).length - 1 } 
    }];
  
    // Agregar encabezados y datos a partir de la fila 2
    XLSX.utils.sheet_add_json(worksheet, datos, { origin: 'A2', skipHeader: false });
  
    // Crear y guardar el archivo Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    const nombreArchivo = `reporte_ocupacional_${obtenerFechaHoraActual()}.xlsx`;
  
    saveAs(blob, nombreArchivo);
  };
  
 //crea el informe en PDF
  const exportarPDF = () => {
    const usuario = obtenerUsuario();
    const input = document.querySelector('.ocup-tablas-container'); // Selecciona el contenedor de la tabla
  
    html2canvas(input, {
      scale: 2, // Aumenta la escala para mejorar la calidad del PDF
      useCORS: true, // Permite cargar imágenes externas correctamente
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'pt', 'a4'); // A4 en orientación vertical
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgWidth = pdfWidth * 0.9; // Dejar un margen del 10%
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener la proporción
  
      const xOffset = (pdfWidth - imgWidth) / 2; // Centrando la imagen horizontalmente
      let yOffset = 70; // Margen superior después de agregar los textos
  
      // Agregar texto del usuario y fecha al PDF
      pdf.text(`Reporte generado por: ${usuario.Nombre} ${usuario.Apellido} ((ID: ${usuario.Id})`, 40, 30);
      pdf.text(`Fecha y Hora: ${obtenerFechaHoraActual()}`, 40, 50);
  
      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
  
      // Manejar paginación si la imagen es más grande que una página
      if (imgHeight > pdfHeight - yOffset) {
        let remainingHeight = imgHeight - (pdfHeight - yOffset);
        while (remainingHeight > 0) {
          pdf.addPage();
          remainingHeight -= pdfHeight;
          pdf.addImage(imgData, 'PNG', xOffset, yOffset - remainingHeight, imgWidth, imgHeight);
        }
      }
  
      const nombreArchivo = `reporte_ocupacional_${obtenerFechaHoraActual()}.pdf`;
      pdf.save(nombreArchivo);
    });
  };

  return (
      <div className="ocup-tablas-container">
        <h2>Estimaciones de Exposición y Riesgo Ocupacionales por Toxicidad no Relativa al Cáncer</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="imagenes-container">
          <img src="/images/fumigacion1.jpg" alt="Fumigación 1" className="imagen-fumigacion" />
          <img src="/images/fumigacion2.jpg" alt="Fumigación 2" className="imagen-fumigacion" />
        </div>

        {/* Primera fila destacada */}
        <div className="fila-destacada">
          <div className="campo-destacado">
            <strong>ARI:</strong> {valorCoincidente}
          </div>
          <div className="campo-destacado">
            <strong>HI:</strong> {valorCoincidente === '' ? '' : roundToThreeDecimals(1 / valorCoincidente)}
          </div>
          <div className="campo-destacado">
            <strong>HI cáncer:</strong> {roundToThreeDecimals(valorHiCancer)}
          </div>
        </div>

        {/* Segunda fila */}
        <div className="fila-secundaria">
          <div className="campo-secundario">
            <strong>Categoría objetivo:</strong> {selectedEscenario.Categoria_objetivo}
          </div>
          <div className="campo-secundario">
            <strong>Actividad del trabajador:</strong> {selectedEscenario.Actividad_trabajador}
          </div>
          <div className="campo-secundario">
            <strong>Nivel EPP/EC:</strong> {selectedActividadDiaria.codigoIdentificacion}
          </div>
          <div className="campo-secundario">
            <strong>Área tratada / Unidad:</strong> {selectedActividadDiaria.valorReal === '' 
              ? `${selectedActividadDiaria.datosAuxActividadDiaria.Valor_Convertido} ${selectedActividadDiaria.datosAuxActividadDiaria.Unidades_Reales}`
              : `${selectedActividadDiaria.valorReal} ${selectedActividadDiaria.datosAuxActividadDiaria.Unidades_Reales}`}
          </div>
          <div className="campo-secundario">
            <strong>Tasa de aplicación:</strong> {selectedTasaDilucion.valorPesticida} {selectedEscenario.Unidades_tasa_aplicacion_1}
          </div>
        </div>

        {/* Tercera fila */}
        <div className="fila-terciaria">
          <div className="campo-terciario">
            <strong>ID Escenario:</strong> {selectedEscenario.ID_Escenario}
          </div>
          <div className="campo-terciario">
            <strong>Escenario resumido:</strong> {selectedEscenario.Escenario_resumido_textual}
          </div>
        </div>

        {/* Mensaje y carga */}
        <div>
          {loading ? <p>Cargando...</p> : mensaje && <p>{mensaje}</p>}
        </div>


      <button onClick={guardarInforme} disabled={isSaved || loading} className="btn-guardar-informe">
        Guardar Informe
      </button>
      <button onClick={exportarExcel} className="btn-descarga">
        Descargar Excel
      </button>
      <button onClick={exportarPDF} className="btn-descarga">
        Descargar PDF
      </button>
    </div>
  );
}

export default OcupTablas;
