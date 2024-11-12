const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const RefCodigosForm = sequelize.define('RefCodigosForm', {
  PK_Ref_Codigos_Form: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  Codigo: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Termino: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Definicion: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  Orden_frecuencia_Base_unitaria_PA: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Categoria_FAO: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Uso_directo_o_diluido: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Categoria_EFSA: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  Absorcion_dermica_por_defecto_EFSA: {
    type: DataTypes.STRING(256),
    allowNull: true
  }
}, {
  tableName: 'Ref_Codigos_Form',
  timestamps: false,
  charset: 'utf8mb4'
});

module.exports = RefCodigosForm;
