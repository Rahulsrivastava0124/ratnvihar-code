'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('loans', 'monthly_emi', {
      type: Sequelize.DECIMAL(15, 2),
      after: "interest"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('loans', 'monthly_emi');
  }
};