import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginContoller {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { status, data } = await this.loginService.checkLogin(req.body);
    res.status(status).json(data);
  }

  public async checkToken(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { status, data } = await this.loginService.checkToken(authorization);
    res.status(status).json(data);
  }
}
