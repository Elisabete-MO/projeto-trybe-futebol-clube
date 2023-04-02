import { Request, Response, NextFunction } from 'express';
import ITeamController from './interfaces/ITeamController';
import ITeamService from '../service/interfaces/ITeamService';

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
}
// async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   try {
//     const team = await this._teamService.getById(Number(req.params.id))
//     return res.status(200).json(team)
//   } catch (error) {
//     next(error)
//   }
// }

// async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   try {
//     const newTeam = await this._teamService.create(req.body);
//     return res.status(201).json(newTeam);
//   } catch (error) {
//     next(error);
//   }
// }
