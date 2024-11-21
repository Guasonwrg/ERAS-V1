const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const { Op } = require('sequelize');
const puppeteer = require('puppeteer');
const MgapPest = require('../models/pesticidasModels');
const InformeCambios = require('../models/cambiosPesticidasModels');

const DOWNLOAD_PATH = path.resolve(__dirname, 'descargas');
const EXCEL_NAME = `pesticidas_${new Date().toISOString().slice(0, 10)}.xlsx`;
const EXCEL_PATH = path.join(DOWNLOAD_PATH, EXCEL_NAME);

// Función para eliminar archivos Excel antiguos en la carpeta de descargas
function eliminarExcelsAntiguos() {
    console.log('Eliminando archivos Excel antiguos...');
    const archivos = fs.readdirSync(DOWNLOAD_PATH);
    archivos.forEach(archivo => {
        if (archivo.startsWith('pesticidas_') && archivo.endsWith('.xlsx')) {
            try {
                fs.unlinkSync(path.join(DOWNLOAD_PATH, archivo));
                console.log(`Archivo eliminado: ${archivo}`);
            } catch (error) {
                console.error(`Error al eliminar el archivo ${archivo}:`, error);
            }
        }
    });
}

// Función para automatizar la descarga del archivo Excel desde la web
async function descargarExcelDesdeWeb() {
    try {
        console.log('Iniciando proceso de descarga del archivo Excel...');
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        console.log('Configurando la ruta de descarga automática...');
        await page._client().send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: DOWNLOAD_PATH
        });

        console.log('Navegando a la URL de la página web...');
        await page.goto('https://www.mgap.gub.uy/profit/productosweb.aspx', {
            waitUntil: 'networkidle2'
        });

        console.log('Haciendo clic en el botón de descarga...');
        await page.click('#EXCELPROD');

        console.log('Esperando que la descarga se complete...');
        await new Promise(resolve => setTimeout(resolve, 20000));

        const archivos = fs.readdirSync(DOWNLOAD_PATH);
        const archivoDescargado = archivos.find(archivo => archivo.endsWith('.xlsx'));

        if (archivoDescargado) {
            fs.renameSync(
                path.join(DOWNLOAD_PATH, archivoDescargado),
                EXCEL_PATH
            );
            console.log(`Archivo Excel descargado y renombrado a: ${EXCEL_NAME}`);
        } else {
            console.log('No se encontró un archivo Excel descargado.');
        }

        await browser.close();
        console.log('Proceso de descarga finalizado.');
    } catch (error) {
        console.error('Error al descargar el archivo de la web:', error);
    }
}

// Función para preprocesar el Excel
function preprocesarExcel(rutaArchivo) {
    const workbook = xlsx.readFile(rutaArchivo);
    const sheetName = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[sheetName];

    // Convertir la hoja en un arreglo de arreglos (A0A)
    let datos = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Eliminar las primeras dos filas
    datos.splice(0, 2); // Elimina las primeras dos filas

    // Renombrar las columnas de 'Medida'
    const encabezados = datos[0];
    let contadorMedida = 1;
    for (let i = 0; i < encabezados.length; i++) {
        if (encabezados[i] === 'Medida') {
            encabezados[i] = `Medida ${contadorMedida}`;
            contadorMedida++;
        }
    }

    // Reemplazar valores vacíos con null
    for (let i = 1; i < datos.length; i++) { // Empezar desde 1 para no incluir encabezados
        for (let j = 0; j < datos[i].length; j++) {
            if (datos[i][j] === '' || datos[i][j] === undefined) {
                datos[i][j] = null; // Reemplaza con null
            }
        }
    }

    // Filtrar registros vacíos
    datos = datos.filter(row => row.some(cell => cell !== null)); // Mantener solo filas no vacías

    // Verificar que haya datos válidos
    if (datos.length === 0) {
        console.error('No se encontraron datos válidos en el archivo Excel.');
        return null;
    }

    // Crear una nueva hoja con los datos procesados
    worksheet = xlsx.utils.aoa_to_sheet(datos);
    workbook.Sheets[sheetName] = worksheet;

    // Escribir los datos procesados de nuevo al archivo
    xlsx.writeFile(workbook, rutaArchivo);
    console.log('Preprocesamiento de Excel completado.');
}

