import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import loginValidations from '../middlewares/loginValidations';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getMatches(req, res),
);

router.patch(
  '/:id/finish',
  loginValidations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  loginValidations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  loginValidations.validateToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
