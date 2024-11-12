const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class GradoProteccion extends Model {}

GradoProteccion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    grado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    codigo_identificacion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize, 
    modelName: 'GradoProteccion', 
    tableName: 'grado_proteccion', 
    timestamps: false, 
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

module.exports = GradoProteccion;