// Función para leer datos del archivo Excel
function leerDatosExcel() {
    try {
       // console.log('Leyendo datos del archivo Excel...');
        const archivoExcel = fs.readdirSync(DOWNLOAD_PATH).find(archivo => archivo.startsWith('pesticidas_') && archivo.endsWith('.xlsx'));
        if (!archivoExcel) {
            console.error('No se encontró el archivo Excel para leer.');
            return null;
        }

        const rutaArchivo = path.join(DOWNLOAD_PATH, archivoExcel);
        const workbook = xlsx.readFile(rutaArchivo);
        const hoja = workbook.Sheets[workbook.SheetNames[0]];

        //console.log('Contenido de la hoja:', hoja);

        // Convertir la hoja en un arreglo de objetos
        let datosExcel = xlsx.utils.sheet_to_json(hoja, { defval: null });

     // Limpiar espacios en blanco de los datos
        datosExcel = datosExcel.map(row => {
            Object.keys(row).forEach(key => {
                if (typeof row[key] === 'string') {
                    row[key] = row[key].trim();
                }
            });
            return row;
        });
       // console.log(datosExcel.slice(0, 10)); // Para ver las primeras 10 filas

        return datosExcel;
    } catch (error) {
        console.error('Error al leer y procesar los datos del archivo Excel:', error);
        return null;
    }
}

// Función para obtener los datos de la base de datos
async function obtenerDatosBD() {
    try {
        console.log('Obteniendo datos de la base de datos...');
        const datosBD = await MgapPest.findAll();
        console.log('Datos de la base de datos obtenidos correctamente.');
        return datosBD.map(dato => dato.toJSON());
    } catch (error) {
        console.error('Error al obtener los datos de la base de datos:', error);
        return null;
    }
}

// Normalización de valores
/*function normalizarValor(valor) {
    if (valor === undefined || valor === null || valor === '') {
        return '';
    }
    if (typeof valor === 'number') {
        return String(valor).trim();
    }
    if (!isNaN(valor) && String(valor).length > 5) {
        try {
            return new Date(Math.round((valor - 25569) * 864e5)).toISOString().slice(0, 10);
        } catch {
            return String(valor).trim().toUpperCase();
        }
    }
    return String(valor).trim().toUpperCase();
}*/

// Mapeo de columnas
const mapeoColumnas = {
    'Registro': 'Registro',
    'Nombre Comercial': 'Nombre_Comercial',
    'Aptitud': 'Aptitud',
    'Sustancia Activa -1-': 'Sustancia_Activa_1',
    'Activo Contenido -1-': 'Activo_Contenido_1',
    'Medida 1': 'Unidades_1',
    'Sustancia Activa -2-': 'Sustancia_Activa_2',
    'Activo Contenido -2-': 'Activo_Contenido_2',
    'Medida 2': 'Unidades_2',
    'Sustancia Activa -3-': 'Sustancia_Activa_3',
    'Activo Contenido -3-': 'Activo_Contenido_3',
    'Medida 3': 'Unidades_3',
    'Sustancia Activa -4-': 'Sustancia_Activa_4',
    'Activo Contenido -4-': 'Activo_Contenido_4',
    'Medida 4': 'Unidades_4',
    'Formulacion': 'Formulacion',
    'Toxicologia': 'Toxicologia',
    //'Vencimiento': 'Vencimiento',
    'Estado': 'Estado',
    'Receta': 'Receta',
    'Empresa Razon Social': 'Empresa_Razon_Social',
    'País': 'Pais',
    'País2': 'Pais_2',
    'País3': 'Pais_3',
    'País4': 'Pais_4'
};

// Generar informe de cambios
async function generarInforme(cambios) {
    const informe = {
      fecha: new Date(),
      agregados: cambios.agregados.length,
      modificados: cambios.modificados.length,
      eliminados: cambios.eliminados.length,
      detalles: JSON.stringify(cambios),
    };
    await InformeCambios.create(informe);
  }
  

