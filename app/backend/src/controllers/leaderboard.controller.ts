import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public static async getLeaderBoard(req: Request, res: Response) {
    const homeOrAway = req.path.split('/')[1];
    const data = await LeaderBoardService.getLeaderBoard(homeOrAway);
    res.status(200).json(data.data);
  }
}
