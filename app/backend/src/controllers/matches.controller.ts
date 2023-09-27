import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getMatches(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getMatches();
    res.status(200).json(serviceResponse.data);
  }

  public async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.getMatchById(Number(id));
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
