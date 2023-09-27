// src/routes/index.ts

import { Router } from 'express';
import teamsRoute from './team.route';
import loginRoute from './login.route';
import matchesRoute from './matches.route';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', loginRoute);
router.use('/matches', matchesRoute);

export default router;
