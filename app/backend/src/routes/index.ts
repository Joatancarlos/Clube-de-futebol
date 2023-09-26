// src/routes/index.ts

import { Router } from 'express';
import teamsRoute from './team.route';
import loginRoute from './login.route';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', loginRoute);

export default router;
