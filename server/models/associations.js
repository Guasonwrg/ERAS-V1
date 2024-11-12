const User = require('./userModels');
const InformeOcupacional = require('./informeOcupacionalModels');

function setupAssociations() {
  User.hasMany(InformeOcupacional, { foreignKey: 'id_usuario' });
  InformeOcupacional.belongsTo(User, { foreignKey: 'id' });
}

module.exports = setupAssociations;
