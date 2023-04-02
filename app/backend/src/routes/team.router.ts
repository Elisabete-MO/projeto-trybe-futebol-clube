import { Router } from 'express';
import TeamController from '../controller/team.controller';
import TeamService from '../service/team.service';
import TeamSequelizeRepository from '../repositories/TeamSequelize.repository';
// import verifyRequiredFields from '../middlewares/verifyRequiredFields';
// import MissingParamError from '../middlewares/errors/missingParam.error';

const router = Router();

const teamRepository = new TeamSequelizeRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

router
  .get('/teams', teamController.getAll.bind(teamController));
// .get('/Teams/:id', verifyRequiredFields('teams'), TeamController.getById.bind(TeamController))

export default router;
