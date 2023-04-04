import { Request, Response, NextFunction } from 'express';
import ITeamController from './interfaces/ITeamController';
import ITeamService from '../service/interfaces/ITeamService';
import InvalidParamsError from '../middlewares/errors/invalidParams.error';

export default class TeamController implements ITeamController {
  private _teamService: ITeamService;

  constructor(
    teamService: ITeamService,
  ) {
    this._teamService = teamService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const teams = await this._teamService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const regex = /^\d+$/;
      if (!regex.test(req.params.id)) throw new InvalidParamsError('Params should be a number');
      const team = await this._teamService.getById(Number(req.params.id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
