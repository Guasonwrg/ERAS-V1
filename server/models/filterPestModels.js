const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FilterPest = sequelize.define('FilterPest', {
  PK_Filter_Pest: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Registro: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Nombre_comercial: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Masa_bloque: {
    type: DataTypes.STRING(50),  
    allowNull: true
  },
  Unidades: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Formulacion_especifica: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Codigo: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Max_kg_paquete: {
    type: DataTypes.DECIMAL(10, 2),  
    allowNull: true
  },
  Parafinado: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Principio_activo: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'filter_pest',  
  timestamps: false 
});

module.exports = FilterPest;
