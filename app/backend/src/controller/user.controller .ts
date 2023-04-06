import { Request, Response, NextFunction } from 'express';
import IUserController from './interfaces/IUserController';
import IUserService from '../service/interfaces/IUserService';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

export default class UserController implements IUserController {
  private _userService: IUserService;

  constructor(
    userService: IUserService,
  ) {
    this._userService = userService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const users = await this._userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError('Params should be a number');
      const user = await this._userService.getById(Number(req.params.id));
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await this._userService.getByEmail(req.body.email);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
