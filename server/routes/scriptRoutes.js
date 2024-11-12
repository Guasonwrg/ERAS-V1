const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const cron = require('node-cron');

// Ruta para ejecutar el script Python manualmente
router.get('/ejecutar-script', (req, res) => {
    const procesoPython = spawn('py', ['D:/ERAS-V1/server/batch/scripts/automatizar.py']);

    let resultado = '';

    // Captura la salida del script Python
    procesoPython.stdout.on('data', (data) => {
        resultado += data.toString();
    });

    // Captura los errores del script Python
    procesoPython.stderr.on('data', (data) => {
        console.error(`Error en el script: ${data}`);
    });

    // Envía la respuesta una vez que el script finaliza
    procesoPython.on('close', (code) => {
        if (code === 0) {
            res.send(`Script ejecutado exitosamente: ${resultado}`);
        } else {
            res.status(500).send(`Error al ejecutar el script. Código de salida: ${code}`);
        }
    });
});

// Programación automática del script usando node-cron (por ejemplo, todos los días a las 2:00 AM)
cron.schedule('0 2 * * *', () => {
    console.log('Ejecutando el script programado a las 2:00 AM...');
    const procesoPython = spawn('py', ['ruta/a/tu/script.py']); // Cambia la ruta según sea necesario

    procesoPython.stdout.on('data', (data) => {
        console.log(`Salida del script: ${data}`);
    });

    procesoPython.stderr.on('data', (data) => {
        console.error(`Error en el script: ${data}`);
    });

    procesoPython.on('close', (code) => {
        if (code === 0) {
            console.log('Script ejecutado exitosamente.');
        } else {
            console.log(`Error al ejecutar el script. Código de salida: ${code}`);
        }
    });
});

module.exports = router;
