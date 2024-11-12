const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 

class IndiceRiesgoAgregado extends Model {}

IndiceRiesgoAgregado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_Escenario: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    Escenario_SIN_EPP: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'Escenario SIN EPP',
    },
    SL_G_No_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'SL/G + No-R',
    },
    DL_G_No_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DL/G + No-R',
    },
    SL_G_CRH_No_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'SL/G/CRH + No-R',
    },
    DL_G_CRH_No_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DL/G/CRH + No-R',
    },
    DLC2_G_No_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DLC2/G + No-R',
    },
    EPP_Estandar_SL_G_PF10_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'EPP estándar SL/G + PF10 R',
    },
    DL_G_PF10_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DL/G + PF10 R',
    },
    SL_G_CRH_PF10_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'SL/G/CRH + PF10 R',
    },
    DL_G_CRH_PF10_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DL/G/CRH + PF10 R',
    },
    DLC2_G_PF10_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DLC2/G + PF10 R',
    },
    SL_G_PF50_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'SL/G + PF50 R',
    },
    EPP_Alta_Seguridad_DL_G_PF50_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'EPP alta seguridad DL/G + PF50 R',
    },
    EPP_Max_Seguridad_DLC2_G_PF50_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'EPP máx. seguridad DLC2/G + PF50 R',
    },
    DL_G_CRH_PF50_R: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'DL/G/CRH + PF50 R',
    },
    Cabina_Cerrada_EC_EC: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'Cabina cerrada EC + EC',
    },
  },
  {
    sequelize,
    modelName: 'IndiceRiesgoAgregado',
    tableName: 'indice_riesgo_agregado',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

module.exports = IndiceRiesgoAgregado;
