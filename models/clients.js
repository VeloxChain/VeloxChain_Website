module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clientId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    clientSecret: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'clients'
  });
};
