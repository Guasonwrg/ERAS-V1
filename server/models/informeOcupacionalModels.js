const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InformeOcupacional = sequelize.define('InformeOcupacional', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_escenario: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  actividad_trabajador: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  categoria_objetivo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nivel_epp_ec: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tasa_aplicacion: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unidad_tasa_aplicacion: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  area_tratada: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unidad_area: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  ari: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  hi: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  hi_cancer: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  escenario_resumido: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  apellido_usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'informes_ocupacional',
});

module.exports = InformeOcupacional;
