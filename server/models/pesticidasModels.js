const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MgapPest = sequelize.define('mgap_pest', {
  PK_pest: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Registro: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true
  },
  Nombre_Comercial: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  Aptitud: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  Sustancia_Activa_1: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  Activo_Contenido_1: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  Unidades_1: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  Sustancia_Activa_2: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Activo_Contenido_2: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Unidades_2: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Sustancia_Activa_3: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Activo_Contenido_3: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Unidades_3: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Sustancia_Activa_4: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Activo_Contenido_4: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Unidades_4: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Formulacion: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Toxicologia: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Vencimiento: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Estado: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Receta: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Empresa_Razon_Social: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Pais: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Pais_2: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Pais_3: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Pais_4: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Fecha_dato_MGAP: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Observaciones: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Codigo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Rango_aplicacion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Unidades_ra: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Otros_pa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'mgap_pest',
  timestamps: false
});

module.exports = MgapPest;
