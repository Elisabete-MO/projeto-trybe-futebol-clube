import { Request, Response, NextFunction } from 'express';

export default interface IBoardController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
