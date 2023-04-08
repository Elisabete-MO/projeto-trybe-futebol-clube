import NotFoundError from '../middlewares/errors/notFound.error';
import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import { IMatchData } from '../service/interfaces/IBoardService';
import IBoardRepository from './interfaces/IBoardRepository';

export default class BoardSequelizeRepository implements IBoardRepository {
  constructor(private _matchModel = MatchModel, private _teamModel = TeamModel) {}

  static formatData(matches: MatchModel[]): IMatchData[] {
    return matches.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: match.homeTeam?.teamName ? match.homeTeam.teamName : '',
      awayTeam: match.awayTeam?.teamName ? match.awayTeam.teamName : '',
    }));
  }

  async getAllTeamMatches(): Promise<IMatchData[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this._teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!matches.length) throw new NotFoundError('No matchs found');
    const formattedMatches = BoardSequelizeRepository.formatData(matches);
    return formattedMatches as IMatchData[];
  }
}
