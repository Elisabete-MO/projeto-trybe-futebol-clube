import MatchModel from '../database/models/match.model';
import NotFoundError from '../middlewares/errors/notFound.error';
import { IMatch } from '../service/interfaces/IMatchService';
import IMatchRepository from './interfaces/IMatchRepository';

export default class MatchSequelizeRepository implements IMatchRepository {
  constructor(private _matchModel = MatchModel) {}

  async getAll(): Promise<IMatch[]> {
    const matchs = await this._matchModel.findAll();
    if (!matchs.length) throw new NotFoundError('No matchs found');
    return matchs;
  }

  async getById(id: number): Promise<IMatch> {
    const match = await this._matchModel.findByPk(id);
    if (!match) throw new NotFoundError('Match not found');
    return match;
  }
}

// async create(match: IMatch): Promise<IMatchWithId> {
//   const isMatch = await this._matchModel.findOne({ where: { email: match.email } });
//   if (isMatch) throw new ConflictError('This matchname already exists');
//   return this._matchModel.create(match);
// }
