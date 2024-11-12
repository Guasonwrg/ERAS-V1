const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const FqToxPest = sequelize.define('FqToxPest', {
  PK_Fq_Tox_Pest: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ingrediente_activo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  CAS_NR: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Fecha_incorporacion_planilla: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Kd: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Koc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Water_Colum_Metabolism_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Water_Reference_Temperature: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Benthic_Metabolism_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Benthic_Reference_Temperature: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Aqueous_Photolysis_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Photolysis_Ref_Latitud: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Hydrolysis_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Soil_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Soil_Reference_Temperature: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Foliar_Half_Life: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Molecular_Weight: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Vapor_Pressure: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Reference_Temperature_for_Vapor_Pressure: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Vapor_Pressure_PPDB_convertido: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Solubility: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Henrys_Constant_PWC: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Henrys_Constant_PPDB: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Henrys_Law_Constant_PPDB_convertido: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Henrys_Coefficient: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Mr_MAMB: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Bulk_Density: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Molar_Volumen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Air_Diffusion_Coefficient: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Boiling_point: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Heat_of_Henry: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Formula_molecular: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Presencia_de_cloro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Cl_p_p: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Coef_particion_octanol_agua: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Log_ka_central: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ka_central: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ka_inferior_IC_95: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ka_superior_IC_95: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  kp_central: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  kp_inferior_IC_95: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  kp_superior_IC_95: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Factor_bioconcentracion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Vida_media_inferior: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Vida_media_superior: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  AOEL_o_RfD: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Fuente_AOEL_RfD: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Fecha_actualizacion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Link_fuente: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ADI: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Fuente_ADI: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ARfD: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Absorcion_dermica: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Nombre_pesticida: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Aptitud: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ARfD_EPA: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Limite_agua_potable_aguda: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Poblacion_sensible_aguda: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  RfD_EPA: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Limite_agua_potable_cronica: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Poblacion_sensible_cronica: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Cuantificacion_cancer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Limite_cancer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Link_info_hhbp: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ARfD_unificada: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Fuente_ARfD: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Importaciones_2019: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Importaciones_2020: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Substance_Group: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Known_Relevant_Impurities: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Mode_of_Action: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  General_Human_Health_Issues: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Adverce_Outcome_Pathway: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Codigo_RAC: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MOAtox_Broad: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MOAtox_Specific: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  OECD_QSAR: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxtree_Acute: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  KNIME_workflow: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Codigo_fechas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_mamiferos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_aves: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_abejas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_contacto_abejas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_contacto_polinizadores: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_polinizadores: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_polinizadores: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_lombrices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_lombrices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_lombrices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_lombrices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_lombrices: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_colembolos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_colembolos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_colembolos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_colembolos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_colembolos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Dosis_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Reduccion_efecto_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Reduccion_fecundidad_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Aumento_mortalidad_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Dosis_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Reduccion_efecto_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Reduccion_fecundidad_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Aumento_mortalidad_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_avispilla: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_acaro: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Valor_activacion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_herbivoros: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_via_oral_herbivoros: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_mineralizadores: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_NOER_mineralizadores: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_microorganismos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_ER50_sensible: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_plantas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_sensible: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_ER50_raigras: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_ER50_maiz: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_ER50_soja: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_EC50_pulga: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_EC50_camaroncito: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_invertebrados: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_pulga: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_camaroncito: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_pulga: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_gusano: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_sedimento: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_invertebrados: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_pulga: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_bentonicos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_aguda_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Dias_ensayo_cronica_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_peces: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_anfibios: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Dias_ensayo_cronica_anfibios: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_anfibios: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_cronica_anfibios: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_algas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_aguda_diatomeas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_algas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_aguda_algas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Especie_estandar_diatomeas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Toxicidad_cronica_algas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Factor_seguridad_cronica_algas: {
    type: DataTypes.TEXT,
    allowNull: true,
},
Especie_estandar_cronica_algas: {
  type: DataTypes.TEXT,
  allowNull: true,
},
Toxicidad_macrofita_1: {
  type: DataTypes.TEXT,
  allowNull: true,
},
Toxicidad_macrofita_2: {
  type: DataTypes.TEXT,
  allowNull: true,
},
Factor_seguridad_macrofita: {
  type: DataTypes.TEXT,
  allowNull: true,
},
Especie_estandar_macrofita1: {
  type: DataTypes.TEXT,
  allowNull: true,
},
Especie_estandar_macrofita2: {
  type: DataTypes.TEXT,
  allowNull: true,
},
}, {
tableName: 'fq_tox_pest',
timestamps: false, 
});

module.exports = FqToxPest;

