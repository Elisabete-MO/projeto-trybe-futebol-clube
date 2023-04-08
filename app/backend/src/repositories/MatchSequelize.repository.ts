import NotFoundError from '../middlewares/errors/notFound.error';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { IMatch, IMatches, IUpdateScoreRequest } from '../service/interfaces/IMatchService';
import IMatchRepository from './interfaces/IMatchRepository';

export default class MatchSequelizeRepository implements IMatchRepository {
  constructor(private _matchModel = MatchModel, private _teamModel = TeamModel) {}

  static formatData(matches: MatchModel[]): IMatches[] {
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

  async getAll(): Promise<IMatches[]> {
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
    return formattedMatches as IMatches[];
  }

  async getById(id: number): Promise<IMatch> {
    const match = await this._matchModel.findByPk(id);
    if (!match) throw new NotFoundError('Match not found');
    return match;
  }

  async finishMatch(id: number): Promise<IMatch> {
    const match = await this.getById(id);
    await this._matchModel.update({ inProgress: false }, { where: { id } });
    return match;
  }

  async updateMatch(id: number, body: IUpdateScoreRequest): Promise<IMatch> {
    const match = await this.getById(id);
    const { homeTeamGoals, awayTeamGoals } = body;
    if (!homeTeamGoals && !awayTeamGoals) return match;
    if (homeTeamGoals) match.homeTeamGoals = homeTeamGoals;
    if (awayTeamGoals) match.awayTeamGoals = awayTeamGoals;
    await this._matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return match;
  }

  async createMatch(data: IMatch): Promise<IMatch> {
    const result = this._matchModel.create(data);
    return result;
  }
}
