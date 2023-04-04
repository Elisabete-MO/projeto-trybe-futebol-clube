import ITeamService, { ITeamWithId } from './interfaces/ITeamService';
import ITeamRepository from '../repositories/TeamSequelize.repository';

export default class teamService implements ITeamService {
  private _teamRepository: ITeamRepository;

  constructor(
    teamRepository: ITeamRepository,
  ) {
    this._teamRepository = teamRepository;
  }

  async getAll(): Promise<ITeamWithId[]> {
    const teams = await this._teamRepository.getAll();
    return teams;
  }

  async getById(requestedId: number): Promise<ITeamWithId> {
    const team = await this._teamRepository.getById(requestedId);
    const { teamName, id } = team;
    return { id, teamName };
  }
}
