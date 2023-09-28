// src/routes/index.ts

import { Router } from 'express';
import teamsRoute from './team.route';
import loginRoute from './login.route';
import matchesRoute from './matches.route';
import leaderboardRoute from './leaderboard.route';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', loginRoute);
router.use('/matches', matchesRoute);
router.use('/leaderboard', leaderboardRoute);

export default router;
