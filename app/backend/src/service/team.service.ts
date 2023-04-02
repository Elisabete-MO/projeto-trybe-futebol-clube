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
}
// async getById(requestedId: number): Promise<Omit<ITeamWithId, 'password'>> {
//   const team = await this._teamRepository.getById(requestedId)
//   const { teamname, email, id } = team;
//   return { id, teamname, email }
// }

// async create(team: ITeam): Promise<Omit<ITeamWithId, 'password'>> {
//   this._teamValidations.validateTeam(team);
//   const teamWithId = await this._teamRepository.create(team);
//   const { teamname, email, id } = teamWithId;
//   return { id, teamname, email };
// }
