const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const axios = require('axios');
const setupAssociations = require('./models/associations');
const dotenv = require('dotenv');
const cron = require('node-cron');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const escenariosRoutes = require('./routes/escenariosRoutes');
const pesticidasRoutes = require('./routes/pesticidasRoutes');
const coadyuvantesRoutes = require('./routes/coadyuvantesRoutes');
const tasasDilucionRoutes = require('./routes/tasasDilucionRoutes');
const refCodigosForm = require('./routes/refCodigosFormRoutes');
const FilterPest = require('./routes/filterPestRoutes');
const actividadDiaria = require('./routes/auxActividadDiariaRoutes');
const gradoProteccion = require('./routes/gradoProteccionRoutes');
const riesgoAgregado = require('./routes/indiceRiesgoAgregadoRoutes');
const hiCancer = require('./routes/hiCancerRoutes');
const informeOcupacional = require('./routes/informeOcupacionalRoutes');
const batchRoute = require('./routes/batchRoutes');
const cambiosPendientes = require('./routes/cambiosPendientesRoutes');
//const scriptRoutes = require('./routes/scriptRoutes'); 


// Configura la zona horaria
process.env.TZ = 'America/Montevideo';
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: 'http://34.39.142.103:3000'
  }));

app.use(express.json());

// Aplica las asociaciones
setupAssociations();

// Programa la tarea cron para que se ejecute todos los lunes 03:00
/*if (process.env.NODE_ENV !== 'test') {
  cron.schedule('0 2 * * *', () => {
    console.log('Ejecutando el script programado a las 2:00 AM...');
  });*/
// lunes 3AM: '0 3 * * 1'
  cron.schedule('0 3 * * 1', async () => {
    console.log('El cron job se ha disparado a las 03:00.');
    try {
      const response = await axios.post('http://localhost:5000/api/batch/ejecutar-batch');
      console.log('Batch ejecutado con éxito:', response.data);
    } catch (error) {
      console.error('Error ejecutando el batch:', error);
    }
  });
//}

// Sincroniza los modelos con la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

// Rutas
app.use('/api/users', userRoutes);
app.use(authRoutes);
app.use('/api/escenarios', escenariosRoutes);
app.use('/api/pesticidas', pesticidasRoutes);
app.use('/api/coadyuvantes', coadyuvantesRoutes);
app.use('/api/tasas-dilucion', tasasDilucionRoutes);
app.use('/api/ref-codigos-form', refCodigosForm)
app.use('/api/filter-pest', FilterPest);
app.use('/api/actividad-diaria', actividadDiaria);
app.use('/api/grado-proteccion', gradoProteccion);
app.use('/api/riesgo-agregado', riesgoAgregado);
app.use('/api/hi-cancer', hiCancer);
app.use('/api/informes-ocupacional', informeOcupacional);
app.use('/api/batch', batchRoute);
app.use('/api/cambios-pendientes', cambiosPendientes);
//app.use('/api', scriptRoutes);


app.use((req, res, next) => {
  console.log(`Ruta recibida: ${req.method} ${req.url}`);
  next();
});


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

module.exports = app;