import { Request, Response, NextFunction } from 'express';
import IMatchController from './interfaces/IMatchController ';
import IMatchService from '../service/interfaces/IMatchService';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

export default class MatchController implements IMatchController {
  private _matchService: IMatchService;

  constructor(
    matchService: IMatchService,
  ) {
    this._matchService = matchService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const matchs = await this._matchService.getAll();
      return res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError('Params should be a number');
      const match = await this._matchService.getById(Number(req.params.id));
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }
}
