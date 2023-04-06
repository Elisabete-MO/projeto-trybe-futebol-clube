import TeamModel from '../database/models/team.model';
import NotFoundError from '../middlewares/errors/notFound.error';
import { ITeamWithId } from '../service/interfaces/ITeamService';
import ITeamRepository from './interfaces/ITeamRepository';

export default class TeamSequelizeRepository implements ITeamRepository {
  constructor(private _teamModel = TeamModel) {}

  async getAll(): Promise<ITeamWithId[]> {
    const teams = await this._teamModel.findAll();
    if (!teams.length) throw new NotFoundError('No teams found');
    return teams;
  }

  async getById(id: number): Promise<ITeamWithId> {
    const team = await this._teamModel.findByPk(id);
    if (!team) throw new NotFoundError('There is no team with such id!');
    return team;
  }
}
