// src/routes/index.ts

import { Router } from 'express';
import teamsRoute from './team.route';

const router = Router();

router.use('/teams', teamsRoute);

export default router;
