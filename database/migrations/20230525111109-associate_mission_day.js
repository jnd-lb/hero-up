'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'day_mission',
      {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        mission_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        day_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('day_mission');
  }
};
