import { Model, QueryInterface, DataTypes } from 'sequelize';
import TeamsModel from '../../Interfaces/ITeamsl';


export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.createTable<Model<TeamsModel>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void>  => {
    return queryInterface.dropTable('teams');
  },
};
