import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  getByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
