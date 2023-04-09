import { Request, Response, NextFunction } from 'express';
import IBoardController from './interfaces/IBoardController';
import IBoardService from '../service/interfaces/IBoardService';

export default class BoardController implements IBoardController {
  private _boardService: IBoardService;

  constructor(
    boardService: IBoardService,
  ) {
    this._boardService = boardService;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const type = req.path;
    try {
      const boards = await this._boardService.getAllTeamMatches(type);
      return res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  }
}
