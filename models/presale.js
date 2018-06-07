module.exports = function(sequelize, DataTypes) {
  return sequelize.define('presale', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    is_investor: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    represent_type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    desired_allocation: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    citizenship: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    sending_addr: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'presale'
  });
};
