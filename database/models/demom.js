'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Demom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Demom.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    model: DataTypes.ENUM('goals', 'pillars'),
    refference_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Demom',
  });
  return Demom;
};