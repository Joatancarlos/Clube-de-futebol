import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

// const leaderBoardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => LeaderboardController.getLeaderBoard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => LeaderboardController.getLeaderBoard(req, res),
);

export default router;
