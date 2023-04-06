import IMatchService, { IMatch, IMatches, IUpdateScoreRequest } from './interfaces/IMatchService';
import IMatchRepository from '../repositories/MatchSequelize.repository';
import IMatchValidations from './interfaces/IMatchValidations';

export default class matchService implements IMatchService {
  private _matchValidations : IMatchValidations;
  private _matchRepository: IMatchRepository;

  constructor(
    matchValidation: IMatchValidations,
    matchRepository: IMatchRepository,
  ) {
    this._matchValidations = matchValidation;
    this._matchRepository = matchRepository;
  }

  async getAll(): Promise<IMatches[]> {
    const matchs = await this._matchRepository.getAll();
    return matchs;
  }

  async getById(requestedId: number): Promise<IMatch> {
    const match = await this._matchRepository.getById(requestedId);
    return match;
  }

  async finishMatch(id: number): Promise<IMatch> {
    const match = await this._matchRepository.finishMatch(id);
    return match;
  }

  async updateMatch(id: number, body: IUpdateScoreRequest): Promise<IMatch> {
    const match = await this._matchRepository.updateMatch(id, body);
    return match;
  }

  async createMatch(body: IMatch): Promise<IMatch> {
    this._matchValidations.validateMatch(body);
    const result = await this._matchRepository.createMatch(body);
    const match = await this._matchRepository.getById(result.id);
    return match;
  }
}
