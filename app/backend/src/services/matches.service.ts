import MatchesModel from '../database/models/Matches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  private model = MatchesModel;

  public async getMatches(): Promise<ServiceResponse<MatchesModel[]>> {
    const matches = await this.model.findAll();
    return { status: 200, data: matches };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<MatchesModel>> {
    const match = await this.model.findByPk(id);
    if (!match) {
      return { status: 404, data: { message: 'Match not found' } };
    }
    return { status: 200, data: match };
  }
}
