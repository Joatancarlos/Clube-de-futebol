// src/routes/book.routes.ts

import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamsController.getAllBooks(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamsController.getTeamById(req, res),
);

export default router;
