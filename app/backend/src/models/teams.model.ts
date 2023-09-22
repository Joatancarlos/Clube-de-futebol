import ITeamsModel from '../Interfaces/ITeamsModel';
import TeamsModel from '../Interfaces/ITeamsl';
import Teams from '../database/models/Teams';

export default class TeamsModels implements ITeamsModel {
  private model = Teams;

  async getAllTeams(): Promise<TeamsModel[]> {
    const teams = await this.model.findAll();
    return teams.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
