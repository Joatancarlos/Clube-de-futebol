import TeamsModels from '../models/teams.model';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamsModel from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeamsl';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamsModels(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allBooks = await this.teamModel.getAllTeams();
    return { status: 200, data: allBooks };
  }
}
