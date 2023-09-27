import Teams from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';
import { ServiceResponse, ServiceResponseSuccess } from '../Interfaces/ServiceResponse';
// import ImatchCreated from '../Interfaces/ImatchCreated';

export default class MatchesService {
  private model = MatchesModel;
  private teamModel = Teams;

  public async getMatches(inProgress: string): Promise<ServiceResponse<MatchesModel[]>> {
    const matches = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    if (inProgress === 'true' || inProgress === 'false') {
      const matchesInProgress = matches
        .filter((match) => match.inProgress === JSON.parse(inProgress));
      return { status: 200, data: matchesInProgress };
    }
    return { status: 200, data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<MatchesModel>> {
    const match = await this.model.findByPk(id);
    if (!match) return { status: 404, data: { message: 'Partida não encontrada' } };
    if (!match.inProgress) return { status: 400, data: { message: 'Partida já finalizada' } };
    match.inProgress = false;
    await match.save();
    return { status: 200, data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<MatchesModel>> {
    const match = await this.model.findByPk(id);
    if (!match) return { status: 404, data: { message: 'Partida não encontrada' } };
    if (!match.inProgress) return { status: 400, data: { message: 'Partida já finalizada' } };
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
    return { status: 200, data: { message: 'Updated' } };
  }

  public async createMatch(homeTeamId: number, awayTeamId: number):
  Promise<ServiceResponseSuccess<MatchesModel>> {
    if (homeTeamId === awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const hasTeamHome = await this.hasTeam(homeTeamId);
    const hasTeamAway = await this.hasTeam(awayTeamId);
    if (!hasTeamHome || !hasTeamAway) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const newMatches = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      inProgress: true,
    });
    return { status: 201, data: newMatches.toJSON() as MatchesModel };
  }

  public async hasTeam(id: number): Promise<boolean> {
    const team = await this.teamModel.findByPk(id);
    if (!team) return false;
    return true;
  }
}
