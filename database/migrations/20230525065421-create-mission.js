'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('missions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      // user_id: {
      //   type: Sequelize.INTEGER
      // },
      // goal_id: {
      //   type: Sequelize.INTEGER
      // },
      date_or_time: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('TASK', 'HABIT')
      },
      measurement: {
        type: Sequelize.ENUM('MINUTES', 'COUNT')
      },
      to_achieve: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "Holds the frequency or the duration working on a habit per day. This will be setted only if the type is HABIT"
      },
      achieved: {
        type: Sequelize.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('missions');
  }
};