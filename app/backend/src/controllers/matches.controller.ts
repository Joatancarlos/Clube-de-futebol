import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchesService.getMatches(inProgress as string);
    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.finishMatch(Number(id));
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;
    const serviceResponse = await this.matchesService
      .createMatch(homeTeamId, awayTeamId);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
