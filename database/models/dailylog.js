import {Model, DataTypes} from 'sequelize';
import connection from '../connection';

const initDailyLog = (sequelize, DataTypes) => {
  class DailyLog extends Model {}
  
  DailyLog.init({
    state:  DataTypes.STRING,
    achieved: DataTypes.INTEGER,
    mission_id: DataTypes.INTEGER,
    on_date: DataTypes.STRING //this will hold timestamp (dateTime)
  }, {
    sequelize,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    modelName: 'DailyLog',
    tableName: 'daily_logs'
  });
  return DailyLog;
};


export default initDailyLog(connection,DataTypes)