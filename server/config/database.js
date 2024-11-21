const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carga las variables de entorno
dotenv.config();

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(
    process.env.DB_TEST_NAME,
    process.env.DB_TEST_USER,
    process.env.DB_TEST_PASSWORD,
    {
      host: process.env.DB_TEST_HOST,
      dialect: 'mysql',
      dialectOptions: {
        charset: 'utf8mb4', 
      },
      logging: false, 
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    }
  );
}

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos MySQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = sequelize;
