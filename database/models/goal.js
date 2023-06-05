import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initGoal = (sequelize,DataTypes) => {
  class Goal extends Model {}

  Goal.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    pillar_id: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    due_date: DataTypes.DATEONLY,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Goal',
    tableName: 'goals',
    updatedAt : 'updated_at',
    createdAt : 'created_at'
  });

  return Goal;
};


export default initGoal(connection,DataTypes)