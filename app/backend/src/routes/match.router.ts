import { Router } from 'express';
import MatchController from '../controller/match.controller';
import MatchService from '../service/match.service';
import MatchSequelizeRepository from '../repositories/MatchSequelize.repository';
import validateAuth from '../auth/validateAuth';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import MatchValidations from '../service/validations/match.validations';

const router = Router();

const matchValidation = new MatchValidations();
const matchRepository = new MatchSequelizeRepository();
const matchService = new MatchService(matchValidation, matchRepository);
const matchController = new MatchController(matchService);

const ROUTE_ID = '/matches/:id';

router
  .get('/matches', matchController.getAll.bind(matchController))
  .get(ROUTE_ID, validateAuth(), matchController.getById.bind(matchController))
  .patch('/matches/:id/finish', validateAuth(), matchController.finishMatch.bind(matchController))
  .patch(ROUTE_ID, validateAuth(), matchController.updateMatch.bind(matchController))
  .post(
    ROUTE_ID,
    validateAuth(),
    verifyRequiredFields('matches'),
    matchController.createMatch.bind(matchController),
  );
export default router;
