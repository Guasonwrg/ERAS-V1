const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class EsperanzaVida extends Model {}

EsperanzaVida.init(
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
    esperanza_vida_anos: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'EsperanzaVida',
    tableName: 'esperanza_vida',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

module.exports = EsperanzaVida;
