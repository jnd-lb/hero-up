import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initDayMission = (sequelize,DataTypes) => {
  class DayMission extends Model {}

  DayMission.init({
    
    // user_id: DataTypes.INTEGER,
    day_id: DataTypes.INTEGER,
    mission_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DayMission',
    tableName: 'day_mission',
    updatedAt : 'updated_at',
    createdAt : 'created_at'
  });

  return DayMission;
};


export default initDayMission(connection,DataTypes)