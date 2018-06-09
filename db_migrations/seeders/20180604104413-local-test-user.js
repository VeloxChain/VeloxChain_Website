'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user', [{
        first_name: 'admin',
        last_name: 'bikecoin',
        username: 'admin',
        password: '123',
        email: 'admin.bikecoin@gmail.com',
        token: '123',
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
