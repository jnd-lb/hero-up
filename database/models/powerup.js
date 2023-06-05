'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PowerUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PowerUp.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    model: DataTypes.ENUM('goals', 'pillars'),
    refference_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PowerUp',
    tableName: 'power-ups'
  });
  return PowerUp;
};