const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const InformeCambios = sequelize.define('InformeCambios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fecha_expiracion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Fecha de hoy por defecto
  },
  agregados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modificados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eliminados: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true, // Guardar los detalles de cambios como JSON
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Aprobado', 'Rechazado'),
    defaultValue: 'Pendiente',
  },
}, {
    timestamps: false, 
});

module.exports = InformeCambios;
