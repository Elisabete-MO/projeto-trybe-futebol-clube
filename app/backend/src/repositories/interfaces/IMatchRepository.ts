import { IMatch, IMatches, IUpdateScoreRequest } from '../../service/interfaces/IMatchService';

export default interface IMatchRepository {
  getAll(): Promise<IMatches[]>;
  getById(id: number): Promise<IMatch>;
  finishMatch(id: number): Promise<IMatch>;
  updateMatch(id: number, body: IUpdateScoreRequest): Promise<IMatch>;
  createMatch(body: IMatch): Promise<IMatch>;
}