async function compararAgregados(datosExcel, datosBD) {
    const registrosAgregados = [];
    const registrosBDSet = new Set(datosBD.map(r => String(r.Registro))); // Convertimos los registros de BD a string

    for (const registro of datosExcel) {
        const registroExcel = String(registro.Registro); // Convertimos el registro de Excel a string

        // Imprimir para depuración
        //console.log("Registro Excel convertido:", registroExcel);

        if (!registrosBDSet.has(registroExcel)) {
            registrosAgregados.push({
                Registro: registro.Registro,
                Nombre_Comercial: registro['Nombre Comercial'],
                Aptitud: registro.Aptitud,
                Sustancia_Activa_1: registro['Sustancia Activa -1-'],
                Activo_Contenido_1: registro['Activo Contenido -1-'],
                Unidades_1: registro['Medida 1'],
                Sustancia_Activa_2: registro['Sustancia Activa -2-'],
                Activo_Contenido_2: registro['Activo Contenido -2-'],
                Unidades_2: registro['Medida 2'],
                Sustancia_Activa_3: registro['Sustancia Activa -3-'],
                Activo_Contenido_3: registro['Activo Contenido -3-'],
                Unidades_3: registro['Medida 3'],
                Sustancia_Activa_4: registro['Sustancia Activa -4-'],
                Activo_Contenido_4: registro['Activo Contenido -4-'],
                Unidades_4: registro['Medida 4'],
                Formulacion: registro.Formulacion,
                Toxicologia: registro.Toxicologia,
                Vencimiento: registro.Vencimiento,
                Estado: registro.Estado,
                Receta: registro.Receta,
                Empresa_Razon_Social: registro['Empresa Razon Social'],
                Pais: registro['País'],
                Pais_2: registro['País2'],
                Pais_3: registro['País3'],
                Pais_4: registro['País4'],
                Fecha_dato_MGAP: registro['Fecha dato MGAP'],
                Observaciones: registro.Observaciones,
                Codigo: registro.Codigo,
                Rango_aplicacion: registro.Rango_aplicacion,
                Unidades_ra: registro.Unidades_ra,
                Otros_pa: registro.Otros_pa,
            });
        }
    }

    return registrosAgregados;
}

async function compararEliminados(datosExcel, datosBD) {
    const registrosEliminados = [];

    // Creamos un conjunto con los registros del Excel para búsqueda rápida
    const registrosExcelSet = new Set(datosExcel.map(r => r.Registro.toString())); // Asegúrate de que sea un string

    //console.log("Registros de BD:", datosBD.map(r => r.Registro));
    //console.log("Registros de Excel:", Array.from(registrosExcelSet));

    // Iteramos sobre cada registro de la base de datos
    for (const registroBD of datosBD) {
        // Verificamos si el registro de la BD no está en el conjunto de registros del Excel
        if (!registrosExcelSet.has(registroBD.Registro.toString())) { // También convertir a string
            registrosEliminados.push(registroBD);
        }
    }

    // Retornamos los registros que están en la BD pero no en el Excel
    return registrosEliminados;
}

// Diccionario de equivalencias para nombres y unidades
const equivalencias = {
    'Gr/lt': 'g p.a./L',
    'CLETODIN': 'Cletodim',
    'AZOXISTROBINA': 'Azoxistrobina',
    'CIPROCONAZOL': 'Ciproconazol',
    '2,4 D SAL DIMETILAMINA': '2,4-D, sal de dimetil amina',
    'GLIFOSATO, SAL DIMETILAMINA': 'Glifosato, sal de dimetilamina',
    'PROTIOCONAZOL': 'PROTIOCONAZOLE',
    'TRIFLOXISTROBIN': 'Trifloxiestrobina',
    'HALOXIFOP-P-METIL': 'Haloxifop-P-metil',
    'BIFENTRIN': 'Bifentrin',
    'PIRIPROXIFENO': 'Piriproxifen',
    'FLUDIOXONIL': 'Fludioxonil',
    'TEBUCONAZOL': 'Tebuconazol',
    'DIFLUFENICAN': 'Diflufenican',
    'SPINOSAD  factor A + D': 'Spinosad',
    'IODOSULFURON METIL SODIO': 'Iodosulfuron-metil-sodio',
    // Agregar más equivalencias de ser necesario
};

