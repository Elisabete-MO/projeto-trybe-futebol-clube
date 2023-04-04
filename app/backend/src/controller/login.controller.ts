import { Request, Response, NextFunction } from 'express';
import ILoginController from './interfaces/ILoginController.';
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
      const token = await this._loginService.getByLogin(email, password);
      res.status(200).json({ token: token.password });
    } catch (error) {
      next(error);
    }
  }
}
