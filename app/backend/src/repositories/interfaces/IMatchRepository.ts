import { IMatch } from '../../service/interfaces/IMatchService';

export default interface IMatchRepository {
  getAll(): Promise<IMatch[]>;
  // getById(id: number): Promise<IMatch>;
}
