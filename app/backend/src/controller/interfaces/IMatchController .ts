import { Request, Response, NextFunction } from 'express';

export default interface IMatchController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  finishMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  createMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
