const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const MgapCoad = sequelize.define('MgapCoad', {
    PK_coad: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Registro: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Nombre_Comercial: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Aptitud: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Sustancia_Activa_1: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Activo_Contenido_1: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Unidades_1: {
        type: DataTypes.STRING(256),
        allowNull: true
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
    Observaciones: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Aptitud_Extra: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Prioridad_SPF: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Registro_MGAP: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Codigo_Tipo_Formulacion: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Prioridad_SPF_Extra: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Sustancias: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Numero_CAS: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Aptitud_Final: {
        type: DataTypes.STRING(256),
        allowNull: true
    },
    Observaciones_Extras: {
        type: DataTypes.STRING(256),
        allowNull: true
    }
}, {
    tableName: 'mgap_coad',
    timestamps: false
});

module.exports = MgapCoad;
