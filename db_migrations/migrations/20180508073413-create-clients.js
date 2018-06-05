'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('clients', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clients');
  }
};