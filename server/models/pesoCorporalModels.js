const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class PesoCorporal extends Model {}

PesoCorporal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exposicion_evaluada: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    criterio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    peso_corporal_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PesoCorporal',
    tableName: 'peso_corporal',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

module.exports = PesoCorporal;