// Función para normalizar cadenas: quita espacios, convierte a string, maneja 'null' y '--------------', y aplica equivalencias
function normalizarValor(value) {
    if (value === '--------------' || value === 'null' || value === null || value === undefined) {
        return null; // Convertir '--------------', 'null', y null/undefined a null
    }
    let valorString = String(value).trim(); // Asegura que se convierta a string y se eliminen espacios

    // Verificar si el valor está en el diccionario de equivalencias y devolver su equivalente
    const valorEquivalente = equivalencias[valorString.toUpperCase()];
    return valorEquivalente ? valorEquivalente : valorString;
}

// Función para verificar si dos valores son equivalentes usando el diccionario
function sonEquivalentes(valor1, valor2) {
    if (valor1 === valor2) {
        return true; // Son iguales
    }

    // Verificar si alguno de los valores tiene una equivalencia en el diccionario
    const valor1Equivalente = equivalencias[valor1?.toUpperCase()];
    const valor2Equivalente = equivalencias[valor2?.toUpperCase()];

    // Comparar usando las equivalencias si existen
    return (valor1Equivalente === valor2 || valor2Equivalente === valor1 || 
            valor1Equivalente === valor2Equivalente);
}
// Función para normalizar todos los valores de un objeto
function normalizarDatos(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, normalizarValor(value)])
    );
}

async function compararModificados(datosExcel, datosBD) {
    const registrosModificados = [];
    const registrosBDMap = new Map(datosBD.map(r => [normalizarValor(r.Registro), r]));

    // Normalizamos los datos de Excel
    const datosExcelNormalizados = datosExcel.map(normalizarDatos);

    for (const registro of datosExcelNormalizados) {
        const registroExcel = registro.Registro;
        const registroBD = registrosBDMap.get(registroExcel);

        if (registroBD) {
            const diferencias = [];

            // Comparamos cada campo usando el mapeo de columnas
            for (const [keyExcel, keyBD] of Object.entries(mapeoColumnas)) {
                const valorExcel = normalizarValor(registro[keyExcel]);
                const valorBD = normalizarValor(registroBD[keyBD]);

                // Comprobar si los valores son equivalentes
                if (!sonEquivalentes(valorExcel, valorBD)) {
                    diferencias.push({
                        campo: keyExcel,
                        Excel: valorExcel,
                        BD: valorBD
                    });
                }
            }

            if (diferencias.length > 0) {
                registrosModificados.push({
                    Registro: registroExcel,
                    Diferencias: diferencias,
                    DatosCompletos: registro
                });
            }
        }
    }

    return registrosModificados;
}


// Función principal que puede ser llamada manualmente
async function main() {
  console.log('Iniciando proceso completo...');
  eliminarExcelsAntiguos();
  await descargarExcelDesdeWeb();

  // Preprocesar el archivo Excel antes de leerlo
  preprocesarExcel(EXCEL_PATH);

  const datosBD = await obtenerDatosBD();
  const datosExcel = await leerDatosExcel();

  let registrosAgregados = [];
  let registrosEliminados = [];
  let registrosModificados = [];

  if (datosBD && datosExcel) {
      registrosAgregados = await compararAgregados(datosExcel, datosBD);
      registrosEliminados = await compararEliminados(datosExcel, datosBD);
      registrosModificados = await compararModificados(datosExcel, datosBD);

      // Imprimir el total de registros en cada conjunto
      console.log('Total de registros agregados:', registrosAgregados.length);
      console.log('Total de registros eliminados:', registrosEliminados.length);
      console.log('Total de registros modificados:', registrosModificados.length);
  }

    const cambios = {
        agregados: registrosAgregados,
        eliminados: registrosEliminados,
        modificados: registrosModificados,
    };

    // Llama a la función para generar el informe
    await generarInforme(cambios);

  console.log('Proceso completo finalizado.');
}

module.exports = { main, descargarExcelDesdeWeb };
