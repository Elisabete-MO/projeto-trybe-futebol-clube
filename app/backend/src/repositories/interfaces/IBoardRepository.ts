import { IMatchData } from '../../service/interfaces/IBoardService';

export default interface IBoardRepository {
  getAllTeamMatches(): Promise<IMatchData[]>;
}
