import { Router } from 'express';
import MatchController from '../controller/match.controller';
import MatchService from '../service/match.service';
import MatchSequelizeRepository from '../repositories/MatchSequelize.repository';
import validateAuth from '../auth/validateAuth';
import { verifyRequiredFields, verifyGoals } from '../middlewares/verifyRequiredFields';
import MatchValidations from '../service/validations/match.validations';
import TeamSequelizeRepository from '../repositories/TeamSequelize.repository';

const router = Router();

const matchValidation = new MatchValidations();
const teamRepository = new TeamSequelizeRepository();
const matchRepository = new MatchSequelizeRepository();
const matchService = new MatchService(matchValidation, matchRepository, teamRepository);
const matchController = new MatchController(matchService);

const ROUTE_ID = '/matches/:id';

router
  .get('/matches', matchController.getAll.bind(matchController))
  .get(ROUTE_ID, validateAuth(), matchController.getById.bind(matchController))
  .patch('/matches/:id/finish', validateAuth(), matchController.finishMatch.bind(matchController))
  .patch(ROUTE_ID, validateAuth(), matchController.updateMatch.bind(matchController))
  .post(
    '/matches',
    validateAuth(),
    verifyRequiredFields('matches'),
    verifyGoals('goals'),
    matchController.createMatch.bind(matchController),
  );
export default router;
