const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const TasasDilucion = sequelize.define('TasasDilucion', {
  PK_Tasas_Dilucion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Unidades_tasa_aplicacion: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Escenarios_aplican_unidades: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Importante: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Ingreso_tasas_aplicacion: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Unidades_practica_empresa: {
    type: DataTypes.STRING(256),
    allowNull: true
  }
}, {
  tableName: 'tasas_dilucion',
  timestamps: false,
  charset: 'utf8mb3'
});

module.exports = TasasDilucion;
