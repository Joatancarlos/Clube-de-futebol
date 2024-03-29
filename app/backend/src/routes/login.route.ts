import { Request, Router, Response } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidations from '../middlewares/loginValidations';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  loginValidations.validateLogin,
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  (req: Request, res: Response) => loginController.login(req, res),
);

router.get(
  '/role',
  loginValidations.validateToken,
  (req: Request, res: Response) => loginController.checkToken(req, res),
);

export default router;
