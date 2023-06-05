import { Model, DataTypes } from 'sequelize';
import connection from '../connection';


const initMission = (sequelize, DataTypes) => {
  class Mission extends Model {}

  Mission.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    // user_id: DataTypes.INTEGER,
    goal_id: DataTypes.INTEGER,
    date_or_time: DataTypes.STRING,
    state: DataTypes.STRING,
    type: DataTypes.ENUM('reoccuring', 'once'),
    measurement: DataTypes.ENUM('time', 'count'),
    to_achieve: DataTypes.DOUBLE,
    achieved: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Mission',
    tableName: 'missions',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });



  return Mission;
};


export default initMission(connection,DataTypes)