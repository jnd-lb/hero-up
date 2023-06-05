'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Timer.init({
    start_timestamp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Timer',
    tableName: 'timers',
  });

  Timer.associate = models => {
    Timer.belongsTo(models.Mission,{
           foreignKey: 'mission_id',
           onDelete: 'CASCADE'
    });
  };
  
  return Timer;
};