import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamContoller {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllBooks(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
