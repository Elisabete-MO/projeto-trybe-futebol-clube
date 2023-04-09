import { Router } from 'express';
import BoardSequelizeRepository from '../repositories/BoardSequelize.repository';
import BoardController from '../controller/board.controller';
import BoardService from '../service/board.service';
import BoardAux from '../service/aux/board.aux';

const router = Router();

const boardRepository = new BoardSequelizeRepository();
const boardAux = new BoardAux();
const boardService = new BoardService(boardRepository, boardAux);
const boardController = new BoardController(boardService);

router
  .get('/leaderboard', boardController.getAll.bind(boardController))
  .get('/leaderboard/home', boardController.getAll.bind(boardController))
  .get('/leaderboard/away', boardController.getAll.bind(boardController));

export default router;
