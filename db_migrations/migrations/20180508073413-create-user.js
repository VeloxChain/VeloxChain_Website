'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      token: {
        type: DataTypes.STRING(100),
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};