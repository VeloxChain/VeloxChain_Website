'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return [
        queryInterface.addColumn(
            'presale',
            'currency',
            {
              type: DataTypes.STRING(10),
              allowNull: false
            }
        )
    ]
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('presale');
  }
};