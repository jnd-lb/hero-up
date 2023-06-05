import {Model , DataTypes} from 'sequelize'
import bcrypt from 'bcryptjs';

import connection from '../connection';

const initUser = (sequelize,DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    hooks:{
      beforeCreate: async (user,options)=>{
        user.password = await bcrypt.hashSync(user.password, 10);
      }
    }
  });
  

  return User;
};

export default initUser(connection,DataTypes)