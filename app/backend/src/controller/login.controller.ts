import { Request, Response, NextFunction } from 'express';
import ILoginController from './interfaces/ILoginController';
import ILoginService from '../service/interfaces/ILoginService';

export default class LoginController implements ILoginController {
  private _loginService: ILoginService;

  constructor(
    loginService: ILoginService,
  ) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const token = await this._loginService.postLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  getRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const role = req.user ?? { role: 'default' };
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
