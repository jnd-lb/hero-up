import { Model,DataTypes} from 'sequelize';
import connection from '../connection';


const initPillar =  (sequelize,DataTypes) => {
  class Pillar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // this.belongsTo(models.User, {
    //   //   foreignKey: 'user_id',
    //   //   onDelete: 'CASCADE'
    //   // })
    // }
  }

  Pillar.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pillar',
    tableName: 'pillars',
    createdAt : 'created_at',
    updatedAt : 'updated_at'
  });
  


  return Pillar;
};



export default initPillar(connection,DataTypes)