'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'pillars', // name of Source model
      'user_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(()=>{
      return queryInterface.addColumn(
        'goals',
        'pillar_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'pillars', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
        ); 
    }).then(()=>{
      return queryInterface.addColumn(
        'missions',
        'goal_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'goals', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
        );
    }).then(()=>{
      return queryInterface.addColumn(
        'timers',
        'mission_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'missions', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
        );
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'pillars', // name of Source model
      'user_id' // key we want to remove
    ).then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'goals', // name of the Target model
        'pillar_id' // key we want to remove
      );
    }).then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'missions', // name of the Target model
        'goal_id' // key we want to remove
      )
    }).then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'timers', // name of the Target model
        'mission_id' // key we want to remove
      )
    })
  }
};
