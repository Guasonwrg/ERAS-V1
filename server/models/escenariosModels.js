const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Escenario = sequelize.define('Escenario', {
  PK_Escenario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  ID_Escenario: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Categoria_objetivo: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Formulacion: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Equipo_aplicacion: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Tipo_aplicacion: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Actividad_trabajador: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Column1: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Escenario_resumido_textual: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Escenario_resumido_acortado: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Unidades_tasa_aplicacion_1: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Aux_conteo_ud_por_clase_tasa: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Unidades_tasa_aplicacion_2: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Cantidad: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Codigo_unificado_actividad_diaria: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  EC_opcion_proteccion: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Codigo_tamanos_gota_deriva: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  },
  Contacto_abeja_seguro: {
    type: DataTypes.STRING(256),
    allowNull: true,
    collate: 'utf8mb4_general_ci'
  }
}, {
  tableName: 'escenarios',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci'
});

module.exports = Escenario;
