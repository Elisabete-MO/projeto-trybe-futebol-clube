import NotFoundError from '../middlewares/errors/notFound.error';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { IMatch } from '../service/interfaces/IMatchService';
import IMatchRepository from './interfaces/IMatchRepository';

export default class MatchSequelizeRepository implements IMatchRepository {
  constructor(private _matchModel = MatchModel, private _teamModel = TeamModel) {}

  static formatData(matches: MatchModel[]): IMatch[] {
    return matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: { teamName: match.homeTeam?.teamName },
      awayTeam: { teamName: match.awayTeam?.teamName },
    }));
  }

  async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: {
        exclude: ['home_team_id', 'away_team_id'],
      },
    });
    if (!matches.length) throw new NotFoundError('No matchs found');
    const formattedMatches = MatchSequelizeRepository.formatData(matches);
    return formattedMatches as IMatch[];
  }

  // async getById(id: number): Promise<IMatch> {
  //   const match = await this._matchModel.findByPk(id);
  //   if (!match) throw new NotFoundError('Match not found');
  //   return match;
  // }
}

// const matchs = await this._matchModel.findAll();
// async create(match: IMatch): Promise<IMatchWithId> {
//   const isMatch = await this._matchModel.findOne({ where: { email: match.email } });
//   if (isMatch) throw new ConflictError('This matchname already exists');
//   return this._matchModel.create(match);
// }
