'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wishlist_materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wishlist_id: {
        type: Sequelize.INTEGER
      },
      material_id: {
        type: Sequelize.INTEGER
      },
      purity_id: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DECIMAL(15, 3)
      },
      unit_id: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wishlist_materials');
  }
};