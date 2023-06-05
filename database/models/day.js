import { Model, DataTypes } from 'sequelize';
import connection from '../connection';


const initDay = (sequelize, DataTypes) => {
  class Day extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Day.init({
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Day',
    tableName:"days"
  });

  return Day;
};


export default initDay(connection, DataTypes)