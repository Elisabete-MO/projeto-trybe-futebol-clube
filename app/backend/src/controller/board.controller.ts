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

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    // const { inProgress } = req.query;
    try {
      const boards = await this._boardService.getAllTeamMatches();
      // if (inProgress === 'true') {
      //   boards = boards.filter((board) => board.inProgress);
      // } else if (inProgress === 'false') {
      //   boards = boards.filter((board) => !board.inProgress);
      // }
      return res.status(200).json(boards);
    } catch (error) {
      next(error);
    }
  }
}
