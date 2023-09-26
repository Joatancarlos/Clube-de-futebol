import { NextFunction, Request, Response } from 'express';

class loginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static validateEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;
    if (password && password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default loginValidations;
