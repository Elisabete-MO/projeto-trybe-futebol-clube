import { Router } from 'express';
import MatchController from '../controller/match.controller';
import MatchService from '../service/match.service';
import MatchSequelizeRepository from '../repositories/MatchSequelize.repository';

const router = Router();

const matchRepository = new MatchSequelizeRepository();
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

router
  .get('/matches', matchController.getAll.bind(matchController));
// .get('/matches/:id', matchController.getById.bind(matchController));

export default router;
