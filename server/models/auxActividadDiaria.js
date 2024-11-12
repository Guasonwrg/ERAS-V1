const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class AuxActividadDiaria extends Model {}

AuxActividadDiaria.init(
  {
    PK_Actividad_Diaria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Codigo_Unificado: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Equipo_Aplicacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Tipo_Aplicacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Categoria_Objetivo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Valor_Original: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Unidades_Original: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Valor_Convertido: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Unidades_Convertidas: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
    Unidades_Reales: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'utf8mb4_spanish_ci',
    },
  },
  {
    sequelize,
    modelName: 'AuxActividadDiaria',
    tableName: 'aux_actividad_diaria',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_spanish_ci',
  }
);

module.exports = AuxActividadDiaria;
