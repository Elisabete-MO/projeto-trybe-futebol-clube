import { Request, Response, NextFunction } from 'express';
import IMatchController from './interfaces/IMatchController ';
import IMatchService from '../service/interfaces/IMatchService';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

const PARAMS_ERR_MESSAGE = 'Params should be a number';

export default class MatchController implements IMatchController {
  private _matchService: IMatchService;

  constructor(
    matchService: IMatchService,
  ) {
    this._matchService = matchService;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { inProgress } = req.query;
    try {
      let matches = await this._matchService.getAll();
      if (inProgress === 'true') {
        matches = matches.filter((match) => match.inProgress);
      } else if (inProgress === 'false') {
        matches = matches.filter((match) => !match.inProgress);
      }
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError(PARAMS_ERR_MESSAGE);
      const match = await this._matchService.getById(Number(req.params.id));
      return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError(PARAMS_ERR_MESSAGE);
      const match = await this._matchService.finishMatch(Number(req.params.id));
      if (match) return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError(PARAMS_ERR_MESSAGE);
      const match = await this._matchService.updateMatch(Number(req.params.id), req.body);
      if (match) return res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  }

  async createMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const newMatch = await this._matchService.createMatch(req.body);
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  }
}
