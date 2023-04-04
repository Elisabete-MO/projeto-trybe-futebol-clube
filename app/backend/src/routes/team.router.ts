import { Router } from 'express';
import TeamController from '../controller/team.controller';
import TeamService from '../service/team.service';
import TeamSequelizeRepository from '../repositories/TeamSequelize.repository';

const router = Router();

const teamRepository = new TeamSequelizeRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

router
  .get('/teams', teamController.getAll.bind(teamController))
  .get('/teams/:id', teamController.getById.bind(teamController));

export default router;
