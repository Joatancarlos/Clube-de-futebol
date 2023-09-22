import { Model, QueryInterface, DataTypes } from 'sequelize';
import UserModel from '../../Interfaces/UserModel';


export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.createTable<Model<UserModel>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void>  => {
    return queryInterface.dropTable('users');
  },
};
