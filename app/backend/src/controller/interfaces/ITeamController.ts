import { Request, Response, NextFunction } from 'express';

export default interface ITeamController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
