import IMatchService, { IMatch } from './interfaces/IMatchService';
import IMatchRepository from '../repositories/MatchSequelize.repository';

export default class matchService implements IMatchService {
  private _matchRepository: IMatchRepository;

  constructor(
    matchRepository: IMatchRepository,
  ) {
    this._matchRepository = matchRepository;
  }

  async getAll(): Promise<IMatch[]> {
    const matchs = await this._matchRepository.getAll();
    return matchs;
  }

  async getById(requestedId: number): Promise<IMatch> {
    const match = await this._matchRepository.getById(requestedId);
    return match;
  }
}
