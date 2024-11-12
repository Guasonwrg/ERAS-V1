const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const downloadExcel = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Configurar la ruta de descarga
    const downloadPath = path.resolve(__dirname, 'descargas');
    fs.mkdirSync(downloadPath, { recursive: true });

    await page._client().send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath,
    });

    // Navegar a la página de productos MGAP
    await page.goto('https://www.mgap.gub.uy/profit/productosweb.aspx', {
      waitUntil: 'networkidle2',
    });

    // Esperar a que el botón de descarga esté disponible
    await page.waitForSelector('#EXCELPROD');
    
    console.log('Botón encontrado. Iniciando descarga...');
    
    // Simular el clic en el botón de descarga
    await page.click('#EXCELPROD');

    // Esperar de forma manual para que la descarga termine
    await new Promise((resolve) => setTimeout(resolve, 15000)); // Espera 15 segundos

    console.log('Descarga completada.');

    await browser.close();
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
  }
};

downloadExcel();
